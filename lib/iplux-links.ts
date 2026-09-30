export const contactInfo = { phone: '988 010 713', whatsapp: '51988010713', email: 'info@redcabletv.com', hours: 'Lunes a sábado, 9:00 a. m. a 6:00 p. m.', address: 'Huaycán, Lima' }

export const billingContact = { phone: '950 899 467', whatsapp: '51950899467' }

export const coverageRegions = ['Lima', 'Huaycán', 'Huancayo']

export const companyInfo = { legalName: 'RED CABLE TV E.I.R.L', ruc: '20606383151' }

export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/interplux', short: 'f' },
  { label: 'Instagram', href: 'https://www.instagram.com/', short: 'ig' },
  { label: 'TikTok', href: 'https://www.tiktok.com/', short: 'tk' },
  { label: 'YouTube', href: 'https://www.youtube.com/', short: 'yt' },
]

export const footerGroups = [
  { title: 'Servicios', links: [['Internet', '#planes'], ['Internet + TV', '#planes'], ['Planes', '#planes'], ['Promociones', '#planes'], ['Cobertura', '#cobertura']] },
  { title: 'Atención al usuario', links: [['Preguntas frecuentes', '#preguntas'], ['Medios de pago', '/medios-de-pago'], ['Soporte técnico', '#contacto'], ['Reclamos', '/informacion-usuarios'], ['Libro de Reclamaciones', '/libro-de-reclamaciones']] },
  { title: 'Información legal', links: [['Términos y condiciones', '/informacion-usuarios'], ['Política de privacidad', '/informacion-usuarios'], ['Protección de datos', '/informacion-usuarios'], ['Derechos del usuario', '/informacion-usuarios'], ['Política de cookies', '/informacion-usuarios']] },
]

export const rightsLinks = ['Derechos del usuario', 'Calidad del servicio', 'Interrupciones del servicio', 'Reclamos', 'Protección de datos', 'Seguridad de la información', 'Canal de consultas', 'Canal de denuncias']

export function whatsappLink(message: string) { return `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(message)}` }
