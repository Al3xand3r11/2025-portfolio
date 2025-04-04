'use client'

import { useEffect } from "react"
import Intro from "./components/intro/intro"
import ExpDescription from "./components/description/description"
import Employers from "./components/employers/projects"

export default function Experience() {
    

    return (
        <main>
            <Intro/>
            <ExpDescription/>
            <Employers/>
        </main>
    )
}