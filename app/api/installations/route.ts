import { wisphubClient, wisphubNotConfigured, wisphubRouteError } from '@/lib/wisphub-route'

export async function POST() {
  try {
    await wisphubClient().registerInstallation({})
    return wisphubNotConfigured('installation')
  } catch (error) {
    return wisphubRouteError('installation', error)
  }
}
