'use client'

import { useRef, useState } from "react"
import emailjs from '@emailjs/browser'

export default function Footer () {


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [isError, setIsError] = useState(false)

    const form = useRef<HTMLFormElement>(null);

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
        .then((response: any) => {
            console.log('Email sent successfully', response)
            setName('');
            setEmail('');
            setMessage('');
            setIsError(false)
        }).catch((error: Error) => {
            console.error('Error sending email', error);
            setIsError(true)
        });
    }

    return (
        <main>
            <div className="h-auto">
                <div className="text-white text-center">
                    <p>Get In Touch</p>
                </div>
                <div className="flex flex-row justify-around text-white pb-12">
                    <div className="flex flex-col">
                        <p>LinkedIn</p>
                        <p>Github</p>
                        <p>Medium</p>
                        <p>Resume</p>
                    </div>
                    <div className="flex flex-col">
                        <form ref={form} onSubmit={sendEmail} className="space-y-8">
                    <div>
                        <label htmlFor="fname" className="block mb-2 text-sm font-medium text-white">Name</label>
                        <input className="shadow-sm bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                            type="text" 
                            name="user_name"
                            id="fname" 
                            placeholder="John Smith" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required/>
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                        <input className="shadow-sm bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 "
                            type="email" 
                            name="user_email" 
                            id="email"  
                            placeholder="name@brandon.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required/>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">Your message</label>
                        <textarea className="block p-2.5 w-full text-sm text-white bg-transparent rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 "
                            id="message" 
                            name="message"  
                            placeholder="Leave a comment..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)} 
                            > 
                            </textarea>
                    </div>
                    <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg border-black border">Send message</button>
                </form>
                    </div>

                </div>
            </div>
        </main>
    )
}