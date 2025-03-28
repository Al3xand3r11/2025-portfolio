'use client'

import Experience from "./experience/experience";
import Header from "./header/header";
import Landing from "./landing";
import { useEffect } from "react";
import Lenis from "lenis";
import Projects from "./projects/projects";

export default function Home(){

  useEffect( () => {
    const lenis = new Lenis()
   
    function raf(time: any) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
},[])

  return (
    <main>
      <Landing/>
      <Header/>
      <Projects/>
      <Experience/>
    </main>
  )
}