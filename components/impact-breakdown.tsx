"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TreePine, Droplets, Wind, Zap } from "lucide-react"

export function ImpactBreakdown() {
  const impacts = [
    {
      icon: TreePine,
      title: "Trees Needed",
      value: "~60",
      description: "Trees needed annually to offset average emissions",
      color: "text-primary",
      bgColor: "bg-primary/10 dark:bg-primary/20",
    },
    {
      icon: Droplets,
      title: "Water Impact",
      value: "2,400L",
      description: "Liters of water used in energy production monthly",
      color: "text-secondary",
      bgColor: "bg-secondary/10 dark:bg-secondary/20",
    },
    {
      icon: Wind,
      title: "Air Quality",
      value: "12kg",
      description: "Particulate matter from transportation monthly",
      color: "text-chart-3",
      bgColor: "bg-accent/30 dark:bg-accent/40",
    },
    {
      icon: Zap,
      title: "Energy Use",
      value: "900kWh",
      description: "Average household electricity consumption",
      color: "text-chart-1",
      bgColor: "bg-chart-1/10 dark:bg-chart-1/20",
    },
  ]

  return (
    <section className="bg-muted/30 dark:bg-muted/20 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Understanding Your Impact
            </h2>
            <p className="text-pretty text-lg text-muted-foreground">
              See how your carbon footprint translates to real-world effects
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {impacts.map((impact, index) => {
              const Icon = impact.icon
              return (
                <Card key={index} className="border-2 transition-all hover:shadow-lg dark:hover:shadow-lg/50">
                  <CardHeader>
                    <div className={`mb-3 inline-flex rounded-lg ${impact.bgColor} p-3`}>
                      <Icon className={`h-6 w-6 ${impact.color}`} />
                    </div>
                    <CardTitle className="text-lg">{impact.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`mb-2 text-3xl font-bold ${impact.color}`}>{impact.value}</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">{impact.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
