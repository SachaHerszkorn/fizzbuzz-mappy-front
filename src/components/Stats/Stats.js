import React from 'react';
import { Bar } from 'react-chartjs-2';

import { useGetStats } from 'hooks/stats';

function Stats() {
  const {
    stats,
    isGetStatsLoading,
    hasGetStatsError,
    getStatsErrorMessage,
  } = useGetStats();

  const data = stats &&
    stats.length > 0 && {
      labels: stats.map((_, index) => {
        if (index + 1 === 1) return '1st most frequent request';
        if (index + 1 === 2) return '2nd most frequent request';
        if (index + 1 === 3) return '3rd most frequent request';
        return `${index + 1}th most frequent request`;
      }),
      datasets: [
        {
          backgroundColor: [
            'rgba(255, 166, 0, 0.7)',
            'rgba(255, 124, 67, 0.7)',
            'rgba(249, 93, 106, 0.7)',
            'rgba(249, 93, 106, 0.7)',
            'rgba(160, 81, 149, 0.7)',
            'rgba(102, 81, 145, 0.7)',
            'rgba(47, 75, 124, 0.7)',
            'rgba(0, 63, 92, 0.7)',
          ],
          borderColor: [
            'rgba(255, 166, 0, 0.9)',
            'rgba(255, 124, 67, 0.9)',
            'rgba(249, 93, 106, 0.9)',
            'rgba(249, 93, 106, 0.9)',
            'rgba(160, 81, 149, 0.9)',
            'rgba(102, 81, 145, 0.9)',
            'rgba(47, 75, 124, 0.9)',
            'rgba(0, 63, 92, 0.9)',
          ],
          borderWidth: 1,
          hoverBackgroundColor: [
            'rgba(255, 166, 0, 0.5)',
            'rgba(255, 124, 67, 0.5)',
            'rgba(249, 93, 106, 0.5)',
            'rgba(249, 93, 106, 0.5)',
            'rgba(160, 81, 149, 0.5)',
            'rgba(102, 81, 145, 0.5)',
            'rgba(47, 75, 124, 0.5)',
            'rgba(0, 63, 92, 0.5)',
          ],
          hoverBorderColor: [
            'rgba(255, 166, 0, 1)',
            'rgba(255, 124, 67, 1)',
            'rgba(249, 93, 106, 1)',
            'rgba(249, 93, 106, 1)',
            'rgba(160, 81, 149, 1)',
            'rgba(102, 81, 145, 1)',
            'rgba(47, 75, 124, 1)',
            'rgba(0, 63, 92, 1)',
          ],
          data: stats.map((stat) => stat.count),
        },
      ],
    };

  return (
    <div className="page">
      {data ? (
        <Bar
          data={data}
          width={100}
          height={500}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            tooltips: {
              callbacks: {
                afterLabel: ({ index }) => {
                  const { int1, int2, str1, str2, limit } = stats[index];

                  return `int1:${int1}\nstr1:${str1}\nint2:${int2}\nstr2:${str2}\nlimit:${limit}`;
                },
                label: ({ value }) => {
                  return `${value} ${value > 1 ? 'occurencies' : 'occurency'}`;
                },
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    stepSize: 1,
                    beginAtZero: true,
                  },
                },
              ],
            },
          }}
        />
      ) : (
        <div className="error">No requests available</div>
      )}
      {hasGetStatsError && !isGetStatsLoading && (
        <div className="error">{getStatsErrorMessage}</div>
      )}
      {isGetStatsLoading && <div className="loading">loading</div>}
    </div>
  );
}

export default Stats;
