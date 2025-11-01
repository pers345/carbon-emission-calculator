import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Bike, Recycle, Sun, Utensils, Home } from "lucide-react"

export function TipsSection() {
  const tips = [
    {
      icon: Bike,
      title: "Choose Active Transport",
      description:
        "Walk, bike, or use public transit when possible. Reduce car trips by 30% to save 500kg CO₂ annually.",
    },
    {
      icon: Sun,
      title: "Switch to Renewables",
      description: "Use renewable energy sources or purchase green energy from your utility provider.",
    },
    {
      icon: Utensils,
      title: "Eat Plant-Based",
      description: "Reduce meat consumption. A plant-based diet can cut your food carbon footprint by up to 73%.",
    },
    {
      icon: Home,
      title: "Improve Home Efficiency",
      description: "Better insulation, LED bulbs, and smart thermostats can reduce home emissions by 25%.",
    },
    {
      icon: Recycle,
      title: "Reduce & Reuse",
      description: "Buy less, choose quality over quantity, and recycle properly to minimize waste emissions.",
    },
    {
      icon: Lightbulb,
      title: "Conscious Consumption",
      description: "Support sustainable brands and consider the lifecycle impact of your purchases.",
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
              Ways to Reduce Your Footprint
            </h2>
            <p className="text-pretty text-lg text-muted-foreground">
              Small changes can make a big difference for our planet
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip, index) => {
              const Icon = tip.icon
              return (
                <Card key={index} className="transition-all hover:shadow-md dark:hover:shadow-md/50">
                  <CardHeader>
                    <div className="mb-3 inline-flex rounded-lg bg-primary/10 dark:bg-primary/20 p-3">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{tip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">{tip.description}</p>
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
