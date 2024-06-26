import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Quiz.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const CostChart = ({ costData }) => {
  const labels = costData.map(item => item.question);
  const data = {
    labels,
    datasets: [
      {
        label: 'Custo Operacional',
        data: costData.map(item => item.cost),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Custo de Referência',
        data: costData.map(item => item.referenceCost),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Comparação de Custos Operacionais',
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
      },
    },
  };

  return (
    <div className="chart-container" style={{ position: 'relative', height: '400px', width: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default CostChart;
