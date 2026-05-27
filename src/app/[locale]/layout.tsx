import { Footer, Navigation } from '@/components/layout'
import { InitialLoading } from '@/components/ui/initial-loading'
import { RouteTransition } from '@/components/ui/route-transition'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import type { ReactNode } from 'react'

interface LocaleLayoutProps {
  children: ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <InitialLoading />
      <div className="flex min-h-screen flex-col">
        <Navigation />
        <RouteTransition className="flex-1">
          <main>{children}</main>
        </RouteTransition>
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}
