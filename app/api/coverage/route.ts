import { wisphubClient, wisphubNotConfigured, wisphubRouteError } from '@/lib/wisphub-route'

export async function GET() {
  try {
    await wisphubClient().queryZones()
    return wisphubNotConfigured('coverage')
  } catch (error) {
    return wisphubRouteError('coverage', error)
  }
}
