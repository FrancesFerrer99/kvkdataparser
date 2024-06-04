import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ values, type, range }) {
    const sortedValues = values.sort((a, b) => b.type - a.type)
    const labels = sortedValues.map(object => object.name).slice(0, range)
    const chartValues = sortedValues.map(object => object.type).slice(0, range)

    const data = {
        labels: labels,
        datasets: [{
            data: chartValues,
            backgroundColor: ['rgb(54, 162, 235)'],
            hoverBackgroundColor: 'rgba(255, 205, 86, 0.2)'
        }],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: `${type} gain leaderboard`,
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        const currentValue = tooltipItem.raw;
                        const currentLabel = tooltipItem.label
                        return `${currentLabel}: ${currentValue}`;
                    }
                },
            }
        },
        indexAxis: 'y',
    };


    return (
        <Bar data={data} options={options} />
    )
}