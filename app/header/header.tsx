'use client'
import styles from './page.module.scss'
import Description from '../description/description'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

export default function Header () {

    

    return (
        <main className={styles.main}>
            <Description/>
        </main>
    )   
}