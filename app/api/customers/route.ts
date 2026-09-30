import { wisphubClient, wisphubNotConfigured, wisphubRouteError } from '@/lib/wisphub-route'

export async function GET() {
  try {
    await wisphubClient().getCustomer({})
    return wisphubNotConfigured('customer')
  } catch (error) {
    return wisphubRouteError('customer', error)
  }
}
