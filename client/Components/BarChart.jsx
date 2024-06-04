import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({values, labels}){
    const sortedValues = values.sort((a, b) => b - a)
    console.log(sortedValues)

    const data = {
        labels: labels,
        datasets: [{
            data: sortedValues,
            backgroundColor: ['rgb(54, 162, 235)'],
            minBarThickness: 20,
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
                text: 'KP gain leaderboard',
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
        /*scales: {
            x: {
                beginAtZero: true,
            },
        },
        barPercentage: 0.6,*/
    };


    return(
         <Bar data={data} options={options} />
    )
}