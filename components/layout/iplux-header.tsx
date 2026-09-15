'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'

export function SiteHeader({ backHref = '/', backLabel = 'Volver al inicio' }: { backHref?: string; backLabel?: string }) {
  const { theme, setTheme } = useTheme()
  return <header className="border-b border-blue-100 bg-white dark:border-slate-700 dark:bg-[#13243a]">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
      <Link href="/" className="flex items-center" aria-label="IPLUX inicio"><Image src="/images/iplux-logo.png" alt="IPLUX 100% Fibra Óptica" width={132} height={40} className="h-10 w-auto object-contain dark:brightness-0 dark:invert" /></Link>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-lg border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-white/10" role="group" aria-label="Preferencia de tema">
          <button onClick={() => setTheme('light')} className={`rounded-md p-1.5 ${theme === 'light' ? 'bg-white text-[#1677e8] shadow-sm dark:bg-[#1c3555]' : 'text-slate-500 dark:text-blue-200'}`} aria-label="Modo claro" aria-pressed={theme === 'light'}><Sun size={15} /></button>
          <button onClick={() => setTheme('dark')} className={`rounded-md p-1.5 ${theme === 'dark' ? 'bg-white text-[#1677e8] shadow-sm dark:bg-[#1c3555]' : 'text-slate-500 dark:text-blue-200'}`} aria-label="Modo oscuro" aria-pressed={theme === 'dark'}><Moon size={15} /></button>
          <button onClick={() => setTheme('system')} className={`rounded-md p-1.5 ${theme === 'system' ? 'bg-white text-[#1677e8] shadow-sm dark:bg-[#1c3555]' : 'text-slate-500 dark:text-blue-200'}`} aria-label="Usar tema del sistema" aria-pressed={theme === 'system'}><Monitor size={15} /></button>
        </div>
        <Link href={backHref} className="inline-flex items-center gap-2 text-sm font-bold text-[#0873d1] dark:text-[#8fbff0]"><ArrowLeft size={16} /> <span className="hidden sm:inline">{backLabel}</span></Link>
      </div>
    </div>
  </header>
}
