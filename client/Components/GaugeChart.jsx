import { Doughnut } from "react-chartjs-2"

export default function GaugeChart({ values }) {
    const { achieved, goal, labels, title } = values

    const data = {
        labels: ["% achieved", "% to reach goal"],
        datasets: [{
            data: [
                Math.min(achieved / goal * 100, 100), // Upper gauge (sev wounds %)
                100 - Math.min(achieved / goal * 100, 100), // Remaining part of upper gauge
            ],
            backgroundColor: ['#7BC043', '#FF6384'],
            borderWidth: 2
        }]
    }
    const options = {
        cutout: '50%',
        rotation: -90,
        circumference: 180,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const index = context.dataIndex;
                        const value = data.datasets[0].data[index].toFixed(2);
                        //const label = labels[Math.floor(index / 2)];`${label}
                        return `: ${value}%`;
                    }
                }
            }
        }
    };

    return (
        <Doughnut data={data} options={options} />
    )
}