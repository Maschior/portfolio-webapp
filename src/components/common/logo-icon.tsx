import { cn } from '@/lib/shadcn'

interface LogoIconProps {
  className?: string
}

export function LogoIcon({ className }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-8 w-8', className)}
    >
      <rect width="40" height="40" rx="8" fill="currentColor" />
      <text
        x="50%"
        y="54%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="hsl(var(--background))"
        fontSize="16"
        fontWeight="700"
        fontFamily="var(--font-geist-sans), system-ui, sans-serif"
      >
        MD
      </text>
    </svg>
  )
}
