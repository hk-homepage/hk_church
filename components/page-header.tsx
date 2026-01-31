// Page title header with breadcrumb navigation
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumb: BreadcrumbItem[]
  backgroundImage?: string
}

export function PageHeader({ title, description, breadcrumb, backgroundImage }: PageHeaderProps) {
  return (
    <section className="relative py-16 md:py-24" style={{ backgroundColor: "var(--header-tint)" }}>
      {backgroundImage && (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
          <div
            className="absolute inset-0"
            style={{ backgroundColor: "rgba(236, 192, 220, 0.85)" }}
          />
        </>
      )}
      <div className="container relative mx-auto px-4">
        {/* Breadcrumb */}
        <nav
          className="mb-4 flex items-center gap-2 text-sm text-white/80 [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]"
        >
          <Link href="/" className="flex items-center hover:text-white">
            <Home className="h-4 w-4" />
          </Link>
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              {item.href ? (
                <Link href={item.href} className="hover:text-white">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1
          className="text-3xl font-bold text-white md:text-4xl lg:text-5xl [text-shadow:0_1px_3px_rgba(0,0,0,0.3)]"
        >
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-white/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.25)]">{description}</p>
        )}
      </div>
    </section>
  )
}
