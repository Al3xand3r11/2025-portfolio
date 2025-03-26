'use client'

import React, {useLayoutEffect, useRef} from "react"
import styles from './style.module.css'
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function Intro(){

    const background = useRef(null)
    const introImage = useRef(null)
    const homeHeader = useRef(null)

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger);

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: document.documentElement,
                scrub: true,
                start: "top",
                end: "+=500px"
            },
        })

        timeline
            .from(background.current, {clipPath: `inset(15%)`})
            .to(introImage.current, {height: "200px"}, 0)
    }, [])

    return (
        <div ref={homeHeader} className={styles.homeHeader}>
            <div className={styles.backgroundImage} ref={background}>
                <Image
                    src={'/images/IMG_0228.webp'}
                    fill={true}
                    alt="background"
                    priority
                />
            </div>
            <div className={styles.intro}>
                <div ref={introImage} data-scroll data-scroll-speed="0.3" className={styles.introImage}>
                    <Image
                        src={'/images/experience.webp'}
                        alt='intro'
                        fill
                        priority
                    />
                </div>
                <h1 data-scroll data-scroll-speed="0.7">EXPERIENCE</h1>
            </div>
        </div>
    )
}