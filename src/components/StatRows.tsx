/** Label/value rows — each pair shares a row so long labels can't knock values out of line. */
export default function StatRows({ rows }: { rows: [label: string, value: string | number][] }) {
	return (
		<>
			{rows.map(([label, value]) => (
				<div key={label} className="stat-row">
					<span>{label}</span>
					<span>{value}</span>
				</div>
			))}
		</>
	);
}
