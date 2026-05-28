import { LogoHorizontal } from '@/components/common'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/lib/navigation'
import { ArrowUpRight, Github, Linkedin, MapPin, Mail } from 'lucide-react'

interface FooterLink {
  name: string
  href: string
  external?: boolean
}

interface FooterSection {
  title: string
  links: FooterLink[]
}

const footerSections: FooterSection[] = [
  {
    title: 'Navegação',
    links: [
      { name: 'Início', href: '/' },
      { name: 'Sobre', href: '/about' },
      { name: 'Contato', href: '/contact' },
    ],
  },
  {
    title: 'Redes Sociais',
    links: [
      { name: 'LinkedIn', href: 'https://www.linkedin.com/in/matheusrdb', external: true },
      { name: 'GitHub', href: 'https://github.com/Maschior', external: true },
    ],
  },
  {
    title: 'Contato',
    links: [
      { name: 'matheusrb8@outlook.com.br', href: 'mailto:matheusrb8@outlook.com.br', external: true },
      { name: 'dev@maschior.com', href: 'mailto:dev@maschior.com', external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t-2 border-dotted border-border/40 bg-background">
      <div className="max-w-6xl mx-auto px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1 space-y-6">
            <LogoHorizontal />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Analista de Suporte e DevOps. Especialista em automação, infraestrutura e CI/CD.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 flex-shrink-0" />
              <span>São Paulo, SP</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="https://github.com/Maschior" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Link>
              <Link href="https://www.linkedin.com/in/matheusrdb" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </Link>
              <Link href="mailto:dev@maschior.com" className="text-muted-foreground hover:text-foreground transition-colors p-1" aria-label="Email">
                <Mail className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground tracking-wide">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center group"
                    >
                      <span>{link.name}</span>
                      {link.external && <ArrowUpRight className="ml-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 border-dotted border-border/40" />

        <div className="flex flex-col items-start justify-between space-y-6 lg:flex-row lg:items-center lg:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Matheus Delmaschio. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  )
}
