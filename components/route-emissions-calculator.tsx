"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Zap, Leaf } from "lucide-react"

interface Route {
  distance: number // in km
  emissions: {
    car: number
    bus: number
    train: number
    electric: number
    bicycle: number
  }
}

export function RouteEmissionsCalculator() {
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  const sourceRef = useRef<any>(null)
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null)
  const [endPoint, setEndPoint] = useState<[number, number] | null>(null)
  const [route, setRoute] = useState<Route | null>(null)
  const [transportMode, setTransportMode] = useState("car")
  const [mapLoaded, setMapLoaded] = useState(false)

  // Load OpenLayers from CDN
  useEffect(() => {
    if (mapLoaded || !mapContainer.current) return

    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://cdn.jsdelivr.net/npm/ol@latest/ol.css"
    document.head.appendChild(link)

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/ol@latest/dist/ol.js"
    script.onload = () => {
      if (typeof window !== "undefined" && (window as any).ol) {
        initializeMap()
        setMapLoaded(true)
      }
    }
    document.body.appendChild(script)
  }, [mapLoaded])

  const initializeMap = () => {
    if (!mapContainer.current || !window) return

    const ol = (window as any).ol

    const source = new ol.source.Vector()
    sourceRef.current = source
    const vector = new ol.layer.Vector({ source })

    mapRef.current = new ol.Map({
      target: mapContainer.current,
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM(),
        }),
        vector,
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([0, 20]),
        zoom: 4,
      }),
    })

    let currentStartPoint: [number, number] | null = null
    let currentEndPoint: [number, number] | null = null

    mapRef.current.on("click", (evt: any) => {
      const coord = ol.proj.toLonLat(evt.coordinate)
      const point: [number, number] = [coord[0], coord[1]]

      if (!currentStartPoint) {
        currentStartPoint = point
        setStartPoint(point)
        addMarker(source, coord, "start", ol)
      } else if (!currentEndPoint) {
        currentEndPoint = point
        setEndPoint(point)
        addMarker(source, coord, "end", ol)
        calculateRoute(currentStartPoint, point, source, ol)
      }
    })
  }

  const addMarker = (source: any, coords: any, type: string, ol: any) => {
    const feature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat(coords)),
    })

    const color = type === "start" ? "#22c55e" : "#ef4444"

    const style = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
          color: color,
        }),
        stroke: new ol.style.Stroke({
          color: "#fff",
          width: 2,
        }),
      }),
      text: new ol.style.Text({
        text: type === "start" ? "A" : "B",
        fill: new ol.style.Fill({ color: "#fff" }),
        font: "bold 14px Arial",
        offsetY: -2,
      }),
    })

    feature.setStyle(style)
    source.addFeature(feature)
  }

  const calculateRoute = (start: [number, number], end: [number, number], source: any, ol: any) => {
    const distance = haversineDistance(start, end)

    const emissionFactors = {
      car: 120,
      bus: 25,
      train: 15,
      electric: 50,
      bicycle: 0,
    }

    const emissions = {
      car: (distance * emissionFactors.car) / 1000,
      bus: (distance * emissionFactors.bus) / 1000,
      train: (distance * emissionFactors.train) / 1000,
      electric: (distance * emissionFactors.electric) / 1000,
      bicycle: 0,
    }

    const line = new ol.Feature({
      geometry: new ol.geom.LineString([ol.proj.fromLonLat(start), ol.proj.fromLonLat(end)]),
    })

    const lineStyle = new ol.style.Style({
      stroke: new ol.style.Stroke({
        color: "#3b82f6",
        width: 3,
      }),
    })

    line.setStyle(lineStyle)
    source.addFeature(line)

    setRoute({
      distance,
      emissions,
    })
  }

  const haversineDistance = (start: [number, number], end: [number, number]): number => {
    const R = 6371 // Earth's radius in kilometers
    const dLat = ((end[1] - start[1]) * Math.PI) / 180
    const dLon = ((end[0] - start[0]) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((start[1] * Math.PI) / 180) *
        Math.cos((end[1] * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const resetMap = () => {
    setStartPoint(null)
    setEndPoint(null)
    setRoute(null)
    if (sourceRef.current) {
      sourceRef.current.clear()
    }
  }

  return (
    <section className="py-16 md:py-24" id="route-calculator">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">Route Carbon Calculator</h2>
            <p className="text-pretty text-lg text-muted-foreground">
              Click two points on the map to calculate CO₂ emissions for different transport modes
            </p>
          </div>

          <Card className="border-2 shadow-lg dark:shadow-lg/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Interactive Map
              </CardTitle>
              <CardDescription>Select start point (green) and end point (red) by clicking on the map</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Map Container */}
                <div
                  ref={mapContainer}
                  className="h-96 w-full rounded-lg border-2 border-border dark:border-border/50"
                />

                {/* Results Section */}
                {route && (
                  <div className="space-y-4">
                    <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-4">
                      <p className="text-sm font-medium text-muted-foreground">Distance</p>
                      <p className="text-2xl font-bold text-primary">{route.distance.toFixed(2)} km</p>
                    </div>

                    <div>
                      <Label htmlFor="transport-select" className="mb-2 block">
                        Select Transport Mode
                      </Label>
                      <Select value={transportMode} onValueChange={setTransportMode}>
                        <SelectTrigger id="transport-select">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Car (120g CO₂/km)</SelectItem>
                          <SelectItem value="bus">Bus (25g CO₂/km)</SelectItem>
                          <SelectItem value="train">Train (15g CO₂/km)</SelectItem>
                          <SelectItem value="electric">Electric Vehicle (50g CO₂/km)</SelectItem>
                          <SelectItem value="bicycle">Bicycle (0g CO₂/km)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Emissions Comparison */}
                    <div className="grid gap-4 md:grid-cols-2">
                      {Object.entries(route.emissions).map(([mode, emissions]) => (
                        <div
                          key={mode}
                          className={`rounded-lg border-2 p-4 ${
                            transportMode === mode
                              ? "border-primary bg-primary/5 dark:bg-primary/10"
                              : "border-border dark:border-border/50"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            {mode === "bicycle" ? (
                              <Leaf className="h-5 w-5 text-green-500" />
                            ) : (
                              <Zap className="h-5 w-5 text-amber-500" />
                            )}
                            <p className="font-semibold capitalize">{mode}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">CO₂ Emissions</p>
                          <p className="text-xl font-bold">{emissions.toFixed(2)} kg</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={resetMap} variant="outline" className="w-full bg-transparent">
                        Clear Map
                      </Button>
                    </div>
                  </div>
                )}

                {!route && (
                  <div className="rounded-lg bg-secondary/5 dark:bg-secondary/10 p-6 text-center">
                    <p className="text-muted-foreground">
                      {!startPoint
                        ? "Click on the map to set your start point (green marker)"
                        : "Click on the map to set your end point (red marker)"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
