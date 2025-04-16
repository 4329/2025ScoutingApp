import Link from "next/link";
import NavPanel from "./ui/NavPanel";
import Image from "next/image"
import { getTeams } from "./lib/actions";
import { checkTables } from "./lib/seed";

export default async function Home() {
	checkTables();
	return (
		<>
			<header>

				<NavPanel />
			</header>
			<nav className="selection-panel">
				<ul>
					<li><Link href="/#about">About</Link></li>
					<li><Link href="/#projects">Projects</Link></li>
					<li><Link href="/#contact">Contact</Link></li>
				</ul>
			</nav>

			<section id="about" className="container">
				<h2>About Us</h2>
				<p>Welcome to the Lutheran Roboteers! We are a community-driven organization dedicated to advancing robotics and technology while fostering teamwork and innovation. Our members come from diverse backgrounds, united by a passion for building and learning about robots.</p>
				</section>

			<section id="projects" className="container">
				<h2>Our Projects</h2>
				<p>Explore the exciting projects we are working on. From building autonomous robots to participating in local and international competitions, our projects showcase the creativity and technical skills of our members.</p>
			</section>

			<section id="contact" className="container">
				<h2>Contact Us</h2>
				<p>Have questions or want to get involved? Reach out to us through the following channels:</p>
				<ul>
					<li>Email: <a href="mailto:info@lutheranroboteers.org">info@lutheranroboteers.org</a></li>
					<li>Phone: +1 (123) 456-7890</li>
					<li>Address: 123 Robot Lane, Tech City, TX 75001</li>
				</ul>
			</section>

			<footer>
				<div className="container">
				<p>&copy; 2024 Lutheran Roboteers. All rights reserved.</p>
				</div>
			</footer>
		</>
	);
}
