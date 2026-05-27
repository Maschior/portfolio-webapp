import { cn } from '@/lib/shadcn'
import Image from 'next/image'

interface ProfileAvatarProps {
  className?: string
  size?: number
}

export function ProfileAvatar({ className, size = 40 }: ProfileAvatarProps) {
  return (
    <div
      className={cn('rounded-2xl overflow-hidden flex-shrink-0', className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/foto-perfil.png"
        alt="Matheus Delmaschio"
        width={size}
        height={size}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  )
}

