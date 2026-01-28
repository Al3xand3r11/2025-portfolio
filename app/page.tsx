import Hero from "./components/Hero";
import Work from "./components/Work";
import StatsBar from "./components/StatsBar";
import Community from "./components/Community";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <Work />
      <Community />
      <Contact />
    </main>
  );
}
