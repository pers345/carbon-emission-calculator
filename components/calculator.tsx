"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Car, Plane, Home, ShoppingBag, CableIcon as CalcIcon } from "lucide-react"

interface EmissionInputs {
  carMiles: string
  flights: string
  electricity: string
  naturalGas: string
  shopping: string
}

export function Calculator() {
  const [inputs, setInputs] = useState<EmissionInputs>({
    carMiles: "",
    flights: "",
    electricity: "",
    naturalGas: "",
    shopping: "",
  })
  const [totalEmissions, setTotalEmissions] = useState<number | null>(null)

  const calculateEmissions = () => {
    const carEmissionFactor = 0.404
    const flightEmissionFactor = 90
    const electricityFactor = 0.92
    const naturalGasFactor = 5.3
    const shoppingFactor = 0.5

    const carEmissions = Number.parseFloat(inputs.carMiles || "0") * carEmissionFactor
    const flightEmissions = Number.parseFloat(inputs.flights || "0") * flightEmissionFactor
    const electricityEmissions = Number.parseFloat(inputs.electricity || "0") * electricityFactor
    const gasEmissions = Number.parseFloat(inputs.naturalGas || "0") * naturalGasFactor
    const shoppingEmissions = Number.parseFloat(inputs.shopping || "0") * shoppingFactor

    const total = carEmissions + flightEmissions + electricityEmissions + gasEmissions + shoppingEmissions
    setTotalEmissions(total)
  }

  const handleInputChange = (field: keyof EmissionInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-16 md:py-24" id="calculator">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Calculate Your Monthly Emissions
            </h2>
            <p className="text-pretty text-lg text-muted-foreground">
              Enter your monthly activities to estimate your carbon footprint
            </p>
          </div>

          <Card className="border-2 shadow-lg dark:shadow-lg/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalcIcon className="h-5 w-5 text-primary" />
                Emission Calculator
              </CardTitle>
              <CardDescription>Fill in the fields below with your monthly usage</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="transport" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="transport">Transport</TabsTrigger>
                  <TabsTrigger value="home">Home</TabsTrigger>
                  <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
                </TabsList>

                <TabsContent value="transport" className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-2 rounded-lg bg-primary/10 dark:bg-primary/20 p-2">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="carMiles">Car Travel (miles per month)</Label>
                        <Input
                          id="carMiles"
                          type="number"
                          placeholder="e.g., 500"
                          value={inputs.carMiles}
                          onChange={(e) => handleInputChange("carMiles", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Average commute and personal driving</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-2 rounded-lg bg-secondary/10 dark:bg-secondary/20 p-2">
                        <Plane className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="flights">Flight Hours (per month)</Label>
                        <Input
                          id="flights"
                          type="number"
                          placeholder="e.g., 4"
                          value={inputs.flights}
                          onChange={(e) => handleInputChange("flights", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Total hours spent flying</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="home" className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-2 rounded-lg bg-primary/10 dark:bg-primary/20 p-2">
                        <Home className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="electricity">Electricity (kWh per month)</Label>
                        <Input
                          id="electricity"
                          type="number"
                          placeholder="e.g., 900"
                          value={inputs.electricity}
                          onChange={(e) => handleInputChange("electricity", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Check your utility bill for exact usage</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="mt-2 rounded-lg bg-secondary/10 dark:bg-secondary/20 p-2">
                        <Home className="h-5 w-5 text-secondary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="naturalGas">Natural Gas (therms per month)</Label>
                        <Input
                          id="naturalGas"
                          type="number"
                          placeholder="e.g., 40"
                          value={inputs.naturalGas}
                          onChange={(e) => handleInputChange("naturalGas", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Heating and cooking gas usage</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="lifestyle" className="space-y-6 pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-2 rounded-lg bg-primary/10 dark:bg-primary/20 p-2">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <Label htmlFor="shopping">Shopping & Goods ($ per month)</Label>
                        <Input
                          id="shopping"
                          type="number"
                          placeholder="e.g., 500"
                          value={inputs.shopping}
                          onChange={(e) => handleInputChange("shopping", e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">Clothing, electronics, and consumer goods</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex flex-col gap-4 border-t pt-6">
                <Button onClick={calculateEmissions} size="lg" className="w-full md:w-auto">
                  Calculate My Footprint
                </Button>

                {totalEmissions !== null && (
                  <div className="rounded-lg bg-primary/5 dark:bg-primary/10 p-6">
                    <div className="flex flex-col items-center gap-2 text-center md:flex-row md:justify-between md:text-left">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Your Monthly Carbon Footprint</p>
                        <p className="text-4xl font-bold text-primary">{totalEmissions.toFixed(2)} kg</p>
                        <p className="mt-1 text-sm text-muted-foreground">CO₂ equivalent per month</p>
                      </div>
                      <div className="rounded-lg bg-background dark:bg-background/50 p-4 text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {((totalEmissions / 1000) * 12).toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">tonnes/year</p>
                      </div>
                    </div>
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
