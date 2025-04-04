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

export default function Home(){

  const [isLoading, setIsLoading] = useState(true);

  useEffect( () => {
    const lenis = new Lenis()
   
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
      <Header/>
      <ProjectsNew/>
      <div className="h-[50vh]"></div>
      <Experience/>
      <div className="h-20vh]"></div>
      <Footer/>
      
      
    </main>
  )
}