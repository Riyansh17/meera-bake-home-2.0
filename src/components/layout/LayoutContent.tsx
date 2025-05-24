'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  return (
    <>
      {!isHomePage && <Navbar />}
      <main className={isHomePage ? 'min-h-screen' : 'flex-grow'}>
        {children}
      </main>
      {!isHomePage && <Footer />}
    </>
  )
}