import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import NatureQuizGame from "@/components/quiz"

export default function Games() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-1 container mx-auto px-4 py-12">
        <NatureQuizGame />
      </div>
      <Footer />
    </main>
  )
}
