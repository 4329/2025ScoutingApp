"use client"
import { useEffect, useState } from "react";
import Image from "next/image"

export default function ImageCrementor({className, src, alt, id, title, initial}: {className: string, src: string, alt?: string, id: string, title: string, initial: number | undefined}) {
    const [count, setCount] = useState<number>(0);

	useEffect(() => {
		setCount(initial ?? 0)
	}, [initial])

    //every time I use currying I feel so smart it's amazing
    const change = (sign: number) => {
        setCount(prevCount => {
            const newCount = prevCount + sign;
            return sign < 0 ? Math.max(newCount, 0) : newCount;
        });
    };

    return (
		<>
			<div className="title">{title}</div>
			<div className={`${className} ` + "flex items-center"}>
				<input id={id} className="text-white text-6xl !w-[400px] pointer-events-none px-2" value={count} readOnly tabIndex={-1}></input>
				<button type="button" id="inc-btn1" className="flex-none w-32 ml-10">
					<Image src={src} alt={alt ?? ""} width={500} height={500} onClick={() => change(1)} className="button-image" />
				</button>
				<button type="button" id="dec-btn1" onClick={() => change(-1)} className="button-text">-1</button>
			</div>
		</>
    );
}
