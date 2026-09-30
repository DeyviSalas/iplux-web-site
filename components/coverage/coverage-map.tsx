'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LocateFixed, MapPin, Search } from 'lucide-react'
import L, { type LatLngExpression } from 'leaflet'
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const markerIcon = new L.Icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png', shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41] })
const DEFAULT_CENTER: LatLngExpression = [-12.0464, -77.0428]
const INITIAL_POSITION: [number, number] = [-12.0464, -77.0428]
const COVERAGE_ZONES = [
  { name: 'Huaycán', center: [-11.9872, -76.8131] as [number, number] },
  { name: 'Lima Metropolitana', center: [-12.0464, -77.0428] as [number, number] },
  { name: 'Huancayo', center: [-12.0651, -75.2049] as [number, number] },
]

type CoverageLocation = { lat: number; lng: number; label: string }
type NominatimResult = { lat: string; lon: string; display_name: string }
type SearchContext = { address?: string; city?: string; district?: string }

function MapClickHandler({ onSelect }: { onSelect: (position: [number, number]) => void }) { useMapEvents({ click: (event) => onSelect([event.latlng.lat, event.latlng.lng]) }); return null }
function MapViewport({ position }: { position: [number, number] }) { const map = useMap(); useEffect(() => { map.setView(position, Math.max(map.getZoom(), 12), { animate: true }) }, [map, position]); return null }

export function CoverageMap({ onLocationChange, searchContext }: { onLocationChange: (location: CoverageLocation) => void; searchContext?: SearchContext }) {
  const [position, setPosition] = useState<[number, number]>(INITIAL_POSITION)
  const [query, setQuery] = useState('')
  const [label, setLabel] = useState('Ubicación no seleccionada')
  const [status, setStatus] = useState('Haz clic en el mapa o arrastra el marcador para indicar tu ubicación.')
  const [isSearching, setIsSearching] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const lastSearchRef = useRef('')
  const zoneMatches = useMemo(() => { const term = query.trim().toLowerCase(); return term ? COVERAGE_ZONES.filter((zone) => zone.name.toLowerCase().includes(term)) : [] }, [query])

  const selectPosition = useCallback((next: [number, number], nextLabel = 'Ubicación seleccionada') => {
    setPosition(next); setLabel(nextLabel); setStatus('Ubicación lista para consultar cobertura.'); onLocationChange({ lat: next[0], lng: next[1], label: nextLabel })
  }, [onLocationChange])

  const searchLocation = useCallback(async () => {
    const searchTerm = query.trim()
    if (!searchTerm || isSearching || lastSearchRef.current === searchTerm) return
    lastSearchRef.current = searchTerm; abortRef.current?.abort(); const controller = new AbortController(); abortRef.current = controller
    setIsSearching(true); setStatus('Buscando ubicación...')
    try {
      const withoutHouseNumber = searchTerm.replace(/^\s*(?:n[°º.]?\s*)?\d+[\s,/-]*/i, '').trim()
      const contextParts = [searchContext?.district, searchContext?.city, 'Perú'].filter(Boolean).join(', ')
      const queries = Array.from(new Set([
        searchTerm,
        `${searchTerm}, Perú`,
        contextParts ? `${searchTerm}, ${contextParts}` : '',
        withoutHouseNumber && withoutHouseNumber !== searchTerm ? `${withoutHouseNumber}${contextParts ? `, ${contextParts}` : ', Perú'}` : '',
      ].filter(Boolean))).slice(0, 4)
      let result: NominatimResult | undefined
      for (const candidate of queries) {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&limit=5&countrycodes=pe&accept-language=es&q=${encodeURIComponent(candidate)}`, { headers: { Accept: 'application/json' }, signal: controller.signal })
        if (!response.ok) throw new Error('request')
        const results = await response.json() as NominatimResult[]
        result = results[0]
        if (result) break
      }
      if (!result) { setStatus('No encontramos la dirección exacta. Puedes buscar por distrito, ciudad o mover el marcador manualmente.'); return }
      const lat = Number(result.lat); const lng = Number(result.lon)
      if (!Number.isFinite(lat) || !Number.isFinite(lng)) throw new Error('coordinates')
      selectPosition([lat, lng], result.display_name)
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return
      setStatus('No fue posible realizar la búsqueda. Intenta nuevamente.')
    } finally { if (abortRef.current === controller) { abortRef.current = null; setIsSearching(false) } }
  }, [isSearching, query, selectPosition])

  useEffect(() => () => abortRef.current?.abort(), [])

  const locateUser = () => {
    if (!navigator.geolocation) { setStatus('La geolocalización no está disponible en este navegador.'); return }
    setStatus('Solicitando tu ubicación...')
    navigator.geolocation.getCurrentPosition(({ coords }) => selectPosition([coords.latitude, coords.longitude], 'Mi ubicación actual'), (error) => { setStatus(error.code === error.PERMISSION_DENIED ? 'Permiso de ubicación rechazado. Selecciona el punto manualmente.' : 'No fue posible obtener tu ubicación. Intenta nuevamente o selecciónala en el mapa.') }, { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 })
  }

  return <div className="space-y-3" aria-label="Mapa para consultar cobertura">
    <div className="flex flex-col gap-2 sm:flex-row"><label className="relative flex-1"><span className="sr-only">Buscar zona, dirección o ciudad</span><Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input aria-label="Buscar zona, dirección o ciudad" value={query} onChange={(event) => { setQuery(event.target.value); lastSearchRef.current = '' }} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); void searchLocation() } }} placeholder="Busca distrito, dirección o ciudad" className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none focus:border-[#0873d1] focus:ring-4 focus:ring-cyan-100" /></label><button type="button" onClick={() => void searchLocation()} disabled={!query.trim() || isSearching} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0873d1] px-4 text-sm font-bold text-white hover:bg-[#075ca8] disabled:cursor-not-allowed disabled:opacity-60"><Search size={16} />{isSearching ? 'Buscando...' : 'Buscar'}</button><button type="button" onClick={locateUser} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[#0873d1] px-4 text-sm font-bold text-[#0873d1] hover:bg-blue-50"><LocateFixed size={16} />Usar mi ubicación</button></div>
    {query && <div className="flex flex-wrap gap-2">{zoneMatches.map((zone) => <button key={zone.name} type="button" onClick={() => selectPosition(zone.center, zone.name)} className="rounded-full bg-[#e8fbfb] px-3 py-1.5 text-xs font-bold text-[#0873d1] hover:bg-[#d7f5f5]">{zone.name}</button>)}</div>}
    <div className="relative z-0 h-[300px] overflow-hidden rounded-2xl border border-slate-200 shadow-sm sm:h-[350px] lg:min-h-[400px]"><MapContainer center={DEFAULT_CENTER} zoom={11} scrollWheelZoom className="h-full w-full"><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><MapViewport position={position} /><MapClickHandler onSelect={(next) => selectPosition(next)} /><Marker position={position} icon={markerIcon} draggable eventHandlers={{ dragend: (event) => { const marker = event.target; const next = marker.getLatLng(); selectPosition([next.lat, next.lng]) } }} /></MapContainer></div>
    <div className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"><MapPin size={15} className="mt-0.5 shrink-0 text-[#079f9a]" /><span><strong className="text-slate-800 dark:text-slate-100">{label}</strong><br />{status}<br />Coordenadas: {position[0].toFixed(5)}, {position[1].toFixed(5)}</span></div>
  </div>
}
