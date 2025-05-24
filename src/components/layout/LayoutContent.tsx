'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Define routes where navbar and footer should be hidden
  const hideNavFooterRoutes = [
    '/',           // Home page
    '/login',      // Login page
    '/admin',      // Admin dashboard
    '/admin/',     // Admin dashboard with trailing slash
  ]
  
  // Check if current path starts with /admin (for all admin routes)
  const isAdminRoute = pathname.startsWith('/admin')
  const isLoginRoute = pathname === '/login'
  const isHomePage = pathname === '/'
  
  // Hide navbar and footer if it's home page, login page, or any admin route
  const shouldHideNavFooter = isHomePage || isLoginRoute || isAdminRoute

  return (
    <>
      {!shouldHideNavFooter && <Navbar />}
      <main className={shouldHideNavFooter ? 'min-h-screen' : 'flex-grow'}>
        {children}
      </main>
      {!shouldHideNavFooter && <Footer />}
    </>
  )
}