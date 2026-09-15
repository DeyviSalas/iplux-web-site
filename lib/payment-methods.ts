import { billingContact } from '@/lib/iplux-links'

export const paymentWhatsappMessage = 'Hola IPLUX, quisiera solicitar los datos actualizados para realizar el pago de mi servicio.'

export function paymentWhatsappLink(message = paymentWhatsappMessage) {
  return `https://wa.me/${billingContact.whatsapp}?text=${encodeURIComponent(message)}`
}
