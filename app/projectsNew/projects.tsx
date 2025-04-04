import HikeCrew from "./hikecrew/hikecrew";
import SundayRunday from "./sundayrunday/sundayrunday";
import Tminus from "./tminus/tminus";
import WTP from "./whatstheplay/whatstheplay";
import Text from "./text";

export default function ProjectsNew() {
    return(
        <main className="h-auto">
            <Text/>
            <SundayRunday/>
            <HikeCrew/>
            <Tminus/>
            <WTP/>
        </main>
    )
}