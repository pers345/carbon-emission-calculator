import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Calculator } from "@/components/calculator"
import { ImpactBreakdown } from "@/components/impact-breakdown"
import { TipsSection } from "@/components/tips-section"
import { Footer } from "@/components/footer"
import { GlobalEmissionsMap } from "@/components/global-emissions-map"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <Calculator />
      <ImpactBreakdown />
      <GlobalEmissionsMap />
      <TipsSection />
      <Footer />
    </main>
  )
}
