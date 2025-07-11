"use client"
import { Dispatch, MouseEventHandler, MutableRefObject, ReactElement, SyntheticEvent, useEffect, useState } from "react";

export default function Dropdown({ className, name, children, setValue: setMatchNum, rerender, initial, oohh}: { className?: string, name: string, children?: Array<ReactElement<HTMLOptionElement>>, setValue?: Dispatch<any>, rerender?: MutableRefObject<boolean>, initial?: string, oohh?: string}) {
	const [dropped, setDropped]: [boolean, Dispatch<boolean>] = useState(false);
    let [disp, setDisp]: [string, Dispatch<string>] = useState(name);

	useEffect(() => {
		if (initial && children) {
			let child = children[children.findIndex(x => x.props.value == initial)]
			if (child) {
				setDisp(child.props.children as any as string);
				if (setMatchNum) setMatchNum(child.props.value);
			}
		}
	}, [initial]);

	if (rerender && rerender.current) {
		rerender.current = false
		setDisp(name);
	}

    function handleChange(event: SyntheticEvent) {
        const tmp: HTMLDivElement = event.target as HTMLDivElement;
		setDisp(tmp.textContent + "");
		if (setMatchNum != null) setMatchNum(tmp.id);
		
		setDropped(false);
    }

	function handleBlur() {
		// it doesn't trigger the onclick if I don't do this nonsense
		setTimeout(() => setDropped(false), 200);
	}

	return (
		<div onBlur={handleBlur} className={`my-8 relative -top-6 ${className}`}>
			<button type="button" onClick={() => {setDropped(!dropped);}} className={`select-button w-[300px] ${!dropped || children?.length == 0 ? "rounded-md" : "rounded-t-md"} border-gray-600 ${oohh ?? ""}`}>
				<div id="box" className="flex space-x-4 content-center justify-between">
					<p className="relative top-2">{disp}</p>
					<Icon isOpen={dropped} />
				</div>
			</button>
			<OptionsContainer options={children} handleChange={handleChange} dropped={dropped} />
		</div>
	);
}

function OptionsContainer({options, handleChange, dropped}: {options?: Array<ReactElement<HTMLOptionElement>>, handleChange: MouseEventHandler<HTMLDivElement>, dropped: boolean}) {
	return (
			<div id="options-container" className="absolute left-[10px] z-10 w-full">
			{
				dropped && options && options.length > 0 && (
					<>
						<div id="drop-shadows-are-stupid" className="real-drop-shadow h-2 relative -top-4"></div>
						<div id="options-window" className="overflow-auto h-[335px] w-full rounded-b-md relative -top-4">
							{options ? options.map((option: any) => (
									<div onClick={handleChange} id={option.props.value} key={option.props.value} className={`select-option`} >
										{option.props.children}
									</div>
							)) : null}
						</div>
					</>
				)
			}
			</div>
	);
}

function Icon({ isOpen }: { isOpen: boolean }) {
	return  (
		<div className="m-4">
			<svg viewBox="0 0 24 24" width="25" height="25" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" className={`${isOpen ? 'translate' : ''}`}>
				{isOpen ? 
					<polyline points="6 15 12 9 18 15"></polyline>
					: <polyline points="6 9 12 15 18 9"></polyline>}
			</svg>
		</div>
	);
};
