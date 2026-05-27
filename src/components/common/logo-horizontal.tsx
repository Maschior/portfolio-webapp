import { cn } from '@/lib/shadcn'
import { LogoIcon } from './logo-icon'

interface LogoHorizontalProps {
  className?: string
}

export function LogoHorizontal({ className }: LogoHorizontalProps) {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <LogoIcon className="h-7 w-7" />
      <span className="font-semibold text-sm tracking-tight">
        Matheus Delmaschio
      </span>
    </div>
  )
}
