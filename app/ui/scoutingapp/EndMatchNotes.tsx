"use client"

import { useEffect, useState } from "react";

export default function EndMatchNotes({initial}: {initial: string}) {
    const [notes, setNotes] = useState("");
    
    useEffect(() => {
        setNotes(initial ?? "");
    }, [initial]);

    return (
        <div className="text-xl flex items-center">
            End Match Notes: <textarea className="m-4 p-1" id="end_match_notes" value={notes} onChange={x => setNotes(x.target.value)}/>
        </div>
    );
}
