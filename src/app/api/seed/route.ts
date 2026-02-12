
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
    try {
        // Try to get service role key first to bypass RLS
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

        if (!supabaseUrl || (!supabaseServiceKey && !supabaseAnonKey)) {
            return NextResponse.json({
                success: false,
                error: 'Supabase credentials missing',
                details: {
                    hasUrl: !!supabaseUrl,
                    hasServiceKey: !!supabaseServiceKey,
                    hasAnonKey: !!supabaseAnonKey
                }
            }, { status: 500 });
        }

        const supabaseKey = supabaseServiceKey || supabaseAnonKey;
        const supabase = createClient(supabaseUrl, supabaseKey!);

        const categories = [
            'Fruits & Vegetables',
            'Dairy & Eggs',
            'Bakery',
            'Beverages',
            'Snacks'
        ];

        const results = [];

        for (const catName of categories) {
            // Check if exists
            const { data: existing, error: fetchError } = await supabase
                .from('categories')
                .select('id')
                .eq('name', catName)
                .single();

            // PGRST116 is "JSON object requested, multiple (or no) rows returned" - which means not found for single()
            if (fetchError && fetchError.code !== 'PGRST116') {
                results.push({ name: catName, status: 'error_checking', error: fetchError.message, code: fetchError.code });
                continue;
            }

            if (!existing) {
                // Insert
                const { data, error } = await supabase
                    .from('categories')
                    .insert([{ name: catName }])
                    .select();

                if (error) {
                    results.push({ name: catName, status: 'error_inserting', error: error.message, code: error.code });
                } else {
                    results.push({ name: catName, status: 'created', data });
                }
            } else {
                results.push({ name: catName, status: 'exists', id: existing.id });
            }
        }

        return NextResponse.json({ success: true, results, usedServiceKey: !!supabaseServiceKey });
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            error: 'Unexpected error',
            details: err.message,
            stack: err.stack
        }, { status: 500 });
    }
}
