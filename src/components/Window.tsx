/** A Morrowind window: one thick frame, a title bar, and a body. */
export default function Window({
	title,
	children,
	bodyClassName = "window-body",
	style,
}: {
	title: string;
	children: React.ReactNode;
	bodyClassName?: string;
	style?: React.CSSProperties;
}) {
	return (
		<section className="window" style={style}>
			<div className="window-head">
				<h2>{title}</h2>
			</div>
			<div className={bodyClassName}>{children}</div>
		</section>
	);
}
