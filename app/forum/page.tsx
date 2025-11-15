import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ForumCategories } from "@/components/forum-categories"
import { ForumThreads } from "@/components/forum-threads"

export default function Forum() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Climate Community Forum</h1>
          <p className="text-muted-foreground">Join discussions about sustainability, carbon reduction, and climate action</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ForumCategories />
          </div>
          <div className="lg:col-span-3">
            <ForumThreads />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
