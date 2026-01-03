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
    <section className="relative bg-primary py-16 md:py-24">
      {backgroundImage && (
        <>
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
          <div className="absolute inset-0 bg-primary/80" />
        </>
      )}
      <div className="container relative mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-4 flex items-center gap-2 text-sm text-primary-foreground/70">
          <Link href="/" className="flex items-center hover:text-primary-foreground">
            <Home className="h-4 w-4" />
          </Link>
          {breadcrumb.map((item, index) => (
            <span key={index} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4" />
              {item.href ? (
                <Link href={item.href} className="hover:text-primary-foreground">
                  {item.label}
                </Link>
              ) : (
                <span className="text-primary-foreground">{item.label}</span>
              )}
            </span>
          ))}
        </nav>

        <h1 className="text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="mt-4 text-lg text-primary-foreground/80">{description}</p>}
      </div>
    </section>
  )
}
