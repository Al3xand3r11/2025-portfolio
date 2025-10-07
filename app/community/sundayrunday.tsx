import Image from "next/image";
import sdrdvegas3 from "../../public/images/sdrdvegas3.webp"
import sdrd1 from "../../public/images/sdrd1.webp"
import sdrdvegas2 from "../../public/images/sdrdvegas2.webp"
import sdrdvegasgroup from "../../public/images/sdrdvegasgroup.webp"
import victoryrelay1 from "../../public/images/victoryrelay1.webp"
import victoryrelay2 from "../../public/images/victoryrelay2.webp"
import sdrdhero from "../../public/images/sdrdhero.webp"
import sdrdhero1 from "../../public/images/sdrdhero1.webp"

export default function SundayRunday() {
    return (
        <div className="text-white h-auto" id="SundayRunday">
            <div className="flex flex-col items-center justify-center mb-10">
                <h1 className="text-6xl font-bold w-10/12 text-left text-white hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] transition-all duration-300 cursor-pointer">
                    Sunday Runday
                </h1>
                <div className="w-10/12 h-full">
                    <p className="text-3xl w-10/12 text-left leading-tight lg:pr-48 font-bold text-gray-600">
                        As an active captain for Sunday Runday, I have had over the course of 2 and a half years many life changing experiences with this running community nestled in Donwtown Los Angeles. Some of those experiences, as shown below, include witnessing the growth of the club on it&apos;s 2 year annivery, running to Vegas with a team of SDRD runners, and participating in countless races together.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-36">
                <div className="w-10/12 h-full">
                    <p className="text-4xl font-bold text-gray-600"> April 2023 - Present</p>
                    <hr className="border-gray-600 mb-10" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
            <div className="w-10/12 h-full overflow-hidden mt-10">
            <div className="flex flex-row justify-between">
                    <p className="text-3xl font-bold text-gray-600"> 2 Year Anniversary</p>
                    <p className="text-3xl font-bold text-gray-600"> Janaury 2025</p>
                </div>
                <div className="mb-10">
                    <p className="text-2xl font-medium text-gray-600">The two year anniversy of Sunday Runday highlighted the work and dedication of the club <br /> and it&apos;s members in bringing a greater sense of community to the downtoewn Los Angeles area.</p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-lg overflow-hidden">
                        <Image src={sdrdhero} alt="Sunday Runday" />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <Image src={sdrdhero1} alt="Sunday Runday" />
                    </div>
                </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
            <div className="w-10/12 h-full overflow-hidden mt-10">
            <div className="flex flex-row justify-between">
                    <p className="text-3xl font-bold text-gray-600"> The Speed Project</p>
                    <p className="text-3xl font-bold text-gray-600"> March 2025</p>
                </div>
                <div className="mb-10">
                    <p className="text-2xl font-medium text-gray-600">The Speed Project is an annual unsanctioned race starting at the Santa Monica Pier and finishing at the Las Vegas sign. <br /> This race is a unique opportunity to run a marathon in a single day, and is a great way to test your limits and push yourself to your breaking point.
                        Spanning over 340 miles in total with a team of 7 other runners, we spend over 40 hours running together, navigating the elements and battling through every mile as a team.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-lg overflow-hidden">
                        <Image src={sdrd1} alt="Sunday Runday" />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <Image src={sdrdvegas3} alt="Sunday Runday" />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <Image src={sdrdvegas2} alt="Sunday Runday" />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <Image src={sdrdvegasgroup} alt="Sunday Runday" />
                    </div>
                </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
            <div className="w-10/12 h-full overflow-hidden mt-10">
                <div className="flex flex-row justify-between">
                    <p className="text-3xl font-bold text-gray-600"> Victory Relay</p>
                    <p className="text-3xl font-bold text-gray-600"> August 2025</p>
                </div>
                <div className="mb-10">
                    <p className="text-2xl font-medium text-gray-600">The Victory Relay is an 8 person relay race within and around the Los Angeles Memorial Collesium in honor of the first woman to win the Olympic Marathon, < br/>
                    Joan Benoit Samuelson. I was fortunate enough to be given the opportunity to coach the Sunday Runday men&apos;s team and celebrate the history of the achievement with Joan in attendance.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <div className="rounded-lg overflow-hidden">
                        <Image src={victoryrelay1} alt="Sunday Runday" />
                    </div>
                    <div className="rounded-lg overflow-hidden">
                        <Image src={victoryrelay2} alt="Sunday Runday" />
                    </div>
                </div>
                </div>
            </div>
            
        </div>
    )
}