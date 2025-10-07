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
            end: () => {
                const el = container.current as HTMLElement | null;
                if (el) {
                    return el.offsetTop + el.offsetHeight - window.innerHeight;
                }
                return 0;
            },
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
                    <p>In 2022, I graduated from Towson University with a degree in computer science and moved to Los Angeles the subsequent fall.</p>
                </div>
                <div className={styles.column}>
                    <p>In college, I was a Resident Assistant for Towson. Additionally, I worked at the Apple Store as an on point specialist. Today, I work on Paramount&apos;s live streaming technology, and work with Nike running clubs in LA focused on marathon training.</p>
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
