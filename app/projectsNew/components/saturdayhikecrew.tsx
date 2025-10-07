import Image from "next/image";
import sh1 from "../../../public/images/shc1.webp";
import sh2 from "../../../public/images/shc2.webp";
import sh3 from "../../../public/images/shc3.webp";
import sh4 from "../../../public/images/shc4.webp";
import sh5 from "../../../public/images/shc5.webp";
import Link from "next/link";

export default function SaturdayHikeCrew() {
    return (
        <div className="text-white h-auto" id="SaturdayHikeCrew">
            <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="text-6xl font-bold text-center">
                The Saturday Hike Crew
            </h1>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <div className="w-10/12 h-full rounded-lg overflow-hidden">
                <Image src={sh4} alt="Saturday Hike Crew" />
                </div>
                <div className="w-10/12 flex flex-col md:flex-row mt-10">
                    <div className="md:w-1/2">
                        <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">
                            Instagram:
                        </h1>
                        <Link href="https://www.instagram.com/thesaturdayhikecrew/?hl=en" target="_blank" className="text-blue-500 text-2xl">
                            @thesaturdayhikecrew
                        </Link>
                        <h1 className="text-2xl font-bold">
                            Website:
                        </h1>
                        <Link href="https://thesaturdayhikecrew.com" target="_blank" className="text-xl underline">
                            https://thesaturdayhikecrew.com
                        </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-xl">
                              The Saturday Hike Crew website is built with Next.js, Tailwind CSS, and TypeScript. It has streamlined the process and removed the middle man of organizing, recaping and communicating hikes that the SHC host. With up to date recaps of hikes, the ability to register for new hikes, and a newsletter, the SHC is able to focus on what they do best, host hikes. The founder has access to a dashboard to track attendance, create new hikes and see newsletter subscribers.
                        </p>
                    </div>
                </div>
                <div className="w-10/12 h-full overflow-hidden mt-10">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg" style={{
                            backgroundColor: '#1a1a1a',
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                        }}>
                            <div className="rounded-lg overflow-hidden">
                                <Image src={sh1} alt="Saturday Hike Crew" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg" style={{
                            backgroundColor: '#1a1a1a',
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                        }}>
                            <div className="rounded-lg overflow-hidden">
                                <Image src={sh2} alt="Saturday Hike Crew" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg" style={{
                            backgroundColor: '#1a1a1a',
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                        }}>
                            <div className="rounded-lg overflow-hidden">
                                <Image src={sh3} alt="Saturday Hike Crew" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg" style={{
                            backgroundColor: '#1a1a1a',
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                        }}>
                            <div className="rounded-lg overflow-hidden">
                                <Image src={sh5} alt="Saturday Hike Crew" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}