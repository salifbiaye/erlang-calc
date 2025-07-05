import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes qui ne nécessitent pas d'authentification
const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password', '/verify-email']

// Routes d'authentification (redirection si déjà connecté)
const authRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/verify-email']

// Define static file patterns that should be public
const publicFilePatterns = [
  /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/,  // images
  /\.(?:css|js|map)$/,                      // stylesheets, scripts and sourcemaps
  /\.(?:woff|woff2|ttf|otf|eot)$/,         // fonts
  /\.(?:json|xml)$/                         // data files
]

export function middleware(request: NextRequest) {
    const token = request.cookies.get('auth-token')?.value
    const { pathname } = request.nextUrl

    // Si l'utilisateur est connecté et essaie d'accéder à une route d'authentification
    if (token && authRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Si l'utilisateur n'est pas connecté et essaie d'accéder à une route protégée
    if (!token && !publicRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Skip middleware for static files and API routes
    if (
      pathname.startsWith('/_next') ||        // Next.js internal routes
      pathname.startsWith('/api') ||          // API routes
      pathname.startsWith('/public') ||       // Public directory
      publicFilePatterns.some(pattern => pattern.test(pathname))  // Static files
    ) {
      return NextResponse.next()
    }

    return NextResponse.next()
}

// Configure middleware to run on all routes except api routes and static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
} 