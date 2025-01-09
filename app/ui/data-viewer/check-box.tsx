"use client"

export default function CheckBox({ name, onChange }: { name: string, onChange: any }) {

    return (
        <label key={name} className="text-lg m-[-2px] text-white">
            <input type="checkbox"
                name={name}
                onChange={(e) => {
                    onChange(e.target as HTMLInputElement);
                }} 
                defaultChecked/>
            &nbsp;{name}
        </label>
    );

}

