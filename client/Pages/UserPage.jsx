import { useLocation } from "react-router-dom"
import PieChart from "../Components/PieChart";
import LineChart from "../Components/LineChart";

export default function UserPage() {
    const { state } = useLocation()
    const {
        "Governor Name": governorName,
        "Governor ID": governorId,
        "Starting power": prePower,
        "Power Pre KL": preKlPower,
        "Power post KL": endPower,
        "Starting kp": preKp,
        "Kp gain pre KL": preKlKp,
        "kp gain KL": endKp,
        "Starting deads": preDeads,
        "Deads gain pre KL": preKlDeads,
        "Deads gain KL": endDeads,
        "T4 kill gain": T4,
        "T5 kill gain": T5,
        "Kills (T4+)": killsT4Plus
    } = state;
    return (
        <div className="container">
            <h2>Name: {governorName}</h2>
            <h3 className="id">Id: {governorId}</h3>
            {/* KP GAIN BREAKDOWN */}
            <PieChart T4={T4} T5={T5} />
            <LineChart values={{ pre:prePower, preKl:preKlPower, end:endPower, label:"power", chartTitle:"Power change"}} />
            <LineChart values={{ pre:preKp, preKl:preKlKp+preKp, end:endKp+preKlKp+preKp, label:"Kill points", chartTitle:"Kill point change" }} />
            <LineChart values={{ pre:preDeads, preKl:preKlDeads+preDeads, end:endDeads+preKlDeads+preDeads, label:"Dead troops", chartTitle:"Dead troops change" }} />
        </div>
    )
}