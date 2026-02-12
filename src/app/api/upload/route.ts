import { NextResponse } from 'next/server';
import { createClient } from '@/libs/supabaseServer';
import sharp from 'sharp';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        if (!supabase) {
            return NextResponse.json({ success: false, message: 'Supabase client not initialized' }, { status: 500 });
        }

        const data = await request.formData();
        const file: File | null = data.get('file') as unknown as File;

        if (!file) {
            return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ success: false, message: 'Invalid file type. Only images are allowed.' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Optimize image with Sharp
        // Resize to max 1080x1080, convert to webp, quality 80%
        const optimizedBuffer = await sharp(buffer)
            .resize({ width: 1080, height: 1080, fit: 'inside', withoutEnlargement: true })
            .webp({ quality: 80 })
            .toBuffer();

        // Create unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const filename = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, "_") + '-' + uniqueSuffix + '.webp';

        // Upload to Supabase Storage
        const bucket = 'products';
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filename, optimizedBuffer, {
                contentType: 'image/webp',
                cacheControl: '3600',
                upsert: false
            });

        if (uploadError) {
            console.error('Supabase storage upload error:', uploadError);
            return NextResponse.json({ success: false, message: 'Upload to storage failed: ' + uploadError.message }, { status: 500 });
        }

        // Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from(bucket)
            .getPublicUrl(filename);

        return NextResponse.json({ success: true, url: publicUrl });
    } catch (error: any) {
        console.error('Upload error:', error);
        return NextResponse.json({
            success: false,
            message: 'Upload failed: ' + (error.message || 'Unknown error'),
            details: error
        }, { status: 500 });
    }
}
