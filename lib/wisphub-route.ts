import { NextResponse } from 'next/server'
import { WisphubConfigurationError, createWispHubClient, type WisphubOperation } from '@/lib/services/wisphub'

export function wisphubNotConfigured(operation: WisphubOperation) {
  return NextResponse.json({
    error: 'WispHub operation not configured',
    operation,
    message: `The ${operation} operation is not available until its official WispHub endpoint and payload contract are confirmed.`,
  }, { status: 501 })
}

export function wisphubRouteError(operation: WisphubOperation, error: unknown) {
  if (error instanceof WisphubConfigurationError) return wisphubNotConfigured(operation)
  return NextResponse.json({ error: 'WispHub request could not be completed' }, { status: 502 })
}

export function wisphubClient() {
  return createWispHubClient()
}
