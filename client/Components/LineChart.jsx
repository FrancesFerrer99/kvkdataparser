import { Line } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, plugins } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);

export default function LineChart({ values }) {
    const { pre, preKl, end, label, chartTitle } = values
    const data = {
        labels: ["Pre kvk", "Pre KL", "Post KL"],
        datasets: [
            {
                label: `${label}`,
                data: [pre, preKl, end],
                fill: false,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
                display: true
            },
            title: {
                display: true,
                text: `${chartTitle}`
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset
                        const dataIndex = tooltipItem.dataIndex
                        let previousValue
                        const currentValue = dataset.data[dataIndex]

                        if (dataIndex)
                            previousValue = dataset.data[dataIndex - 1]
                        else
                            previousValue = dataset.data[dataIndex]
                        return `
                            current: ${currentValue}
                            ${chartTitle}: ${currentValue - previousValue}
                            `
                    }
                }
            }
        }
    }

    return (
        <>
            <Line data={data} options={options} />
        </>
    )
}