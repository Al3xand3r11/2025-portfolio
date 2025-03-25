import Header from "./header/header";
import Landing from "./landing";
import Projects from "./projects/projects";

export default function Home(){
  return (
    <main>
      <Landing/>
      <Header/>
      <Projects/>
    </main>
  )
}