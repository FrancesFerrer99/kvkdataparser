import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { NumericFormat } from "react-number-format"
import axios from "axios"

export default function KDPage() {
    const { state } = useLocation()
    const { fileName, sheetName } = state
    const [data, setData] = useState([])
    const [totalKpGain, setTotalKpGain] = useState(0)

    useEffect(() => {
        axios.get(`/kp-stats?filePath=${encodeURIComponent(fileName)}&sheetName=${sheetName}`, { withCredentials: true })
            .then(res => setData(res.data))
    }, [])

    useEffect(() => {
        data.sort((a, b) => b.kp - a.kp)
        let kpGain = data.reduce((accumulator, currenValue) => accumulator+currenValue.kp, totalKpGain)
        setTotalKpGain(kpGain)
    }, [data])


    return (
        <>
            Kingdom total kp gain: <NumericFormat value={totalKpGain} displayType='text' thousandSeparator={true} />
        </>
    )
}