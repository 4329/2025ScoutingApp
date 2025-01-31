"use client"
import { useEffect, useState } from "react";
import Image from "next/image"

export default function ImageCrementor({className, src, alt, scale, title, initial}: {className: string, src: string, alt?: string, scale: number, title: string, initial: number | undefined}) {
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
        <div className={`${className} ` + "flex"}>
            <div className="flex-shrink">
                <div className="title">{title}</div>
                <input id="hidden" className="text-white text-6xl !w-[400px] pointer-events-none px-2" value={count} readOnly tabIndex={-1}></input>
				<input type="hidden" value={count * scale} />
            </div>
            <button type="button" id="inc-btn1" className="flex-none w-32">
                <Image src={src} alt={alt ?? ""} width={500} height={500} onClick={() => change(1)} className="button-image" />
            </button>
            <button type="button" id="dec-btn1" onClick={() => change(-1)} className="button-text h-14 relative top-[1.75rem]">-1</button>
        </div>
    );
}
