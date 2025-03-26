'use client'

import { useEffect } from "react"
import Intro from "./components/intro/intro"
import ExpDescription from "./components/description/description"
import Employers from "./components/employers/projects"

export default function Experience() {
    useEffect( () => {
        (
            async () => {
                const LocomotiveScroll = (await import('locomotive-scroll')).default
                const locomotiveScroll = new LocomotiveScroll();
            }
        )()
    }, [])

    return (
        <main>
            <Intro/>
            <ExpDescription/>
            <Employers/>
        </main>
    )
}