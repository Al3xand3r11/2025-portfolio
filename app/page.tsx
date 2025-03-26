'use client'

import Experience from "./experience/experience";
import Header from "./header/header";
import Landing from "./landing";
import Projects from "./employers/projects";
import { useEffect } from "react";
import Lenis from "lenis";

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
      <Experience/>
    </main>
  )
}