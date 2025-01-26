import{ useState,useEffect} from 'react'
import { Doughnut } from 'react-chartjs-2';
import useFetchChartData from "../../hooks/useFetchChartData";


export const PolicyView = () => {
  const [policyData, setPolicyData] = useState<any | null>(null);
  const {data} = useFetchChartData("./data.json");
  const calculateTotal = (data: number[]): number => {
    return data.reduce((sum, value) => sum + value, 0);
  };
  useEffect(() => {
    if(data){
    setPolicyData({
      labels: data.policy.labels,
      datasets: [
        {
          data: data.policy.data,
          backgroundColor: data.policy.backgroundColor,
          borderWidth: 1,
        },
      ],
      total: calculateTotal(data.evidence.data)
    }) 
  }}, [data]);

  const options = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position:(function() { enum LegendPosition { right = "right" }; return LegendPosition.right })(),
        labels: {
          boxWidth: 20,
        },
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
  if (!policyData) {
    return <div>Loading...</div>;
  }
  return (
     <div className="chart-container">
      <div className="chart-title">Policy View</div>
        <div className="chart-wrapper">
          <Doughnut data={policyData} options={options} />
          <div className="chart-center">Overall<br/>{policyData.total}</div>
      </div>
    </div>
  )
}

export default PolicyView
