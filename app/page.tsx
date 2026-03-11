import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Additional from "./components/Additional";
import Community from "./components/Community";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Work />
      <Additional />
      <Community />
      <Contact />
    </main>
  );
}
