'use client';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ChartDisplayProps {
  chartData: any;
}

export default function ChartDisplay({ chartData }: ChartDisplayProps) {
  if (!chartData || !chartData.data) {
    return (
        <div className="bg-surface rounded-lg p-4 h-64 flex items-center justify-center border border-border-color">
            <p className="text-text-secondary">차트 데이터를 불러오는 중입니다...</p>
        </div>
    );
  }
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
            color: '#E5E5E5'
        }
      },
    },
    scales: {
        x: {
            ticks: {
                color: '#E5E5E5'
            },
            grid: {
                color: 'rgba(184, 134, 11, 0.3)'
            }
        },
        y: {
            ticks: {
                color: '#E5E5E5'
            },
            grid: {
                color: 'rgba(184, 134, 11, 0.3)'
            }
        }
    }
  };

  return (
    <div className="h-64">
      <Line options={options} data={chartData.data} />
    </div>
  );
}
