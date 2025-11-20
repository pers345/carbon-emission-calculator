import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Calculator } from "@/components/calculator"
import { ImpactBreakdown } from "@/components/impact-breakdown"
import { TipsSection } from "@/components/tips-section"
import { Footer } from "@/components/footer"
import { GlobalEmissionsMap } from "@/components/global-emissions-map"
import { RouteEmissionsCalculator } from "@/components/route-emissions-calculator"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Calculator />
      <RouteEmissionsCalculator />
      <ImpactBreakdown />
      <GlobalEmissionsMap />
      <TipsSection />
      <Footer />
    </main>
  )
}
