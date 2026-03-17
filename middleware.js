import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Don't protect the login page itself
        if (req.nextUrl.pathname === '/admin/login') {
          return true // Always allow access to login page
        }
        // Protect all other admin routes
        return !!token
      }
    },
    pages: {
      signIn: '/admin/login' // Redirect here if not authorized
    }
  }
)

export const config = {
  matcher: ['/admin/:path*'] // Still run on all admin routes
}