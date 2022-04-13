import React, {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import {AccordionSummary, AccordionDetails, Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import axios from 'axios';

/**
 * Menu page that contains "Add report"-button and "Show history"-button.
 * @return {Container} The page with the two buttons
 */
function HistoryPage() {
  const [reportData, setReportData] = useState([]);
  useEffect(async () => {
    const out = await axios.get('http://localhost:5001/traste-71a71/europe-west3/app/getAllReports');
    setReportData(out.data);
  }, []);
  return (
    <div>
      {console.log('rd', reportData)}
      {reportData.map((item, index)=>(
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {JSON.stringify(item)}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}
export default HistoryPage;
