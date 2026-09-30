import 'server-only'

export function getWispHubConfiguration() {
  const baseUrl = process.env.WISPHUB_API_URL?.trim()
  const apiKey = process.env.WISPHUB_API_KEY?.trim()
  return baseUrl && apiKey ? { baseUrl: baseUrl.replace(/\/$/, ''), apiKey } : null
}
