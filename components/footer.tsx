import { Leaf } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 dark:bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary p-2">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Carbon Calculator</span>
            </div>
            <p className="max-w-md text-balance text-sm leading-relaxed text-muted-foreground">
              Take action today for a sustainable tomorrow. Every step towards reducing your carbon footprint matters.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">
                About
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Methodology
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Resources
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Contact
              </a>
            </div>
            <p className="text-xs text-muted-foreground">© 2025 Carbon Calculator. Built for a greener future.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
