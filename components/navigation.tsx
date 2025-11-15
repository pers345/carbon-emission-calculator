import Link from "next/link"
import { Leaf } from "lucide-react"

export function Navigation() {
  const links = [
    { href: "#calculator", label: "Calculator" },
    { href: "/climate-news", label: "Climate News" },
    { href: "/forum", label: "Forum" },
    { href: "/games", label: "Games" },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-foreground hover:text-primary transition-colors"
        >
          <Leaf className="h-6 w-6 text-primary" />
          <span>Carbon Calc</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu placeholder */}
        <div className="md:hidden flex items-center gap-4">
          <button className="text-foreground hover:text-primary">Menu</button>
        </div>
      </div>
    </nav>
  )
}
