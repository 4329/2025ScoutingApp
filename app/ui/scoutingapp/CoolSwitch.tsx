"use client"
import { Dispatch, useEffect, useState } from "react";

export default function CoolSwitch({ className, id, title, initial }: { className: string, id: string, title: string, initial: boolean | undefined}) {
	const [isChecked, setIsChecked] = useState(false);

	useEffect(() => {
		setIsChecked(initial ?? false);
	}, [initial])

    return (
        <div className={`${className} flex z-0`}>
            <div className="title-switch">{title}</div>
            <label className="switch">
				<input type="checkbox" id={id} value={isChecked ? 1 : 0} checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
                <span className="slider round"></span>
            </label>
            <div className="switch-label ml-2 relative top-1">
				{isChecked ? "Yes" : "No"}
            </div>
        </div>
    );
}

