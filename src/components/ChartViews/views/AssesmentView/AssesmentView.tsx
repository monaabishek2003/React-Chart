import { useState,useEffect} from 'react'
import { Doughnut } from 'react-chartjs-2';
import useFetchChartData from "../../hooks/useFetchChartData";

export const AssessmentView = () => {
  const [assessmentData, setAssessmentData] = useState<any | null>(null);
  const {data } = useFetchChartData("./data.json")
  const calculateTotal = (data: number[]): number => {
    return data.reduce((sum, value) => sum + value, 0);
  };
  useEffect(() => {
    if(data){
     setAssessmentData({
       labels: data.assessment.labels,
       datasets: [
         {
           data: data.assessment.data,
           backgroundColor: data.assessment.backgroundColor,
           borderWidth: 1,
         },
       ],
       total: calculateTotal(data.assessment.data)
     });
 
    }
  }, [data]);

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

  if ( !assessmentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="chart-container">
     <div className="chart-title">Assesment View</div>
      <div className="chart-wrapper">
        <Doughnut data={assessmentData} options={options} />
        <div className="chart-center">Overall<br/>{assessmentData.total}</div>
     </div>
   </div>
 )
}

export default AssessmentView
