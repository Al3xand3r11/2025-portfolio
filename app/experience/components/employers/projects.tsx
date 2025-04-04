import React, { useState, useLayoutEffect, useRef } from 'react'
import styles from './style.module.css';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
    {
        title: "Towson University",
        src: "towson.webp"
    },
    {
        title: "Apple",
        src: "apple.webp"
    },
    {
        title: "Paramount",
        src: "paramount.webp"
    },
    {
        title: "Nike",
        src: "IMG_0231.webp"
    },
]

export default function Employers() {

    const [selectedProject, setSelectedProject] = useState(0);
    const container = useRef(null);
    const imageContainer = useRef(null);

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
            trigger: imageContainer.current,
            pin: true,
            start: "top-=100px",
            end: document.body.offsetHeight - window.innerHeight - 50,
        })
    }, [])

    return (
        <div ref={container} className={styles.projects}>
            <div className={styles.projectDescription}>
                <div ref={imageContainer} className={styles.imageContainer}>
                    <Image 
                        src={`/images/${projects[selectedProject].src}`}
                        fill={true}
                        alt="project image"
                        priority={true}
                    />
                </div>
                <div className={styles.column}>
                    <p>When not behind a computer screen, I am a community ambassador for nike and have worked in customer service roles for Towson University and Apple helping me stay well rounded.</p>
                </div>
                <div className={styles.column}>
                    <p>My technical skills within software engineering have continuously progressed. From a degree in computer science to multiple personal projects and 3 years of experience with Paramount. My language of choice is typescript.</p>
                </div>
            </div>

            <div className={styles.projectList}>
                {
                    projects.map( (project, index) => {
                        return <div key={index} onMouseOver={() => {setSelectedProject(index)}} className={styles.projectEl}>
                            <h2>{project.title}</h2>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
