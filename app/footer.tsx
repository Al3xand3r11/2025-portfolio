'use client'

import { useRef, useState } from "react"
import emailjs from '@emailjs/browser'
import Image from "next/image"
import image_247 from "../public/images/IMG_0247.webp"

export default function Footer () {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const form = useRef<HTMLFormElement>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendEmail = (e: any) => {
        e.preventDefault();

        const serviceID = 'service_pma3dql'
        const templateID = 'template_08llu1i'
        const publicKey = '7rv-9u7Zg-84Mkoh-'

        const templateParams = {
            from_name: name,
            email: email,
            to_name: 'Brandon',
            message: message,
        }

        emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response: unknown) => {
            console.log('Email sent successfully', response)
            setName('');
            setEmail('');
            setMessage('');
        }).catch((error: Error) => {
            console.error('Error sending email', error);
        });
    }

    return (
        <main id="Contact" className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image_247}
                    alt="Contact background"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Dark overlay for better text readability */}
                <div className="absolute inset-0 bg-black/60"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        
                        {/* Left Side - Get In Touch */}
                        <div className="text-white space-y-8">
                            <div>
                                <h2 className="text-6xl lg:text-7xl font-black mb-6" style={{
                                    textShadow: '0 0 20px rgba(246, 132, 47, 0.5)'
                                }}>
                                    GET IN
                                </h2>
                                <h2 className="text-6xl lg:text-7xl font-black" style={{
                                    color: '#f6842f',
                                    textShadow: '0 0 30px rgba(246, 132, 47, 0.8)'
                                }}>
                                    TOUCH
                                </h2>
                            </div>
                            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-lg">
                                Let&apos;s build community.
                            </p>
                        </div>

                        {/* Right Side - Contact Form */}
                        <div className="w-full max-w-lg mx-auto lg:mx-0">
                            <div className="backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 p-8 shadow-2xl">
                                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                                    <div className="space-y-2">
                                        <label htmlFor="fname" className="block text-sm font-semibold text-white/90">
                                            Name
                                        </label>
                                        <input 
                                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                                            type="text" 
                                            name="user_name"
                                            id="fname" 
                                            placeholder="Your full name" 
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="block text-sm font-semibold text-white/90">
                                            Email
                                        </label>
                                        <input 
                                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 hover:bg-white/15"
                                            type="email" 
                                            name="user_email" 
                                            id="email"  
                                            placeholder="your.email@example.com" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="block text-sm font-semibold text-white/90">
                                            Message
                                        </label>
                                        <textarea 
                                            className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-300 hover:bg-white/15 resize-none h-32"
                                            id="message" 
                                            name="message"  
                                            placeholder="Tell me about your project or just say hello..."
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        />
                                    </div>
                                    
                                    <button 
                                        type="submit" 
                                        className="w-full py-4 px-6 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent"
                                        style={{
                                            boxShadow: '0 0 20px rgba(246, 132, 47, 0.3)'
                                        }}
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}