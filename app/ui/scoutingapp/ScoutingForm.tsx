import { QueryResultRow } from "@vercel/postgres";
import { publish } from "@/app/lib/publisher";
import CoolSwitch from "./CoolSwitch";
import ImageCrementor from "./ImageCrementor";
import { useFormStatus } from "react-dom";
import { state } from "@/app/scoutingapp/page";
import Modal from "react-modal"
import { QRCodeSVG } from "qrcode.react";
import { useRef, useState } from "react";
import { ScoutingDataInputter } from "./ScoutingDataInputter";

export default function ScoutingForm({matchNum, teamNum, teamState, initialStates}: {matchNum: string, teamNum: string, teamState: QueryResultRow, initialStates: state}) {
	const [modalOpen, setModalOpen] = useState(false);
	const [data, setData] = useState({});
	const [notification, setNotification] = useState("");
	const [gif, setGif] = useState("");


	function runNotification(text: string, gif: string) {
		setNotification(text);
		setGif(gif);
		setTimeout(() => setNotification(""), 5000);
	}

	return (
		<form onSubmit={(e) => {
			e.preventDefault()
			const tmp: any = e.target;

			let out: string[] = [matchNum, teamNum, teamState.red_nums.includes(parseInt(teamNum)) ? "TRUE" : "FALSE"];

			//array.map doesn't appear to exist...
			for (let i = 0; i < tmp.length; i++) {
				switch (tmp[i].type) {
					case "checkbox":
						out.push(tmp[i].value == 1 ? "TRUE" : "FALSE");
					break;

					case "hidden":
					case "text":
						out.push(tmp[i].value);
					break;
				}
			}
			console.log(out);


			if (out.includes("")) {
				if (!out[0]) runNotification("Please enter a match number","/uncooldog.gif")
				else runNotification("Please enter a team number","/uncooldog.gif");

				setData({});
				return;
			}

			if ((e.nativeEvent as any).submitter.name == "submit") {
				runNotification("Successfully sent data","/cooldog.gif");
				publish(out);
			} else {
				setData(out);
			}
		}}>

			<main>
				<ScoutingDataInputter initialStates={initialStates} />
			</main>
			<PendedSubmit />
			<button className="button-text relative bottom-5" type="submit" onClick={() => {
				setModalOpen(true);
			}}>Generate QR Code</button>

			<Modal isOpen={modalOpen}
				style={{
					content: {
						color: "white",
						backgroundColor: "#333"
					}
				}}>
				<div className="grid grid-cols-3 place-items-center">
					<div />
					<button className="button-text" onClick={() => setModalOpen(false)}>Close</button>
					<div />

					<div />
					<div className="p-5">
						{
							JSON.stringify(data) == "{}" ?
								<>
									<p className="text-red-500 text-4xl text-center font-extrabold">Error creating QRCode</p> 
									<a href = "/crying-tears.gif"><img src = "/crying-tears.gif"></img></a>
								</> :
								<QRCodeSVG value={JSON.stringify(data)} bgColor="white" marginSize={1} size={300} />
						}
					</div>
				</div>
			</Modal>
			{
				notification ?
					<div className="notification fixed bottom-0 right-0 z-10 text-4xl">
						{notification}
						<a href = {gif}><img src = {gif}></img></a>
					</div> :
					""
			}
		</form>
   );
}

function PendedSubmit() {
    const { pending, data } = useFormStatus();
    return <button className="button-text relative bottom-5" type="submit" name="submit" disabled={pending}>Send to Server</button>
}

