import * as AvatarPrimitive from '@radix-ui/react-avatar'
import * as React from 'react'

import { cn } from '@/shared/lib/css'

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) {
	return (
		<AvatarPrimitive.Root
			data-slot='avatar'
			className={cn('relative flex size-16 shrink-0 rounded-full', className)}
			{...props}
		/>
	)
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
	return (
		<AvatarPrimitive.Image
			data-slot='avatar-image'
			className={cn('aspect-square size-full rounded-[inherit]', className)}
			{...props}
		/>
	)
}

function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
	return (
		<AvatarPrimitive.Fallback
			data-slot='avatar-fallback'
			className={cn('bg-muted flex size-full items-center justify-center rounded-[inherit]', className)}
			{...props}
		/>
	)
}

export { Avatar, AvatarFallback, AvatarImage }
