import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import "./index.css"

import { 
  AssessmentView,
  PolicyView,
  EvidenceView,
  Findings
 } from './views';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);


export const ChartViews = () => {
  return (
    <div className="grid-container">
      <PolicyView/>
      <AssessmentView/>
      <EvidenceView/>
      <Findings/>
    </div>
  )
}

export default ChartViews;
