'use client'

import { useState } from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import dynamic from 'next/dynamic'
import { whatsappLink } from '@/lib/iplux-links'

const CoverageMap = dynamic(() => import('@/components/coverage/coverage-map').then((module) => module.CoverageMap), { ssr: false })

type CoverageLocation = { lat: number; lng: number; label: string }
type CoverageForm = { name: string; phone: string; address: string }
type FormErrors = Partial<Record<keyof CoverageForm, string>>

const EMPTY_FORM: CoverageForm = { name: '', phone: '', address: '' }
const DEFAULT_LOCATION: CoverageLocation = { lat: -12.0464, lng: -77.0428, label: 'Ubicación no seleccionada' }

export function CoverageSection() {
  const [coverageForm, setCoverageForm] = useState<CoverageForm>(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState<FormErrors>({})
  const [coverageLocation, setCoverageLocation] = useState<CoverageLocation>(DEFAULT_LOCATION)
  const [coverageMessage, setCoverageMessage] = useState('')

  const updateField = (field: keyof CoverageForm, value: string) => {
    setCoverageForm((current) => ({ ...current, [field]: value }))
    setFormErrors((current) => ({ ...current, [field]: undefined }))
    setCoverageMessage('')
  }

  const validateForm = () => {
    const errors: FormErrors = {}
    if (!coverageForm.name.trim()) errors.name = 'Ingresa tu nombre completo.'
    if (!/^9\d{8}$/.test(coverageForm.phone.replace(/\s/g, ''))) errors.phone = 'Ingresa un celular peruano válido de 9 dígitos.'
    if (!coverageForm.address.trim()) errors.address = 'Ingresa la dirección del servicio.'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const submitCoverage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!validateForm()) return
    const message = `Hola IPLUX, quisiera consultar cobertura.\n\nNombre: ${coverageForm.name.trim()}\nCelular: ${coverageForm.phone.trim()}\nDirección: ${coverageForm.address.trim()}\nUbicación: ${coverageLocation.label}\nCoordenadas: ${coverageLocation.lat.toFixed(5)}, ${coverageLocation.lng.toFixed(5)}\nGoogle Maps: https://www.google.com/maps?q=${coverageLocation.lat},${coverageLocation.lng}\n\nQuedo atento a la disponibilidad. Gracias.`
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer')
    setCoverageMessage('Se abrió WhatsApp con los datos de tu consulta.')
  }

  return (
    <section id="cobertura" className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
      <div className="mb-7 max-w-2xl">
        <p className="mb-2 text-sm font-bold uppercase tracking-[.18em] text-[#079f9a]">¿Llegamos a tu hogar?</p>
        <h2 className="text-4xl font-black tracking-tight text-[#092a62] dark:text-slate-50 sm:text-5xl">Consulta cobertura</h2>
        <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">Déjanos tus datos y te ayudaremos a verificar disponibilidad en tu zona.</p>
      </div>
      <div className="grid overflow-hidden rounded-[2rem] bg-[#092a62] lg:grid-cols-[.8fr_1.2fr]">
        <form onSubmit={submitCoverage} noValidate className="order-2 space-y-5 p-7 text-white sm:p-10 lg:order-1">
          <div><p className="text-sm font-bold uppercase tracking-[.16em] text-[#61ddd5]">Datos del servicio</p><h3 className="mt-2 text-2xl font-black">Cuéntanos dónde instalar</h3></div>
          <label className="block text-sm font-semibold">Nombre completo<input aria-invalid={Boolean(formErrors.name)} aria-describedby={formErrors.name ? 'coverage-name-error' : undefined} value={coverageForm.name} onChange={(event) => updateField('name', event.target.value)} className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-white px-4 text-sm font-normal text-slate-700 outline-none focus:border-[#61ddd5] focus:ring-4 focus:ring-cyan-200/30" />{formErrors.name && <span id="coverage-name-error" className="mt-1 block text-sm font-medium text-[#a7f3d0]">{formErrors.name}</span>}</label>
          <label className="block text-sm font-semibold">Celular<input aria-invalid={Boolean(formErrors.phone)} aria-describedby={formErrors.phone ? 'coverage-phone-error' : undefined} inputMode="numeric" maxLength={11} value={coverageForm.phone} onChange={(event) => updateField('phone', event.target.value.replace(/[^0-9\s]/g, ''))} className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-white px-4 text-sm font-normal text-slate-700 outline-none focus:border-[#61ddd5] focus:ring-4 focus:ring-cyan-200/30" />{formErrors.phone && <span id="coverage-phone-error" className="mt-1 block text-sm font-medium text-[#a7f3d0]">{formErrors.phone}</span>}</label>
          <label className="block text-sm font-semibold">Dirección del servicio<input aria-invalid={Boolean(formErrors.address)} aria-describedby={formErrors.address ? 'coverage-address-error' : undefined} value={coverageForm.address} onChange={(event) => updateField('address', event.target.value)} placeholder="Calle, número, referencia" className="mt-2 h-12 w-full rounded-xl border border-white/20 bg-white px-4 text-sm font-normal text-slate-700 outline-none focus:border-[#61ddd5] focus:ring-4 focus:ring-cyan-200/30" />{formErrors.address && <span id="coverage-address-error" className="mt-1 block text-sm font-medium text-[#a7f3d0]">{formErrors.address}</span>}</label>
          <p className="flex items-start gap-2 text-sm leading-6 text-blue-100"><MessageCircle size={18} className="mt-1 shrink-0 text-[#61ddd5]" />También puedes enviarnos tu consulta por WhatsApp.</p>
          <button type="submit" className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#08c3ed] font-bold text-white transition hover:bg-[#00a8d5]">Consultar cobertura <ArrowRight size={17} /></button>
          {coverageMessage && <p role="status" className="text-sm font-semibold text-[#61ddd5]">{coverageMessage}</p>}
        </form>
        <div className="order-1 bg-white p-5 sm:p-7 lg:order-2 lg:p-8 dark:bg-[#13243a]"><div className="mb-4"><p className="text-sm font-bold uppercase tracking-[.16em] text-[#079f9a] dark:text-[#63d6d3]">Ubica tu domicilio</p><p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Busca una zona, usa tu ubicación o mueve el marcador.</p></div><CoverageMap onLocationChange={setCoverageLocation} searchContext={{ address: coverageForm.address }} /></div>
      </div>
    </section>
  )
}
