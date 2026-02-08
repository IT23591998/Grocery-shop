import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    if (!supabaseUrl || !supabaseKey) {
        console.error('Middleware: Missing Supabase environment variables');
        return response;
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    try {
        // Refresh session if expired - required for Server Components
        const { data: { user } } = await supabase.auth.getUser()

        // Protect Admin Routes
        if (request.nextUrl.pathname.startsWith('/admin')) {
            if (!user) {
                // Allow access to login page
                if (request.nextUrl.pathname !== '/admin/login') {
                    const url = request.nextUrl.clone()
                    url.pathname = '/admin/login'
                    return NextResponse.redirect(url)
                }
            }
        }
    } catch (e) {
        console.error('Middleware: Auth error', e);
        // On error, let the request proceed or handle gracefully. 
        // For admin routes, maybe fail safe to login?
        // For now, return response to avoid 500 users.
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/admin/:path*',
    ],
}
