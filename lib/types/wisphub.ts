export type WisphubOperation = 'coverage' | 'installation' | 'ticket' | 'customer'

export interface CoverageQuery {
  query?: string
  city?: string
  district?: string
}

export type InstallationRequest = Record<string, unknown>
export type TicketRequest = Record<string, unknown>
export type CustomerQuery = Record<string, unknown>

export interface WisphubClient {
  queryZones(input?: CoverageQuery): Promise<never>
  registerInstallation(input: InstallationRequest): Promise<never>
  createTicket(input: TicketRequest): Promise<never>
  getCustomer(input: CustomerQuery): Promise<never>
}
