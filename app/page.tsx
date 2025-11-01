import { Hero } from "@/components/hero"
import { Calculator } from "@/components/calculator"
import { ImpactBreakdown } from "@/components/impact-breakdown"
import { TipsSection } from "@/components/tips-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Calculator />
      <ImpactBreakdown />
      <TipsSection />
      <Footer />
    </main>
  )
}
