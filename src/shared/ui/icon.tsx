import { cn } from '@/shared/lib/css'
import { type ClassValue, type VariantProps, cva } from 'cva'

const iconVariants = cva({
	base: '',
	variants: {
		type: {
			default: 'iconify',
			color: 'iconify-color',
		},
		variant: {
			default: '',
			primary: 'text-primary',
			destructive: 'text-destructive',
			secondary: 'text-secondary',
			success: 'text-success',
			info: 'text-info',
		},
	},
	defaultVariants: {
		variant: 'default',
		type: 'default',
	},
})

type IconProps = React.ComponentProps<'svg'> &
	VariantProps<typeof iconVariants> & {
		icon: ClassValue
	}

export function Icon({ className, icon, variant, type, ...props }: IconProps) {
	return <svg className={cn(iconVariants({ variant, type, className }), icon)} {...props} />
}
