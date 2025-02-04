import { useRef, useState } from "react";

export default function WeirdDataInputter({onData}: {onData: Function}) {
	const [data, setData] = useState("");

	return (
		<div className="h-10 mt-7">
			<input className="text-2xl p-2" type="text" placeholder={"Enter JSON"} value={data} onChange={(e) => {
				switch ((e.nativeEvent as any).inputType) {
					case "deleteContentBackward":
						setData(data.slice(0, data.length - 1));
						break;
					case "insertText": {
						const eventData = (e.nativeEvent as any).data
						let newData = data + eventData;
						if (eventData == '}') {
							try {
								onData(newData);
							} catch (e) {
								console.error(e);
							}
							setData("");
						} else {
							setData(newData);
						}
						break;
					}
				}
			}}></input>
		</div>
	);
}
