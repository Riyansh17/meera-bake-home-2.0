import type { Metadata } from 'next'
import { inter, playfair } from '@/lib/font'  // Import from fonts.ts
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import { Toaster } from 'react-hot-toast'
import LayoutContent from '@/components/layout/LayoutContent'

export const metadata: Metadata = {
  title: 'WhatsApp Food Ordering System',
  description: 'Order food easily through WhatsApp',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`min-h-screen flex flex-col ${inter.variable} ${playfair.variable}`}>
        <CartProvider>
          <LayoutContent>{children}</LayoutContent>
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  )
}
