import Image from "next/image";
import tmthero from "../../../public/images/tmthero.webp";
import Link from "next/link";
import tmtservices from "../../../public/images/tmtservices.webp";
import tmtcontact from "../../../public/images/tmtcontact.webp";
import tmtquotes from "../../../public/images/tmtquotes.webp";

export default function TMinusTalent() {
    return (
            <div className="text-white h-auto mt-10" id="TMinusTalent">
                <div className="flex flex-col items-center justify-center mb-10">
                <h1 className="text-6xl font-bold">
                    TMinusTalent
                </h1>
                </div>
                
                <div className="flex flex-col items-center justify-center">
                    <div className="w-10/12 h-full rounded-lg overflow-hidden">
                    <Image src={tmthero} alt="TMinusTalent" />
                    </div>
                    <div className="w-10/12 flex flex-col md:flex-row mt-10">
                    <div className="md:w-1/2">
                        <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">
                            Website:
                        </h1>
                        <Link href="https://tminustalent.com" target="_blank" className="text-xl underline">
                            https://tminustalent.com
                        </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-xl">
                            T-Minus Talent is a platform created for a more personalized recruiting experience. Putting professionals in touch with a recruiter with over a decade of experience that can provide insight and assistance on finding their next role or helping a company find their next employee. T-Minus Talent was built in typescript, has a resume uploader and a dashboard for the founder so they can view submitted inquiries and resumes quickly and focus on catering to their clients needs.
                        </p>
                    </div>
                    </div>
                    <div className="w-10/12 h-full overflow-hidden mt-10">
                    <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-gray-800 rounded-lg p-4 shadow-lg" style={{
                                backgroundColor: '#1a1a1a',
                                boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                            }}>
                                <div className="rounded-lg overflow-hidden">
                                    <Image src={tmtservices} alt="Seen By Liz Works" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4 shadow-lg" style={{
                                backgroundColor: '#1a1a1a',
                                boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                            }}>
                                <div className="rounded-lg overflow-hidden">
                                    <Image src={tmtcontact} alt="Seen By Liz About" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg" style={{
                            backgroundColor: '#1a1a1a',
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                        }}>
                            <div className="rounded-lg overflow-hidden">
                                <Image src={tmtquotes} alt="Seen By Liz Contact" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>   
                </div>
            </div>
        )
}