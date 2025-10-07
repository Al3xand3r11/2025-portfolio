import Image from "next/image";
import shcgroup from "../../public/images/shcgroup.webp"

export default function Hiking() {
    return (
        <div className="text-white h-auto mt-48" id="Hiking">
            <div className="flex flex-col items-center justify-center mb-10">
                <h1 className="text-6xl font-bold w-10/12 text-left text-[#614115] hover:drop-shadow-[0_0_20px_rgba(97,65,21,0.8)] transition-all duration-300 cursor-pointer">
                    Saturday Hike Crew
                </h1>
                <div className="w-10/12 h-full">
                    <p className="text-3xl w-10/12 text-left leading-tight lg:pr-48 font-bold text-gray-600">
                    The Saturday Hike Crew started as a group of friends in October of 2022 looking to explore the Los Angeles mountains. Quickly, it grew into a community of over 100 + hikers who have been in attendance for every hike since. < br/>
                    Becoming a part of the crew in the executive capacity has allowed me to share my love for the outdoors with others and to see the community grow and thrive. < br/>
                    Often leading stretches, giving preliminary safety messages and acting as the caboose for all hikes, I have been able to help people in so many ways find their love for the outdoors.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-36">
                <div className="w-10/12 h-full">
                    <p className="text-4xl font-bold text-gray-600"> October 2022 - Present</p>
                    <hr className="border-gray-600 mb-10" />
                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <div className="w-10/12 h-full rounded-lg overflow-hidden">
                    <Image src={shcgroup} alt="Saturday Hike Crew" />
                </div>
            </div>
        </div>
    )
}