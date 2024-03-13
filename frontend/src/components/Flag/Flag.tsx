import { useEffect, useState } from 'react';
import './Flag.css';
import { hasReportedGame, reportGame, unReportGame } from '../../services/GameService';

const ReportFlag = ({ id }: { id: number }) => {
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    async function checkIfReported() {
      const reported : Boolean = await hasReportedGame(id);
      console.log(reported);
      setIsFilled(Boolean(reported));
    }
    checkIfReported();
  }, [id]);

  const report = async () => {
    if (isFilled) {
      setIsFilled(false);
      await unReportGame(id);
    } else {
      setIsFilled(true);
      await reportGame(id);
    }
  }

  return (
    <svg onClick={report} className="flag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? "#FF4500" : "none"} stroke="currentColor" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7" />
    </svg>
  );
};

export default ReportFlag;
