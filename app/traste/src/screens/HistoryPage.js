import React, {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import {AccordionSummary, AccordionDetails, Typography, Divider}
  from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import {Colors} from '../assets/Colors.js';

import {List, ListItem,
  ListItemText} from '@mui/material';

/**
 * Menu page that contains "Add report"-button and "Show history"-button.
 * @return {Container} The page with the two buttons
 */
function HistoryPage() {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(async () => {
    const out = await axios.get('https://europe-west3-traste-71a71.cloudfunctions.net/app/getAllReports');
    console.log('axios status code');
    setReportData(out.data);
    setLoading(false);
  }, []);
  if (isLoading) {
    return (<h1>Den laddar chilla</h1>);
  }
  return (
    <div>
      {console.log(reportData)}
      {reportData.map((item, index)=>(
        <div key={index}>
          <Accordion
            sx={{backgroundColor: Colors.trasteDarkPurple}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography color={Colors.trasteGreen}>
                {item.date + ' ' + item.docketNumber}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {Object.entries(item).map((key, index)=>(
                  <ListItem key={index}>
                    <ListItemText
                      sx={{backgroundColor: Colors.trasteGreen}}>
                      {key}
                    </ListItemText>
                  </ListItem>
                ))}

              </List>
            </AccordionDetails>
          </Accordion>
          <Divider/>
        </div>
      ))
      }

      {/* {reportData.map((item, index)=>(
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{item.date}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <BootstrapDialog
              aria-labelledby="customized-dialog-title"
              PaperProps={{style: {
                backgroundColor: Colors.trasteGreen,
                boxShadow: 'none'}}}
              // fullScreen='true'
              sx={{backdropFilter: 'blur(40px)'}}
            >
              <BootstrapDialogTitle id="customized-dialog-title"
                sx={{backgroundColor: Colors.trasteNavyBlue}}
              >
                <Typography variant='h5' color="common.white" align="center">
        Confirm Report
                </Typography>
              </BootstrapDialogTitle>
              <DialogContent dividers
                sx={{borderColor: Colors.trasteNavyBlue, overflow: 'hidden',
                  overflowY: 'scroll'}}>
                <List sx={{pt: 0}}>
                  <ListItem autoFocus>
                    <ListItemText primary="Date"
                      secondary={new Date(item.date).toDateString()}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                  <ListItem autoFocus>
                    <ListItemText primary="Docket number"
                      secondary={item.docketNumber}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                  <ListItem autoFocus>
                    <ListItemText primary="Weight"
                      secondary={item.weight}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                  <ListItem autoFocus>
                    <ListItemText primary="Bin size"
                      secondary={item.binSize}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                  <ListItem autoFocus>
                    <ListItemText primary="Site"
                      secondary={item.site}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                </List>
                <Divider
                  sx={{backgroundColor: Colors.trasteNavyBlue}}/>
                <List sx={{pt: 0}}>
                  <ListItem autoFocus>
                    <ListItemText primary="Wood"
                      secondary={item.Wood + '%'}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                  <ListItem autoFocus>
                    <ListItemText primary="Plastic"
                      secondary={item.Plastic + '%'}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                  <ListItem autoFocus>
                    <ListItemText primary="Concrete"
                      secondary={item.Concrete + '%'}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                  <ListItem autoFocus>
                    <ListItemText primary="Metal"
                      secondary={item.Metal + '%'}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                  <ListItem autoFocus>
                    <ListItemText primary="Other"
                      secondary={item.Other + '%'}
                      // primaryTypographyProps={{color: 'common.white'}}
                      // secondaryTypographyProps={{color: 'common.white'}}
                    />
                  </ListItem>
                </List>
              </DialogContent>
            </BootstrapDialog>
          </AccordionDetails>
        </Accordion>
      ))} */}
    </div>
  );
}
export default HistoryPage;
