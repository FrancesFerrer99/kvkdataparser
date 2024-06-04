import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { NumericFormat } from "react-number-format"
import axios from "axios"
import BarChart from "../Components/BarChart"


export default function KDPage() {
    const { state } = useLocation()
    const { fileName, sheetName } = state
    const [chartData, setChartData] = useState([])
    const [totalKpGain, setTotalKpGain] = useState(0)
    const [labels, setLabels] = useState([])
    const [topN, setTopN] = useState(100)
    const [kpValues, setKpValues] = useState([])
    const [deadsValues, setDeadsValues] = useState([])

    useEffect(() => {
        axios.get(`/kp-stats?filePath=${encodeURIComponent(fileName)}&sheetName=${sheetName}`, { withCredentials: true })
            .then(res => setChartData(res.data))
    }, [])

    useEffect(() => {
        let kpGain = chartData.reduce((accumulator, currenValue) => accumulator + currenValue.kp, totalKpGain)
        setTotalKpGain(kpGain)
        setLabels(chartData.map(object => object.name))
        setKpValues(chartData.map(object => object.kp))
        setDeadsValues(chartData.map(object => object.deads))
    }, [chartData])

    function handleSelectChange(e) {
        setTopN(Number(e.target.value))
    }

    console.log(chartData)

    return (
        <div className="leaderboard">
            Kingdom total kp gain: <NumericFormat value={totalKpGain} displayType='text' thousandSeparator={true} />
            <select id="topNSelect" onChange={e => handleSelectChange(e)} value={topN}>
                <option value={10}>Top 10</option>
                <option value={20}>Top 20</option>
                <option value={50}>Top 50</option>
                <option value={100}>Top 100</option>
            </select>
           <BarChart values={kpValues.slice(0,topN)} labels={labels.slice(0,topN)} />
           <BarChart values={deadsValues.slice(0,topN)} labels={labels.slice(0,topN)} />
        </div>
    )
}