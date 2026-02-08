import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });

    const {
        data: { session },
    } = await supabase.auth.getSession();

    // Protect Admin Routes
    if (req.nextUrl.pathname.startsWith('/admin')) {
        // Check if user is authenticated
        if (!session) {
            // If not, redirect to login page
            // Exception for the login page itself to avoid infinite loop
            if (req.nextUrl.pathname !== ('/admin/login')) {
                const redirectUrl = req.nextUrl.clone();
                redirectUrl.pathname = '/admin/login';
                return NextResponse.redirect(redirectUrl);
            }
        }

        // Optional: Check for 'admin' role if we had roles. For now, any authenticated user is admin.
    }

    return res;
}

export const config = {
    matcher: ['/admin/:path*'],
};
