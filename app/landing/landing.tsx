'use client'
import Image from "next/image";
import styles from "./page.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Landing() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;


  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation)

    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.10,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        onUpdate: e => direction = e.direction * -1
      },
      x: "-300px",
      
    })
  })

  const animation = () => {
    if (xPercent <= -100){
      xPercent =0;
    }
    if(xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    xPercent += 0.10 * direction;
    requestAnimationFrame(animation)
  }

  const scrollToExperience = () => {
    const experienceSection = document.getElementById('Experience');
    if (experienceSection) {
      const targetPosition = experienceSection.offsetTop;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 2000; // 2 seconds for slower scroll
      let start: number | null = null;

      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function for smoother animation
        const easeInOutCubic = percentage < 0.5 
          ? 4 * percentage * percentage * percentage 
          : (percentage - 1) * (2 * percentage - 2) * (2 * percentage - 2) + 1;
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic);
        
        if (progress < duration) {
          requestAnimationFrame(step);
        }
      };
      
      requestAnimationFrame(step);
    }
  }

  return (
    <main className={styles.main}>
      <Image
        fill={true}
        src="/images/Background.webp"
        alt="image"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        <h1 
          className="text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-wide text-center leading-none select-none cursor-pointer transition-all duration-500"
          style={{ 
            color: '#f6842f',
            textShadow: `
              0 0 10px rgba(246, 132, 47, 0.8),
              0 0 20px rgba(246, 132, 47, 0.6),
              0 0 40px rgba(246, 132, 47, 0.4),
              0 0 80px rgba(246, 132, 47, 0.2),
              0 0 120px rgba(246, 132, 47, 0.1)
            `,
            opacity: '0.95',
            filter: 'drop-shadow(0 0 30px rgba(246, 132, 47, 0.7))'
          }}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.textShadow = `
              0 0 15px rgba(246, 132, 47, 1),
              0 0 30px rgba(246, 132, 47, 0.8),
              0 0 60px rgba(246, 132, 47, 0.6),
              0 0 120px rgba(246, 132, 47, 0.4),
              0 0 180px rgba(246, 132, 47, 0.2)
            `;
            (e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 0 50px rgba(246, 132, 47, 1))';
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLElement;
            target.style.textShadow = `
              0 0 10px rgba(246, 132, 47, 0.8),
              0 0 20px rgba(246, 132, 47, 0.6),
              0 0 40px rgba(246, 132, 47, 0.4),
              0 0 80px rgba(246, 132, 47, 0.2),
              0 0 120px rgba(246, 132, 47, 0.1)
            `;
            (e.currentTarget as HTMLElement).style.filter = 'drop-shadow(0 0 30px rgba(246, 132, 47, 0.7))';
          }}
        >
          BRANDON NANCE
        </h1>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={scrollToExperience}
          className="flex flex-col items-center gap-2 cursor-pointer transition-all duration-500 group"
          style={{
            color: '#f6842f',
            filter: 'drop-shadow(0 0 20px rgba(246, 132, 47, 0.6))'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.filter = 'drop-shadow(0 0 40px rgba(246, 132, 47, 1))';
            e.currentTarget.style.transform = 'translateY(-5px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(246, 132, 47, 0.6))';
            e.currentTarget.style.transform = 'translateY(0px)';
          }}
        >
          <span className="text-xl font-bold tracking-wider uppercase">More</span>
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="animate-bounce"
            style={{ filter: 'drop-shadow(0 0 10px rgba(246, 132, 47, 0.8))' }}
          >
            <path 
              d="M12 16L6 10H18L12 16Z" 
              fill="#f6842f"
              stroke="#f6842f"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}
