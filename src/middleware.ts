// src/middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const publicRoutes: string[] = ["/","/login"]
const authRoutes = [ "/register", "/forgot-password", "/reset-password", "/verify-email", "/oauth-callback"]

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    
    const origin = request.nextUrl.origin
    const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))
    const isAuthRoute = authRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`))
    const authToken = request.cookies.get('auth-token')?.value

    // Vérifier si l'utilisateur est authentifié
    let isAuthenticated = false
    if (authToken) {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${authToken}`
                },
                cache: 'no-store' // Empêcher la mise en cache
            })
            isAuthenticated = response.ok
        } catch (error) {
            console.error('Erreur de vérification du token:', error)
        }
    }

    // 1. Si l'utilisateur est authentifié et essaie d'accéder à une route d'authentification
    if (isAuthenticated && isAuthRoute) {
        const dashboardUrl = new URL("/dashboard", origin)
        // Ajouter un paramètre de cache-busting pour éviter le cache du navigateur
        dashboardUrl.searchParams.set('_', Date.now().toString())
        const response = NextResponse.redirect(dashboardUrl)
        
        // Ajouter des en-têtes pour empêcher la mise en cache
        response.headers.set('Cache-Control', 'no-store, must-revalidate')
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
        
        return response
    }

    // 2. Si l'utilisateur n'est pas authentifié et essaie d'accéder à une route protégée
    if (!isPublicRoute && !isAuthRoute && !isAuthenticated) {
        const loginUrl = new URL("/login", origin)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    // Gestion du header Authorization pour les APIs
    if (pathname.startsWith('/api/') && isAuthenticated) {
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('Authorization', `Bearer ${authToken}`)
        return NextResponse.next({
            request: { headers: requestHeaders }
        })
    }

    // Pour toutes les autres requêtes, ajouter des en-têtes anti-cache
    const response = NextResponse.next()
    if (isAuthRoute) {
        response.headers.set('Cache-Control', 'no-store, must-revalidate')
        response.headers.set('Pragma', 'no-cache')
        response.headers.set('Expires', '0')
    }
    
    return response
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|json)$).*)",
    ],
}