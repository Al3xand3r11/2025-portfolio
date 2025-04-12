'use client'
import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import Background from '../../../public/images/sdrd.png'

export default function SundayRunday() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
        ref={container} 
        className='relative flex items-center justify-center h-screen overflow-hidden'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
        <div className='relative z-10 p-20 mix-blend-difference text-white w-full h-full flex flex-col justify-between'>
            <p className='w-[50vw] text-[2vw] self-end uppercase mix-blend-difference'>One of the biggest LA-based running clubs. Cultivating community and promoting fitness within the Downtown Los Angeles Area.</p>
            <a href='https://www.sundayrundayla.com/' target='_blank' className='text-[5vw] uppercase mix-blend-difference'>Sunday Runday LA</a>
        </div>
        <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
            <motion.div style={{y}} className='relative w-full h-full'>
            <Image src={Background} fill alt="image" style={{objectFit: "cover"}}/>
            </motion.div>
        </div>
        </div>
    )
}