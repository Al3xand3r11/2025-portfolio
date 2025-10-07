import Hiking from "./hiking";
import Nike from "./nike";
import SundayRunday from "./sundayrunday";
import Text from "./text";

export default function Community() {
    return (
        <div className="text-white h-auto" id="Community">
            <Text/>
            <SundayRunday/>
            <Nike/>
            <Hiking/>
        </div>
    )
}