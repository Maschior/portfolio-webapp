import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'

export async function generateLocalizedMetadata(
  locale: string,
  page: string,
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const baseUrl = 'https://maschior.com'

  const title = t(`${page}.title`)
  const description = t(`${page}.description`)
  const keywords = t.raw(`${page}.keywords`) || []
  const ogLocale = locale === 'pt' ? 'pt_BR' : 'en_US'

  return {
    title,
    description,
    keywords: Array.isArray(keywords) ? keywords : [],
    authors: [{ name: 'Matheus Rubens Delmaschio Borges', url: baseUrl }],
    creator: 'Matheus Delmaschio',
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: 'website',
      locale: ogLocale,
      siteName: 'Matheus Delmaschio',
      title,
      description,
    },
    robots: { index: true, follow: true },
    category: 'technology',
  }
}

export function generateStructuredData(
  type: 'Person' | 'WebSite',
  data: Record<string, unknown>
) {
  const baseUrl = 'https://maschior.com'
  const commonContext = { '@context': 'https://schema.org' }

  switch (type) {
    case 'Person':
      return {
        ...commonContext,
        '@type': 'Person',
        name: 'Matheus Rubens Delmaschio Borges',
        url: baseUrl,
        image: `${baseUrl}/foto-perfil.png`,
        jobTitle: 'Analista de Automação Python | Infraestrutura Cloud & DevOps',
        worksFor: { '@type': 'Organization', name: 'Softtek (Cummins)' },
        knowsAbout: [
          'Python', 'Docker', 'Jenkins', 'CI/CD', 'DevOps', 'Linux', 'Selenium',
          'JavaScript', 'SQL', 'Shell Script', 'Bash', 'PowerShell', 'Gitea',
          'pfSense', 'Squid', 'Samba', 'MySQL', 'PostgreSQL', 'SQL Server',
          'Oracle EBS', 'ServiceNow', 'Microsoft 365'
        ],
        sameAs: ['https://www.linkedin.com/in/matheusrdb', 'https://github.com/Maschior'],
        ...data,
      }
    case 'WebSite':
      return {
        ...commonContext,
        '@type': 'WebSite',
        name: 'Matheus Delmaschio',
        url: baseUrl,
        ...data,
      }
    default:
      return { ...commonContext, ...data }
  }
}
