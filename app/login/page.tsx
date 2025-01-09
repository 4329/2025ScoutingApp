"use client"

import { signIn } from "@/auth";
import NavPanel from "../ui/NavPanel";
import { authenticate } from "../lib/actions";
import { useActionState } from "react";

export default function Page() {
    const [actionState, formAction] = useActionState<boolean>(authenticate, false);
    return (
        <>
            <header>
                <h1>Login</h1>
                <NavPanel />
            </header>
            <form action={formAction}>
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 m-4 justify-center w-[800px]">
                        <LogInput type="email" />
                        <LogInput type="password" />
                        <button type="submit" className="button-text m-4">Login</button>
                        {actionState && <p className="text-left text-red-500 text-[12px]">&ensp;&nbsp;Your username or password was incorrect, please try again</p>}
                    </div>
                </div>
            </form>
        </>
    );

    function LogInput({type}: {type: string}) {
        return <input name={type} type={type} className="login-field" />;
    }
}
