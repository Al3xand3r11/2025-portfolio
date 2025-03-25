'use client'
import styles from './page.module.scss'
import Description from '../description/description'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

export default function Header () {

    useEffect( () => {
        const lenis = new Lenis()
       
        function raf(time: any) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
    },[])

    return (
        <main className={styles.main}>
            <Description/>
        </main>
    )   
}