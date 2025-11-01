import { Leaf } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background py-20 md:py-32">
      <div className="container mx-auto px-4 mb-8 flex justify-end">
        <ThemeToggle />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <Leaf className="h-4 w-4" />
            Calculate Your Impact
          </div>
          <h1 className="mb-6 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Understand Your Carbon Footprint
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Take the first step towards a sustainable future. Calculate your carbon emissions and discover actionable
            ways to reduce your environmental impact.
          </p>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
    </section>
  )
}
