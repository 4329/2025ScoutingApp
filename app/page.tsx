import Link from "next/link";
import NavPanel from "./ui/NavPanel";
import Image from "next/image"
import { checkTables } from "./lib/seed";

export default async function Home() {
	checkTables();
	return (
		<>
			<header>
				<NavPanel />
				<div className="ml-[60px] flex justify-center">
					<Image src="/4329.png" alt="4329" width="250" height="250" />
				</div>
			</header>
			<nav className="selection-panel">
				<ul>
					<li><Link href="/#about">About</Link></li>
					<li><Link href="/#projects">Projects</Link></li>
					<li><Link href="/#contact">Contact</Link></li>
				</ul>
			</nav>

			<section id="about" className="container">
								<div className="flex justify-center">
				<Image src="/teamphoto.jpg" alt="teamphoto" width="567" height="416"/>
				</div>
				<h2>About Us</h2>

				<p>The 4329 Lutheran Roboteers is one out of three FRC teams that include the word &apos;Lutheran&apos; in their name. We expect all students to follow our vision through &quot;The Roboteer Way&quot; and treat others with respect and kindness even in a competitive atmosphere.
					<br></br>
					<br></br>

					Through our program we hope to use robotics to pioneer a multilateral STEM education and to raise leaders and better the communities around us. The Lutheran Roboteers are organized into six different crews: Mechanical, Electrical, Software, Design, Strategy, and Marketing/Awards. This enables our students to focus on a certain element of stem that interests them while also broadening their opportunities. Our leadership program challenges students to step up and interview for positions allowing students to develop soft skills for their future. These students then guide their crew through the season and various student-led projects.
					<br></br>
					<br></br>


					We aim to enhance every student&apos;s STEM skills through a variety of methods. These methods bring the focus to the quality of education for each individual student. One such method was exemplified when the Lutheran Roboteers helped incorporate Project Lead the Way engineering classes through our school, Lutheran High School of St. Charles. The Roboteer students helped write the grant for these resources and we got to be directly involved in creating more opportunities for students to expand their engineering skills and knowledge base. These classes then inspired students to join our team, making up over 10% of our school&apos;s population.  </p>
			</section>

			<section id="projects" className="container">
				<h2>Our Projects</h2>
				<p>Students are actively working on several projects from off-season to competition season. In the past, students have led the team to convince our school and community to create and furnish a $24,000 STEM wing; organized the Help from Home initiative in 2020, receiving a $10,000 laser cutter to create over 7000 face shields; obtaining iPads to enhance scouting efficiency; and obtaining a $36,000 grant for our Mobile STEM camps. In this past year, students wrote and obtained a $25,000 grant to acquire a new pit and trailer for the upcoming 2025 season! Our current projects include the aforementioned pit and trailer as well as creating a new scouting app that would allow other teams to scout robots and be able to view data and statistics with ease.
					<br></br>
					<br></br>


					Early on in our program, we developed STEM2U Youth Programs which is a 501(c)3 nonprofit organization. STEM2U provides a safety net with a level of insurance and finances allowing us to support several  FIRST teams. Between 2013 and 2019, we grew STEM2U through our outreach efforts and building several FLL and FTC teams. One of our FTC teams, 10868 Roboteer Cadets, actively work through the Lutheran Roboteers. Many of our own students have taken the initiative to be a mentor for our FTC team. The other FTC team was moved to a new venue which allowed us to become an incubator for 21225 Shear Force, a previous 2023-2024 REV team. We also have supported the 4256 Cyborg Cats Summer Demo Team. Since the beginning, The Lutheran Roboteers have prioritized the work we do in the community. Annually, our team attends 30 to 40 community outreach events and hosts 3 to 5 FIRST events.
					<br></br>
					<br></br>


					In the past years, we have been striving to improve our impact in our school and associated schools. In June, we host a multi-level STEM Summer camp for grade school and middle school. This camp is led by our Roboteer students as they guide the younger students through Robotics. Through this event we are able to introduce several engineering skills so students can succeed in a challenge given by Roboteers.
					<br></br>
					<br></br>
					Last year, The Lutheran Roboteers partnered with the Lutheran High School Key Club to bring Operation Christmas Child to the school. This initiative allowed our team to receive over 200 items in donations. We were able to ship out over 50 boxes to countries like Malawi, Ghana, South Africa and many more. We hope to continue this partnership with Key Club to positively impact more lives.
					<br></br>
					<br></br>


					A core member of our team is our &quot;spirit bot,&quot; Lord Regendorf, otherwise known as Reggie! This robot was built in 2012 in an effort to create a robot that could interact with our audiences. Reggie accompanies us to almost every outreach event. He has been to over 100 outreach events throughout his lifetime. He can be seen in most of our school&apos;s football games, various organizations trunk-or-treats and fall fests we attend, airshows, state fairs, BMX events, golf tournaments, and when the Roboteers visit other schools!
					<br></br>
					<br></br>


					Each year our team hosts The Gateway Robotics Challenge (GRC) along with FRC teams 6424 Stealth Panthers, 4256 Cyborg Cats and 8719 Oakville Dynamics. This off-season event hosts 24-30 teams. At GRC, a number of Roboteers volunteer to ensure the event runs smoothly. In addition, a couple of the Event Coordinators for GRC are mentors of our team!
					<br></br>
					<br></br>


					For the past 3 years, FIRST in Missouri commissioned our team to create LED-lit acrylic awards for all the FLL Challenge qualifying events in Eastern Missouri! We have created over 220 awards in total that have reached events that host 450 FLLC teams. In addition in creating FLL awards, we host our own FLLC Qualifier Event. 24 FLLC teams compete, which allows us to host 550 guests in our facilities. This event requires around 50 volunteers to ensure this event can happen, half of the volunteers are our own Roboteer members. The Lutheran Roboteers coordinate, set-up, handle event queuing, concessions, announcing, and more with a support of experienced FIRST volunteers.
					<br></br>
					<br></br>


					Our team has a heart for serving in order to better our community around us. We reach around 10,000 people with our outreach initiatives and off-season events. We will continue to find ways to positively impact our communities while sharing the message of FIRST and strengthening our students&apos; skillsets. </p>
			</section>

			<section id="contact" className="container">
				<h2>Contact Us</h2>
				<p>Have questions or want to get involved? Reach out to us through the following channels:</p>
				<ul>
					<li>Email: <a href="mailto:info@stem2u.org">info@stem2u.org</a></li>
					<li>Address: 5100 Mexico Road, Saint Peters, MO, 63376</li>
				</ul>
			</section>

			<footer>
				<div className="container">
					<p>&copy; 2025 Lutheran Roboteers. All rights reserved.</p>
				</div>
			</footer>
		</>
	);
}
