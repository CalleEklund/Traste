/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Accordion, AccordionSummary, AccordionDetails, Typography,
  Divider, List, ListItem, ListItemText, Button, Skeleton, Stack}
  from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageModal from '../components/ImageModal.js';
import {getAllReportsAPI} from '../api/trasteApi';
/**
 * A page which shows the created reports in list form
 * @return {*}
 */
function HistoryPage() {
  const [reportData, setReportData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const titles = {
    binSize: 'Bin size: ',
    date: 'Date: ',
    docketNumber: 'Docket Number: ',
    docketPicture: 'Docket Picture: ',
    name: 'Name: ',
    site: 'Site: ',
    timestamps: 'Report made: ',
    wastePicture: 'Waste Picture: ',
    weight: 'Weight: ',
    WasteData: {
      Wood: 'Wood: ',
      Concrete: 'Concrete: ',
      Plastic: 'Plastic: ',
      Metal: 'Metal: ',
      Other: 'Other: ',
    },
  };
  /**
   * Reformats the array reports comming from Firestore.
   * @param {*} inData report array from Firestore
   * @return {*} report array
   */
  function formatData(inData) {
    const outList = [];
    inData.map((report)=>{
      const tmp = {};
      Object.entries(titles).map(([key, value], index)=>{
        if (key==='WasteData') {
          Object.entries(value).map(([k, v], i)=>{
            tmp[v] = report.WasteData[k];
          });
        } else {
          tmp[value] = report[key];
        }
      });
      outList.push(tmp);
    });
    return outList;
  }

  useEffect(async () => {
    const out = await getAllReportsAPI.get('');
    setReportData(formatData(out.data));
    setLoading(false);
  }, []);
  if (isLoading) {
    return (
      <Stack spacing={1}>
        <Skeleton variant="rectangular" height={'5vh'} />
        <Skeleton variant="rectangular" height={'5vh'} />
        <Skeleton variant="rectangular" height={'5vh'} />
        <Skeleton variant="rectangular" height={'5vh'} />

      </Stack>);
  }
  return (
    <div>
      {reportData.map((item, index)=>(
        <div key={index}>
          <Accordion
            sx={{backgroundColor: Colors.trasteDadada}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography color={Colors.trasteNavyBlue}>
                {item['Date: '] + ' ' + item['Docket Number: ']}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {Object.entries(item).map(([key, value], index)=>{
                  if (key === 'Docket Picture: ' || key === 'Waste Picture: ') {
                    return (
                      <ListItem key={index}>
                        <ListItemText>
                          {key}
                          <Button onClick={()=>{
                            setSelectedImage(value);
                            handleOpen(true);
                          }}>Open image</Button>

                        </ListItemText>
                      </ListItem>
                    );
                  } else {
                    return (
                      <ListItem key={index}>
                        <ListItemText>
                          {key + value}
                        </ListItemText>
                      </ListItem>
                    );
                  }
                })}

              </List>
            </AccordionDetails>
          </Accordion>
          <Divider/>
        </div>
      ))
      }
      <ImageModal
        picture={selectedImage}
        closeHandler={handleClose}
        isOpen={open}
      />
    </div>
  );
}
export default HistoryPage;


import {Colors} from '../assets/Colors.js';

