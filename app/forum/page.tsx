import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default function Forum() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Community Forum</h1>
        <div className="text-muted-foreground">
          <p className="text-lg mb-4">Coming soon: Join discussions about sustainability and climate action.</p>
        </div>
      </div>
      <Footer />
    </main>
  )
}
