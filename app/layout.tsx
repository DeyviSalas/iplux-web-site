import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'IPLUX | Internet 100% Fibra Óptica y Cable HD',
  description: 'Internet rápido y estable con fibra óptica, Cable HD y planes para tu hogar. Consulta cobertura y promociones IPLUX.',
  generator: 'v0.app',
  icons: {
    icon: '/images/logofavicon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#18c7cc',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es" className={`${inter.variable} bg-[#f8fbff]`}><body><ThemeProvider>{children}</ThemeProvider>{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
