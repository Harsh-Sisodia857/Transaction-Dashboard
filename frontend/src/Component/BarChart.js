import React, { useState, useEffect, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import "chart.js/auto";
import TransactionContext from '../Context/TransactionContext';

const BarChart = () => {
    const { month } = useContext(TransactionContext);
    const [BarChartData, setBarChartData] = useState([]);
    const labels = BarChartData.map(item => item.priceRange);
    const counts = BarChartData.map(item => item.count);
    const host = "http://localhost:4000"

    console.log(BarChartData);

    const getBarChart = async (month) => {
        const response = await fetch(`${host}/api/bar-chart?month=${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json()
        console.log('====================================');
        console.log(data);
        console.log('====================================');
        setBarChartData(data)
    }

    useEffect(() => {
        getBarChart(month);
    }, [month, BarChartData]);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Count',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: counts
            }
        ]
    };

    // Chart options
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Price Range'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count'
                }
            }
        }
    };


    return (
        <div className='my-28'>
            <h2 className="text-3xl my-10 font-semibold text-blue-500 text-center mb-6">Transactions Bar Chart for {getMonthName(month)}</h2>
            <div style={{
                "width": "70%",
                "margin": "auto"
            }}>
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

const getMonthName = (monthNumber) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[monthNumber - 1];
};

export default BarChart;
