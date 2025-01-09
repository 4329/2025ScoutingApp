import Image from "next/image";
import { Dispatch, useState } from "react";

export default function Coralinator({title, scores}: {title: string, scores: number[]}) {
	const [l1, setL1] = useState(0);
	const [l2, setL2] = useState(0);
	const [l3, setL3] = useState(0);
	const [l4, setL4] = useState(0);

	return (
		<div className="m-10">
			<div className="title">{title}</div>
			<div className="grid grid-cols-2 w-40 relative">
				<ButtonThing current={l1} set={setL1} name="L1" pos={[175, 290]} />
				<ButtonThing current={l2} set={setL2} name="L2" pos={[175, 210]} />
				<ButtonThing current={l3} set={setL3} name="L3" pos={[175, 124]} />
				<ButtonThing current={l4} set={setL4} name="L4" pos={[175, -10]} />
			</div>
			<div className="w-[300px] h-300px">
				<Image className="mb-5" src="/coral.png" width={300} height={300} alt="coral" priority={true} />
			</div>
			<input id="counter1" className="text-white text-6xl !w-[400px] pointer-events-none" value={l1 * scores[0] + l2 * scores[1] + l3 * scores[2] + l4 * scores[3]} type="hidden" readOnly tabIndex={-1}></input>
		</div>
	)
}

function ButtonThing({current, set, name, pos}: {current: number, set: Dispatch<number>, name: string, pos: number[]}) {
	return (
		<div style={{
			position: "absolute",
			left: pos[0],
			top: pos[1],
		}}>
			<div className="grid grid-cols-3 w-[300px]">
				<button className="button-text" type="button" onClick={() => set(current + 1)}>{name}</button>
				<button className="button-text" type="button" onClick={() => {
					if (current > 0) set(current - 1)
				}}>-{1}</button>
				<input className="text-4xl" type="text" value={current} readOnly />
			</div>
		</div>
	)
}

