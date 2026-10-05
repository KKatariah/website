import Panel from "@/components/Panel";
import Button from "@/components/ui/Button";

export default function NotFound() {
	return (
		<Panel title="Unknown Location" banners={["tx_bannerd_danger_01", "tx_bannerd_danger_01"]}>
			<p className="daedric">you cannot travel here</p>
			<p style={{ textAlign: "center" }}>
				This page does not exist. Perhaps it was lost in the Red Mountain ash storms.
			</p>
			<p style={{ textAlign: "center" }}>
				<Button href="/">Return to Seyda Neen</Button>
			</p>
		</Panel>
	);
}
