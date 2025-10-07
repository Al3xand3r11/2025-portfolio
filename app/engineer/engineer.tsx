/* eslint-disable prefer-const */
'use client'

import styles from './page.module.css'

import { useRef, useEffect, JSX } from 'react';

import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';



const phrase = "While just beginning in my career, I have had so many life changing experiences and connections that have shaped the goals I have today. I want to take my technical expertise to continue to build community and help others achieve their goals in person.";



export default function Engineer() {



     
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let refs = useRef<any>([]);
    const body = useRef(null);
    const container = useRef(null);
  
  
  
    useEffect( () => {
  
      gsap.registerPlugin(ScrollTrigger);
  
      createAnimation();
  
    }, [])
  
  
  
    const createAnimation = () => {
  
        gsap.to(refs.current, {
  
          scrollTrigger: {
  
              trigger: container.current,
  
              scrub: true,
  
              start: `top`,
  
              end: `+=${window.innerHeight / 1.5}`,
  
          },
  
          opacity: 1,
  
          ease: "none",
  
          stagger: 0.1
  
      })
  
    }


  const splitWords = (phrase: string) => {

    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let body: any = [];

    phrase.split(" ").forEach( (word, i) => {

      const letters = splitLetters(word);

      body.push(<p key={word + "_" + i}>{letters}</p>)

    })

    return body;

  }



  const splitLetters = (word: string) => {

    const letters: JSX.Element[] = []

    word.split("").forEach( (letter, i) => {

      letters.push(<span key={letter + "_" + i} ref={(el) => {refs.current.push(el)}}>{letter}</span>)

    })

    return letters;

  }



  return (

    <main ref={container} className={styles.main}>

      <div ref={body} className={styles.body}>

        {

          splitWords(phrase)

        }

      </div>

    </main>

  )

}