import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useContext } from 'react';
import TransactionContext from '../Context/TransactionContext';

const PieChart = () => {
    const { month } = useContext(TransactionContext);
    const [data, setData] = useState([]);
    const labels = data.map(item => item._id);
    const counts = data.map(item => item.count);
    const host = "http://localhost:4000"

    const getPieChart = async (month) => {
        const response = await fetch(`${host}/api/pie-chart?month=${month}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const pieData = await response.json()
        setData(pieData);
    }

    useEffect(() => {
        getPieChart(month)
    }, [month])
    

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Count',
                backgroundColor: [
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 205, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)'
                ],
                hoverBorderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                data: counts
            }
        ]
    };
    const getMonthName = (monthNumber) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthNumber - 1];
    };

    return (
        <div style={{
            "margin-bottom": "100px"
        }}>
            <h1 className="text-3xl font-semibold text-blue-500 text-center mb-6">Pie Chart - {getMonthName(month) }</h1>
            <div className='flex w-[70%] h-[330px] justify-center items-center' style={{
                "margin" : "auto"
            }}>
                <Pie data={chartData} />
            </div>
        </div>
    );
};

export default PieChart;
