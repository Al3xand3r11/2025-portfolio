'use client'

import Experience from "./experience/experience";
import Header from "./header/header";
import Landing from "./landing/landing";
import { useEffect, useState } from "react";
import Lenis from "lenis";
import ProjectsNew from "./projectsNew/projects";
import Footer from "./footer";
import Preloader from "./preloader/preloader";
import { AnimatePresence } from "framer-motion";
import Engineer from "./engineer/engineer";
import Community from "./community/community";

export default function Home(){

  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const lenis = new Lenis()
   
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function raf(time: any) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
},[])

useEffect( () => {
  (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const locomotiveScroll = new LocomotiveScroll();

          setTimeout( () => {

            setIsLoading(false);

            document.body.style.cursor = 'default'

            window.scrollTo(0,0);

          }, 2000)
      }
  )()
}, [])

  return (
    <main>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing/>
      <Experience/>
      <ProjectsNew/>
      <Community/>
      <div className="h-[50vh]"></div>
      <Header/>
      <Engineer/>
      <div className="h-[20vh]"></div>
      <Footer/>
      
      
    </main>
  )
}