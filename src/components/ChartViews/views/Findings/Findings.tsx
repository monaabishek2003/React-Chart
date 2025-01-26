import  { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

import useFetchChartData from "../../hooks/useFetchChartData";

export const Findings = () => {
  const [findingsData, setFindingsData] = useState<any | null>(null);
  const {data} = useFetchChartData("./data.json")

  useEffect(()=>{
    if(data){
      setFindingsData({
       labels: data.findings.labels,
       datasets: [
         {
           data: data.findings.data,
           backgroundColor: data.findings.backgroundColor,
           borderWidth: 1,
         },
       ],
     });
    }
  }, [data])

  const options = {
    responsive: true,
    plugins: {
      legend:  {
        display: false, 
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const value = tooltipItem.raw;
            const label = tooltipItem.label;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };
  if (!findingsData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="chart-container">
        <div className="chart-title">Findings</div>
        <div className="chart-wrapper">
          <Bar data={findingsData} options={options} />
        </div>
      </div>
  )
}