import { Chart, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from "react-chartjs-2"

export default function PieChart({ T4, T5 }) {
    const isEmpty = T4 === 0 && T5 === 0
    Chart.register(ArcElement, Tooltip, Legend, Title);
    Chart.defaults.plugins.tooltip.backgroundColor = 'rgb(0, 0, 156)';
    Chart.defaults.plugins.legend.position = 'right';
    Chart.defaults.plugins.legend.title.display = true;

    const data = {
        labels: [
            'T4 kills',
            'T5 kills',
        ],
        datasets: [{
            data: [T4, T5],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
            ],
            hoverOffset: 4
        }]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'KP gain breakdown',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const dataset = tooltipItem.dataset;
                        const total = dataset.data.reduce((sum, value) => sum + value, 0);
                        const currentValue = dataset.data[tooltipItem.dataIndex];
                        const percentage = ((currentValue / total) * 100).toFixed(2);
                        return `${tooltipItem.label} ${percentage}%: ${currentValue}`;
                    }
                },
                enabled: !isEmpty,
            }
        },
    };

    return (
        <>
            {!isEmpty ? <Pie data={data} options={options} /> : <h2>No kp gain</h2>}
        </>

    )
}