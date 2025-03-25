'use client'
import { projects } from "./data"
import Card from "./components/card"

export default function Projects(){
    return (
        <main>
            {
                projects.map( (project, i) => {
                    return <Card key={`p_${i}`} {...project} i={i} />
                })
            }
        </main>
    )
}