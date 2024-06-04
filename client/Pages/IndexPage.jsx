import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';

export default function IndexPage() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [files, setFiles] = useState([]);
    const [sheetNames, setSheetNames] = useState([]);
    const [currentFile, setCurrentFile] = useState('');
    const [currentSheet, setCurrentSheet] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        axios.get('/files', { withCredentials: true })
            .then(response => setFiles(response.data))
            .catch(error => console.error('Error fetching files:', error));

        const savedFile = localStorage.getItem('currentFile');
        const savedSheet = localStorage.getItem('currentSheet');
        if (savedFile && savedSheet) {
            setCurrentFile(savedFile);
            setCurrentSheet(savedSheet);
        }
    }, []);

    useEffect(() => {
        if (currentFile && currentSheet) {
            fetchSheetNames(currentFile)
            handleSheetClick(currentFile, currentSheet)
        }
    }, [currentFile, currentSheet])

    const fetchSheetNames = (filePath) => {
        axios.get(`/sheets?filePath=${encodeURIComponent(filePath)}`, { withCredentials: true })
            .then(response => {
                const { sheetNames } = response.data;
                setSheetNames(sheetNames);
                if (currentSheet) {
                    handleSheetClick(filePath, currentSheet);
                } else if (sheetNames.length > 0) {
                    handleSheetClick(filePath, sheetNames[0]);
                }
                setSearchTerm('')
            })
            .catch(error => console.error('Error fetching sheet names:', error));
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        axios.post('/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true
        })
            .then(response => {
                const { filePath, sheetNames } = response.data;
                setFiles([...files, filePath]);
                setSheetNames(sheetNames);
                setCurrentFile(filePath);
                setCurrentSheet(sheetNames[0]);
                handleSheetClick(filePath, sheetNames[0]);
            })
            .catch(error => console.error('Error uploading file:', error));
    };

    const handleSheetClick = (filePath, sheetName) => {
        axios.get(`${filePath}`, {
            responseType: 'arraybuffer',
            withCredentials: true
        })
            .then(response => {
                const data = new Uint8Array(response.data);
                const workbook = XLSX.read(data, { type: 'array' });
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet, { raw: false });
                setData(jsonData);
                setFilteredData(jsonData);
                setCurrentFile(filePath);
                setCurrentSheet(sheetName);
                localStorage.setItem('currentFile', filePath);
                localStorage.setItem('currentSheet', sheetName);
            })
            .catch(error => console.error('Error reading file:', error));
    };

    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        if (term.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter(row =>
                row['Governor Name'] && row['Governor Name'].toLowerCase().includes(term.toLowerCase()) || row['Governor ID'] && row['Governor ID'].includes(term)
            );
            setFilteredData(filtered);
        }
    };

    const checkFileButtonDisabled = (current) => {
        if (current === currentFile) return true
        return false
    }

    const checkSheetButtonDisabled = (current) => {
        if (current === currentSheet) return true
        return false
    }

    return (
        <div className="App">
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            <div>
                <h2>Available Files</h2>
                <ul className='sheetList'>
                    {files.map((file, index) => (
                        <li key={index}>
                            <button onClick={() => fetchSheetNames(file)} disabled={checkFileButtonDisabled(file)}>{file.slice(9)}</button>
                        </li>
                    ))}
                </ul>
            </div>
            {sheetNames.length > 0 && (
                <div>
                    <h2>Sheets</h2>
                    <ul className='sheetList'>
                        {sheetNames.map((sheet, index) => (
                            <li key={index}>
                                <button onClick={() => handleSheetClick(currentFile, sheet)} disabled={checkSheetButtonDisabled(sheet)}>{sheet}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {data.length > 0 && (
                <div>
                    <input
                        type="text"
                        placeholder="Search by Governor Name or ID"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className='search-bar'
                    />
                    <Link to='kd-stats' state={{ fileName: currentFile, sheetName: currentSheet }} className='button'>Overall KD stats</Link>
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredData.map((row, index) => (
                                    <tr key={index}>
                                        {
                                            Object.values(row).map((value, idx) => (
                                                <td key={idx}>
                                                    {
                                                        currentSheet == 'FinalStats' && idx == 0 ? <Link to='/user' state={row} >{value}</Link>
                                                            : (idx === 16 || idx === 19) ? value.replaceAll('.', ',')
                                                                : value.replaceAll(',', '.')
                                                    }
                                                </td>
                                            ))}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}