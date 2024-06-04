import { useEffect, useState } from "react"
import { useLocation, Navigate } from "react-router-dom"
import { NumericFormat } from "react-number-format"
import axios from "axios"
import BarChart from "../Components/BarChart"


export default function KDPage() {
    const { state } = useLocation()
    const { fileName, sheetName } = state
    const [rawChartData, setRawChartData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [totalKpGain, setTotalKpGain] = useState(0)
    const [topN, setTopN] = useState(100)
    const [chartType, setChartType] = useState('')
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        axios.get(`/kp-stats?filePath=${encodeURIComponent(fileName)}&sheetName=${sheetName}`, { withCredentials: true })
            .then(res => setRawChartData(res.data))
    }, [])

    useEffect(() => {
        let kpGain = rawChartData.reduce((accumulator, currentValue) => accumulator + currentValue.kp, totalKpGain)
        setTotalKpGain(kpGain)
    }, [rawChartData])

    useEffect(() => {
        setFilteredData(rawChartData.map(object => ({ name: object.name, type: object[chartType] })))
    }, [chartType])

    function handleRangeChange(e) {
        setTopN(Number(e.target.value))
    }

    function handleChartChange(e) {
        setChartType(e.target.value)
    }

    if (redirect) return <Navigate to='/' />

    return (
        <div className="leaderboard relative">
            Kingdom total kp gain: <NumericFormat value={totalKpGain} displayType='text' thousandSeparator={true} />
            <select id="topNSelect" onChange={e => handleRangeChange(e)} value={topN}>
                <option value={10}>Top 10</option>
                <option value={20}>Top 20</option>
                <option value={50}>Top 50</option>
                <option value={100}>Top 100</option>
            </select>
            <select id="chartSelect" onChange={e => handleChartChange(e)} value={chartType}>
                <option defaultChecked>------</option>
                <option value='kp' >KP leaderboard</option>
                <option value='deads'>Deads leaderboard</option>
            </select>
            {chartType && <BarChart values={filteredData} type={chartType} range={topN} />}
            <button className="go-back" onClick={() => setRedirect(true)}>
                Indietro
            </button>
        </div>
    )
}