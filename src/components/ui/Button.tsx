import Link from "next/link";

type Props = {
	children: React.ReactNode;
	/** Internal path → Next.js Link; full URL → plain link; omitted → <button> */
	href?: string;
	/** This button links to the page being viewed */
	current?: boolean;
	/** Toggle state, e.g. the selected inventory tab */
	pressed?: boolean;
	className?: string;
	onClick?: React.MouseEventHandler<HTMLElement>;
} & Omit<React.HTMLAttributes<HTMLElement>, "onClick">;

/** Morrowind framed button. Pressed/current buttons use the inverted (pushed-in) frame. */
export default function Button({ children, href, current, pressed, className, onClick, ...rest }: Props) {
	const props = {
		...rest,
		className: className ? `button ${className}` : "button",
		"aria-current": current ? ("page" as const) : undefined,
		onClick,
	};

	if (href?.startsWith("/")) {
		return (
			<Link href={href} {...props}>
				{children}
			</Link>
		);
	}
	if (href) {
		return (
			<a href={href} {...props}>
				{children}
			</a>
		);
	}
	return (
		<button type="button" aria-pressed={pressed} {...props}>
			{children}
		</button>
	);
}
