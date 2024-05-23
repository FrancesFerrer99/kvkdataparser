import { useLocation } from "react-router-dom"
import PieChart from "../Components/PieChart";

export default function UserPage() {
    const { state } = useLocation()
    const {
        "Governor Name": governorName,
        "Governor ID": governorId,
        Power,
        "Kill Points": killPoints,
        Deaths,
        "T4 kill gain": T4,
        "T5 kill gain": T5,
        "Kills (T4+)": killsT4Plus
    } = state;

    return (
        <>
            
            <h2>Name: {governorName}</h2>
            <h3 className="id">Id: {governorId}</h3>
            {/* KP GAIN BREAKDOWN */}
            <PieChart T4={T4} T5={T5} />
        </>
    )
}