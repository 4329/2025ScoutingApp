import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import Modal from "react-modal";

export default function QRModal({ isOpen, onScan, close }: { isOpen: boolean, onScan(x: IDetectedBarcode[]): any, close: any }) {
	const [size, setSize] = useState<number[]>([0, 0]);
	useEffect(() => {
		const margin = 0;
		const heightSub = 0;
		setSize([window.innerWidth - margin, window.innerHeight - margin - heightSub]);
		window.addEventListener("resize", () => {
			setSize([window.innerWidth - margin, window.innerHeight - margin - heightSub]);
		});
		return () => {
			window.removeEventListener("resize", () => {
				setSize([window.innerWidth - margin, window.innerHeight - margin - heightSub]);
			});
		}
	}, []);

    return (
		<Modal isOpen={isOpen}
			ariaHideApp={false}
			style={{
				content: {
					color: "white",
					backgroundColor: "#333",
				},
				overlay: {
					zIndex: 10,
				}
			}}>
			<div className="grid grid-cols-3 content-center">
				<div />
				<button className="button-text" onClick={close}>Close</button>
				<div />

				<div />
				<Scanner
					onScan={(detectedCodes) => {
						onScan(detectedCodes);
						close();
					}}
				/>
			</div>
		</Modal>
    );
}
