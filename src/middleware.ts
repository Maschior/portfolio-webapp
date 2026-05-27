import { defaultLocale, locales } from '@/lib/navigation'
import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'never',
  alternateLinks: false,
})

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
}
