import Image from "next/image";
import afterdark2 from "../../public/images/afterdark2.webp"
import afterdark3 from "../../public/images/afterdark3.webp"
import afterdark4 from "../../public/images/afterdark4.webp"
import afterdark1 from "../../public/images/afterdark1.webp"

export default function Nike() {
    return (
        <div className="text-white h-auto mt-48" id="Nike">
            <div className="flex flex-col items-center justify-center mb-10">
                <h1 className="text-6xl font-bold w-10/12 text-left text-red-600 hover:drop-shadow-[0_0_20px_rgba(239,68,68,0.8)] transition-all duration-300 cursor-pointer">
                    Nike After Dark: Los Angeles
                </h1>
                <div className="w-10/12 h-full">
                <p className="text-3xl w-10/12 text-left leading-tight lg:pr-48 font-bold text-gray-600">
                The Nike After Dark series was a collection of global runs celebrating women who run. The Los Angeles race culminated in June with a half marathon through the city of Inglewood with a performance from Doechii at the finish. <br/>
                Leading up to the race on a weekly basis as an ambassador, we held weekly track session in East LA and Inglewood, exposing many in the local community to track workouts, in which over 50% had never done before.
                Helping with these sessions through leading stretches, curating playlists and leading pace groups, I was able to see the weekly progression from so many individuals who just needed access to the right resources.
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center mt-36">
            <div className="w-10/12 h-full">
                <p className="text-2xl font-bold text-gray-600"> February 2025 - June 2025</p>
                <hr className="border-gray-600 mb-10" />
            </div>
            </div>
            <div className="flex flex-col items-center justify-center">
            <div className="w-10/12 h-full rounded-lg overflow-hidden">
                <Image src={afterdark2} alt="Nike" />
            </div>
            <div className="w-10/12 h-full overflow-hidden mt-10">
                <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="rounded-lg overflow-hidden">
                        <Image src={afterdark3} alt="Nike" />
                        </div>
                    
                        <div className="rounded-lg overflow-hidden">
                        <Image src={afterdark1} alt="Nike" />
                        </div>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                    <Image src={afterdark4} alt="Nike" />
                    </div>
                    
                </div>
            </div>
            </div>
        </div>
    )
}