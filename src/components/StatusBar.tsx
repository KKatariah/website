/** Health / Magicka / Fatigue style bar, using the game's own bar colours. */
export default function StatusBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
	return (
		<div className="status-bar">
			<div className="status-bar-fill" style={{ width: `${(value / max) * 100}%`, background: color }} />
			<span>
				{value}/{max}
			</span>
		</div>
	);
}
