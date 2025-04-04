'use client'

import Experience from "./experience/experience";
import Header from "./header/header";
import Landing from "./landing/landing";
import { useEffect } from "react";
import Lenis from "lenis";
import ProjectsNew from "./projectsNew/projects";
import Footer from "./footer";

export default function Home(){

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
      }
  )()
}, [])

  return (
    <main>
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