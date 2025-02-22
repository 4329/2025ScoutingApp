import Link from "next/link";

export default function NavPanel() {
    return (
        <nav className="selection-panel">
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/scoutingapp">Scouting App</Link></li>
                <li><Link href="/admin-panel">Admin Panel</Link></li>
                <li><Link href="/qrcode">QR Code Scanner</Link></li>
            </ul>
        </nav>
    );
}
