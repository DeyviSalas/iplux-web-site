export function isNonEmptyRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function isValidWispHubQuery(value: unknown): value is { query?: string; city?: string; district?: string } {
  if (!isNonEmptyRecord(value)) return false
  return ['query', 'city', 'district'].every((key) => value[key] === undefined || typeof value[key] === 'string')
}
