import { wisphubClient, wisphubNotConfigured, wisphubRouteError } from '@/lib/wisphub-route'

export async function POST() {
  try {
    await wisphubClient().createTicket({})
    return wisphubNotConfigured('ticket')
  } catch (error) {
    return wisphubRouteError('ticket', error)
  }
}
