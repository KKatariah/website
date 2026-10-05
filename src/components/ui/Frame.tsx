import ScrollArea from "../ScrollArea";

const variants = {
	/** Padded, sunken panel for page content */
	section: "section",
	/** Compact box for character-sheet stats */
	sheet: "sheet-box",
	/** Just the thin gold border */
	plain: "thin-border",
};

type Props = {
	children?: React.ReactNode;
	variant?: keyof typeof variants;
	/** Scroll long content with the Morrowind scrollbar (the frame needs a height) */
	scroll?: boolean;
	className?: string;
	ref?: React.Ref<HTMLDivElement>;
} & React.HTMLAttributes<HTMLDivElement>;

/** The thin gold-bordered box used inside windows. */
export default function Frame({ children, variant = "section", scroll, className, ...rest }: Props) {
	const classes = className ? `${variants[variant]} ${className}` : variants[variant];
	if (scroll) {
		return (
			<ScrollArea className={classes} {...rest}>
				{children}
			</ScrollArea>
		);
	}
	return (
		<div className={classes} {...rest}>
			{children}
		</div>
	);
}
