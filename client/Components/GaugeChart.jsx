import { Doughnut } from "react-chartjs-2"

export default function GaugeChart({ values }) {
    const { achieved, goal, labels, title } = values

    const trueAchieved = typeof (achieved) == 'object' ? parseInt(achieved[0].concat('').replaceAll(',', '')) + parseInt(achieved[1].concat('').replaceAll(',', ''))
    : parseInt(achieved.concat('').replaceAll(',', ''))
    const trueGoal = parseInt(goal.concat('').replaceAll(',', ''))

    const data = {
        labels: ["% achieved", "% to reach goal"],
        datasets: [{
            data: [
                Math.min(trueAchieved / trueGoal * 100, 100), // Upper gauge (sev wounds %)
                100 - Math.min(trueAchieved / trueGoal * 100, 100), // Remaining part of upper gauge
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
                display: true,
                position: 'top'
            },
            title: {
                display: true,
                text: title,
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const index = context.dataIndex;
                        const value = index ? data.datasets[0].data[index].toFixed(2) : (trueAchieved / trueGoal*100).toFixed(2);
                        const label = labels[index];
                        return `${label}: ${value}%`;
                    }
                }
            }
        }
    };

    return (
        <Doughnut data={data} options={options} />
    )
}