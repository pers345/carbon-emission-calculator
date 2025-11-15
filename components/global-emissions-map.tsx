"use client"

import { useState } from "react"
import { Globe, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"

interface CountryEmissions {
  name: string
  emissions: number
  percentage: number
  region: string
}

const GLOBAL_EMISSIONS_DATA: CountryEmissions[] = [
  { name: "China", emissions: 10065, percentage: 31, region: "Asia" },
  { name: "United States", emissions: 4727, percentage: 15, region: "North America" },
  { name: "India", emissions: 2411, percentage: 7, region: "Asia" },
  { name: "Russia", emissions: 1711, percentage: 5, region: "Europe" },
  { name: "Japan", emissions: 1050, percentage: 3, region: "Asia" },
  { name: "Germany", emissions: 759, percentage: 2, region: "Europe" },
  { name: "Iran", emissions: 720, percentage: 2, region: "Asia" },
  { name: "South Korea", emissions: 659, percentage: 2, region: "Asia" },
  { name: "Saudi Arabia", emissions: 621, percentage: 2, region: "Middle East" },
  { name: "Indonesia", emissions: 615, percentage: 2, region: "Asia" },
]

export function GlobalEmissionsMap() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"emissions" | "name">("emissions")

  const regions = Array.from(new Set(GLOBAL_EMISSIONS_DATA.map((d) => d.region)))

  const filteredData = selectedRegion
    ? GLOBAL_EMISSIONS_DATA.filter((d) => d.region === selectedRegion)
    : GLOBAL_EMISSIONS_DATA

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "emissions") return b.emissions - a.emissions
    return a.name.localeCompare(b.name)
  })

  const totalEmissions = GLOBAL_EMISSIONS_DATA.reduce((sum, d) => sum + d.emissions, 0)

  return (
    <section className="py-16 bg-gradient-to-b from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="h-8 w-8 text-primary" />
              <h2 className="text-4xl font-bold">Global Carbon Emissions</h2>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-balance">
              Explore worldwide carbon dioxide emissions by country. Understanding global patterns helps us identify
              where action is needed most.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Global Emissions</p>
                <p className="text-3xl font-bold">{(totalEmissions / 1000).toFixed(1)}B</p>
                <p className="text-xs text-muted-foreground">Metric tons CO₂e (2023)</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Top Emitter</p>
                <p className="text-3xl font-bold">{GLOBAL_EMISSIONS_DATA[0].name}</p>
                <p className="text-xs text-muted-foreground">{GLOBAL_EMISSIONS_DATA[0].percentage}% of global total</p>
              </div>
            </Card>
            <Card className="p-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Countries Tracked</p>
                <p className="text-3xl font-bold">{GLOBAL_EMISSIONS_DATA.length}+</p>
                <p className="text-xs text-muted-foreground">From our database</p>
              </div>
            </Card>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedRegion(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedRegion === null
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                All Regions
              </button>
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedRegion === region
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSortBy("emissions")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  sortBy === "emissions"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Sort by Emissions
              </button>
              <button
                onClick={() => setSortBy("name")}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  sortBy === "name"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                Sort A-Z
              </button>
            </div>
          </div>

          {/* Emissions List */}
          <div className="grid gap-3">
            {sortedData.map((country, index) => (
              <div key={country.name} className="group">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-sm text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{country.name}</h3>
                      <span className="text-xs text-muted-foreground">{country.region}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                        style={{ width: `${country.percentage * 3}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-bold text-foreground">{country.emissions.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">{country.percentage}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-4 rounded-lg bg-accent/10 border border-accent/20">
            <div className="flex gap-3">
              <TrendingUp className="h-5 w-5 text-accent-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-accent-foreground">Global Emissions Trend</p>
                <p className="text-xs text-accent-foreground/80">
                  Global CO₂ emissions continue to rise. International efforts to reduce emissions are critical for
                  climate stability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
