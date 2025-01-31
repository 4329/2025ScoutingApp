import { init } from "next/dist/compiled/webpack/webpack";
import Image from "next/image";
import { Dispatch, useEffect, useState } from "react";

export default function Coralinator({title, type, initialStates}: {title: string, type: string, initialStates: number[]}) {
	const [l1, setL1] = useState(0);
	const [l2, setL2] = useState(0);
	const [l3, setL3] = useState(0);
	const [l4, setL4] = useState(0);

	useEffect(() => {
		setL1(initialStates[0] ?? 0);
		setL2(initialStates[1] ?? 0);
		setL3(initialStates[2] ?? 0);
		setL4(initialStates[3] ?? 0);
	}, [initialStates]);

	return (
		<div className="m-10">
			<div className="title">{title}</div>
			<div className="grid grid-cols-2 w-40 relative">
				<ButtonThing current={l1} type={type} set={setL1} name="L1" pos={[175, 290]} />
				<ButtonThing current={l2} type={type} set={setL2} name="L2" pos={[175, 210]} />
				<ButtonThing current={l3} type={type} set={setL3} name="L3" pos={[175, 124]} />
				<ButtonThing current={l4} type={type} set={setL4} name="L4" pos={[175, -10]} />
			</div>
			<div className="w-[300px] h-300px">
				<Image className="mb-5" src="/coral.png" width={300} height={300} alt="coral" priority={true} />
			</div>
		</div>
	)
}

function ButtonThing({current, type, set, name, pos}: {current: number, type: string, set: Dispatch<number>, name: string, pos: number[]}) {
	return (
		<div style={{
			position: "absolute",
			left: pos[0],
			top: pos[1],
		}}>
			<div className="flex  w-[300px]">
				<button className="button-text !mx-1" type="button" onClick={() => set(current + 1)}>{name}</button>
				<button className="button-text !mx-0" type="button" onClick={() => {
					if (current > 0) set(current - 1)
				}}>-1</button>
				<input id={`${type}_${name.toLowerCase()}`} className="text-6xl px-1 mx-3" type="text" value={current} readOnly />
			</div>
		</div>
	)
}

