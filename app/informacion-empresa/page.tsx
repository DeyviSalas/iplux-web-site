'use client'

import Link from 'next/link'
import { ArrowRight, Building2, Clock3, FileText, Mail, MapPin, Phone, Receipt, WalletCards } from 'lucide-react'
import { SiteHeader } from '@/components/layout/iplux-header'

const company = {
  legalName: 'RED CABLE TV E.I.R.L.',
  ruc: '20606383151',
  fiscalAddress: 'UCV 204 ZONA R LOTE 6 A.H. HUAYCAN, ATE, LIMA',
  office: 'Av. 15 de Julio, Mercado Modelo, 2do piso, puesto 56',
  reference: 'Imprenta El Chamo',
  phone: '988 010 713',
  emails: ['hpariona@redcabletv.com', 'info@redcabletv.com'],
  hours: '8:00 a. m. a 5:00 p. m.',
  coverage: 'Lima/Huaycán y Huancayo',
}

const quickLinks = [
  { href: '#saldo', title: 'Consultar saldo', text: 'Gestiona tu consulta de saldo.', icon: Receipt },
  { href: '/medios-de-pago', title: 'Medios de pago', text: 'Revisa las opciones disponibles.', icon: WalletCards },
  { href: '/informacion-usuarios', title: 'Información para usuarios', text: 'Conoce tus derechos y canales de atención.', icon: FileText },
  { href: '/libro-de-reclamaciones', title: 'Libro de Reclamaciones', text: 'Presenta tu solicitud de forma segura.', icon: Building2 },
]

export default function InformacionEmpresaPage() {
  return <main className="min-h-screen bg-[#eef8ff] text-[#10265c] dark:bg-[#08111f] dark:text-slate-50">
    <SiteHeader backLabel="Volver al inicio" />
    <section className="px-5 py-14 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[.18em] text-[#079f9a] dark:text-[#63d6d3]">Información de la empresa</p>
          <h1 className="text-balance text-4xl font-black tracking-tight text-[#092a62] dark:text-slate-50 sm:text-6xl">Más sobre nosotros</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">Conoce la información empresarial y los canales oficiales de IPLUX.</p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm dark:border-[#2b4058] dark:bg-[#13243a] sm:p-8">
            <div className="flex items-start gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#e8fbfb] text-[#0873d1] dark:bg-[#16364a] dark:text-[#63d6d3]"><Building2 size={24} /></span><div><h2 className="text-2xl font-black text-[#092a62] dark:text-slate-50">Datos empresariales</h2><p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Información confirmada de la empresa.</p></div></div>
            <dl className="mt-8 grid gap-5 sm:grid-cols-2">
              <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Razón social</dt><dd className="mt-1 font-bold text-[#10265c] dark:text-slate-100">{company.legalName}</dd></div>
              <div><dt className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">RUC</dt><dd className="mt-1 font-bold text-[#10265c] dark:text-slate-100">{company.ruc}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Dirección fiscal</dt><dd className="mt-1 leading-6 text-slate-700 dark:text-slate-200">{company.fiscalAddress}</dd></div>
              <div className="sm:col-span-2"><dt className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Oficina Huaycán</dt><dd className="mt-1 leading-6 text-slate-700 dark:text-slate-200">{company.office}<br /><span className="text-sm text-slate-500 dark:text-slate-400">Referencia: {company.reference}</span></dd></div>
            </dl>
          </article>

          <article className="rounded-3xl border border-blue-100 bg-white p-6 shadow-sm dark:border-[#2b4058] dark:bg-[#13243a] sm:p-8">
            <h2 className="text-2xl font-black text-[#092a62] dark:text-slate-50">Canales oficiales</h2>
            <div className="mt-7 space-y-5 text-slate-700 dark:text-slate-200">
              <div className="flex gap-3"><Phone className="mt-1 shrink-0 text-[#0873d1] dark:text-[#63d6d3]" size={20} /><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">WhatsApp de atención</p><p className="mt-1 font-bold">{company.phone}</p></div></div>
              <div className="flex gap-3"><Mail className="mt-1 shrink-0 text-[#0873d1] dark:text-[#63d6d3]" size={20} /><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Correos</p>{company.emails.map((email) => <p key={email} className="mt-1 break-all font-medium">{email}</p>)}</div></div>
              <div className="flex gap-3"><Clock3 className="mt-1 shrink-0 text-[#0873d1] dark:text-[#63d6d3]" size={20} /><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Horario general</p><p className="mt-1 font-medium">{company.hours}</p></div></div>
              <div className="flex gap-3"><MapPin className="mt-1 shrink-0 text-[#0873d1] dark:text-[#63d6d3]" size={20} /><div><p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400">Cobertura</p><p className="mt-1 font-medium">{company.coverage}</p></div></div>
            </div>
          </article>
        </div>

        <div className="mt-10"><p className="mb-4 text-sm font-bold uppercase tracking-[.18em] text-[#079f9a] dark:text-[#63d6d3]">Accesos rápidos</p><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{quickLinks.map(({ href, title, text, icon: Icon }) => <Link key={title} href={href} className="group rounded-2xl border border-blue-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#0873d1] hover:shadow-lg dark:border-[#2b4058] dark:bg-[#13243a]"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#e8fbfb] text-[#0873d1] dark:bg-[#16364a] dark:text-[#63d6d3]"><Icon size={21} /></span><span className="mt-5 block font-extrabold text-[#092a62] dark:text-slate-50">{title}</span><span className="mt-2 block text-sm leading-6 text-slate-600 dark:text-slate-300">{text}</span><ArrowRight className="mt-4 text-[#0873d1] transition group-hover:translate-x-1 dark:text-[#63d6d3]" size={18} /></Link>)}</div></div>
        <div id="saldo" className="mt-10 rounded-2xl border border-[#bcefed] bg-[#e8fbfb] p-5 text-[#0b5360] dark:border-[#28576a] dark:bg-[#102f43] dark:text-slate-200"><p className="font-bold">Consultar saldo</p><p className="mt-1 text-sm leading-6">Para consultar tu saldo, comunícate con nuestro canal de atención: {company.phone}.</p></div>
      </div>
    </section>
  </main>
}
