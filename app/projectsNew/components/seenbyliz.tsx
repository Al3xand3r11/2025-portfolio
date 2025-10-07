import Image from 'next/image';
import sblhero from '../../../public/images/sblhero.webp';
import Link from 'next/link';
import sblcontact from '../../../public/images/sblcontact.webp';
import sblworks from '../../../public/images/sblworks.webp';
import sblabout from '../../../public/images/sblabout.webp';

export default function SeenByLiz() {
    return (
        <div className="text-white h-auto mt-10" id="SeenByLiz">
            <div className="flex flex-col items-center justify-center mb-10">
            <h1 className="text-6xl font-bold">
                Seen By Liz
            </h1>
            </div>
            
            <div className="flex flex-col items-center justify-center">
                <div className="w-10/12 h-full rounded-lg overflow-hidden">
                <Image src={sblhero} alt="Seen By Liz" />
                </div>
                <div className="w-10/12 flex flex-col md:flex-row mt-10">
                    <div className="md:w-1/2">
                        <div className="flex flex-col">
                        <h1 className="text-2xl font-bold">
                            Instagram:
                        </h1>
                        <Link href="https://www.instagram.com/seenbyliz_/" target="_blank" className="text-blue-500 text-2xl">
                            @seenbyliz_
                        </Link>
                        <h1 className="text-2xl font-bold">
                            Website:
                        </h1>
                        <Link href="https://seenbyliz.com" target="_blank" className="text-xl underline">
                            https://seenbyliz.com
                        </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <p className="text-xl">
                            Seen By Liz is a portfolio website for a Los Angeles based photographer, exhibiting her stunning images. The website is built in typescript and keeps a minimal design to focus on the quality of the images captured. This is a central hub for the client to show their work and connect with potential new clients as they have a dashboard that shows who has reached out recently.
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
                                    <Image src={sblworks} alt="Seen By Liz Works" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4 shadow-lg" style={{
                                backgroundColor: '#1a1a1a',
                                boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                            }}>
                                <div className="rounded-lg overflow-hidden">
                                    <Image src={sblabout} alt="Seen By Liz About" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 shadow-lg" style={{
                            backgroundColor: '#1a1a1a',
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.05)'
                        }}>
                            <div className="rounded-lg overflow-hidden">
                                <Image src={sblcontact} alt="Seen By Liz Contact" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    )
}