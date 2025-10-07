
import Text from "./text"; 
import SaturdayHikeCrew from "./components/saturdayhikecrew";
import SeenByLiz from "./components/seenbyliz";
import TMinusTalent from "./components/tminustalent";
export default function ProjectsNew() {
    return(
        <main className="h-auto" id="Projects">
            <Text/>
            <SaturdayHikeCrew/>
            <SeenByLiz/>
            <TMinusTalent/>
        </main>
    )
}