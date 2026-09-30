import 'server-only'
import { getWispHubConfiguration } from '@/lib/config/wisphub'
import type { CoverageQuery, CustomerQuery, InstallationRequest, TicketRequest, WisphubClient, WisphubOperation } from '@/lib/types/wisphub'

export type { CoverageQuery, CustomerQuery, InstallationRequest, TicketRequest, WisphubClient, WisphubOperation } from '@/lib/types/wisphub'

class WisphubConfigurationError extends Error {
  constructor() {
    super('WispHub integration is not configured.')
    this.name = 'WispHubConfigurationError'
  }
}

function getConfiguration(): { baseUrl: string; apiKey: string } {
  const configuration = getWispHubConfiguration()
  if (!configuration) throw new WisphubConfigurationError()
  return configuration
}

function notConfigured(operation: WisphubOperation): never {
  throw new Error(`WispHub operation is not configured: ${operation}. Official endpoint and payload contract are required.`)
}

export function createWispHubClient(): WisphubClient {
  return {
    async queryZones() {
      getConfiguration()
      return notConfigured('coverage')
    },
    async registerInstallation() {
      getConfiguration()
      return notConfigured('installation')
    },
    async createTicket() {
      getConfiguration()
      return notConfigured('ticket')
    },
    async getCustomer() {
      getConfiguration()
      return notConfigured('customer')
    },
  }
}

export { WisphubConfigurationError }
