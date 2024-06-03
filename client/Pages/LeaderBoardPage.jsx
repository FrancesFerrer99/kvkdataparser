/**
 * leaderboard should display the same table that's in index
 * but sorted by the column 'SEV WOUNDS GOAL'
 */

import { useEffect, useState } from "react"
import axios from "axios"
import XLSX from "xlsx"

export default function LeaderboardPage({ filePath = 'uploads/2743FinalStats.xls' }) {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`${filePath}`, {
            responseType: 'arraybuffer',
            withCredentials: true
        })
            .then(response => {
                const data = new Uint8Array(response.data);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[workbook.SheetNames[3]];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
                setData(jsonData);
            })
            .catch(error => console.error('Error reading file:', error));
    }, [])

    console.log(data)

    return (
        <>
            Leaderboard
        </>
    )
}