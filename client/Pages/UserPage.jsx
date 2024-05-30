import { useLocation, Navigate } from "react-router-dom"
import PieChart from "../Components/PieChart";
import LineChart from "../Components/LineChart";
import GaugeChart from "../Components/GaugeChart";
import { useEffect, useState } from "react";

export default function UserPage() {
    const [redirect, setRedirect] = useState(false)
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
        "TOTAL DEATHS": totalDeads,
        "TOTAL KP": totalKp,
        "Expected sev wounds": goalWounds,
        "Expected deads": goalDeads
    } = state;

    if (redirect) return <Navigate to='/' />

    return (
        <div className="user-page-layout relative">
            <div className="header">
                <h2>Name: {governorName}</h2>
                <h3 className="id">Id: {governorId}</h3>
            </div>
            <div className="line-charts">
                {/* CORRECT HOW VALUES ARE PASSED: THEY'RE STRINGS AND NOT NUMBERS */}
                <LineChart values={{ pre: prePower, preKl: preKlPower, end: endPower, label: "power", chartTitle: "Power change" }} className="line-chart" />
                <LineChart values={{ pre: preKp, preKl: preKlKp, end: endKp, label: "Kill points", chartTitle: "Kill point change" }} className="line-chart" />
                <LineChart values={{ pre: preDeads, preKl: preKlDeads, end: endDeads, label: "Dead troops", chartTitle: "Dead troops change" }} className="line-chart" />
            </div>
            <div className="performance">
                {/* CORRECT HOW VALUES ARE PASSED: THEY'RE STRINGS AND NOT NUMBERS */}
                <PieChart T4={T4} T5={T5} totalKp={totalKp} className="pie-chart" />
                <GaugeChart values={{ achieved: [T4, T5], goal: goalWounds, labels: ["% achieved", "% not achieved"], title: "Sev wounds goal" }} className="goals-chart" />
                <GaugeChart values={{ goal: goalDeads, achieved: totalDeads, labels: ["% achieved", "% not achieved"], title: "deads goal" }} className="goals-chart" />
            </div>
            <button className="go-back" onClick={() => setRedirect(true)}>
                Indietro
            </button>
        </div>
    )
}