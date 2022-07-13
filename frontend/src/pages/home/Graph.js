import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';

export default function Graph({ handicapData }) {

    const array = [...handicapData]

    const dateOrderedData = array.reverse()
    const lastTenChanges = dateOrderedData.splice(0,10)

    // y-axis upper limit
    const maxIndex = Math.max(...lastTenChanges.map(entry => entry.newIndex))
    const upperMultipleOfTen = (Math.ceil(maxIndex / 10)) * 10

    //y-axis lower limit
    const lowIndex = Math.min(...lastTenChanges.map(entry => entry.newIndex))
    const lowerMultipleOfTen = (Math.floor(lowIndex / 10)) * 10

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );

    const labels = lastTenChanges.map(entry => {
        const date = entry.roundData.date
        const splitData = date.split('-')
        splitData.shift()
        const newDate = splitData.join('-')
        return newDate
    })

    const options = {
        responsive: true,
        plugins: {
            legend: {
            display: false
            },
            title: {
            display: false,
            }
        },
        scales: {
            x: {
                ticks: {
                    color: 'rgb(255,255,255)'
                },
                grid: {
                    color: 'rgb(155,155,155)'
                }
            },
            y: {
                min: lowerMultipleOfTen,
                max: upperMultipleOfTen,
                ticks: {
                    color: 'rgb(255,255,255)',
                },
                grid: {
                    color: 'rgb(155,155,155)'
                }
            }
        }
    };

    const data = {
        labels,
        datasets: [
            {
                label: 'Handicap Index',
                data: lastTenChanges.map(entry => {
                    return entry.newIndex
                }),
                borderColor: 'rgb(191, 2, 8)',
                backgroundColor: 'rgb(191, 2, 8)',
                pointBackgroundColor: 'rgb(255,255,255)',
            }
        ]
    }

  return (
    <div className="graph">
        <h2>Handicap Progress</h2>
        <div className='line-graph'>
            <Line options={options} data={data} />
        </div>
    </div>
  )
}
