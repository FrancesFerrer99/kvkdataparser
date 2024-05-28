import { Doughnut } from "react-chartjs-2"

export default function GaugeChart({ values }) {
    const { sevWounds, goalWounds, goalDeads, totalDeads } = values
    const percentages = [sevWounds / goalWounds * 100, totalDeads / goalDeads * 100]

    console.log(percentages[0], percentages[1])

    const data = {
        labels: ["sev wounds % reached", "% missing to reach goal", "% missing to reach goal", "deads % reached"],
        datasets: [{
            data: [
                Math.min(percentages[0], 100), // Upper gauge (sev wounds %)
                100 - Math.min(percentages[0], 100), // Remaining part of upper gauge
                100 - Math.min(percentages[1], 100), // Remaining part of lower gauge
                Math.min(percentages[1], 100), // Lower gauge (deads %)
            ],
            backgroundColor: ['#FF6384', '#EEEEEE', '#EEEEEE', '#36A2EB'],
            borderWidth: 0
        }]
    }
    const options = {
        cutout: '50%',
        rotation: -90,
        circumference: 360,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    /*label: function (context) {
                      const index = context.dataIndex;
                      const value = data.datasets[0].data[index];
                      const label = labels[Math.floor(index / 2)];
                      return `${label}: ${value}%`;
                    }*/
                }
            }
        }
    };

    return (
        <Doughnut data={data} options={options} />
    )
}