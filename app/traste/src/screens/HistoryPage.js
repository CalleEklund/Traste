/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {Accordion, AccordionSummary, AccordionDetails, Typography,
  Divider, List, ListItem, ListItemText, Button, Skeleton, Stack, Paper}
  from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ImageModal from '../components/ImageModal.js';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
// import {
//  Chart,
//  PieSeries,
//  Title,
//  Legend} from '@devexpress/dx-react-chart-material-ui';
// import {Palette} from '@devexpress/dx-react-chart';
import {deleteReportAPI, getAllReportsAPI} from '../api/trasteApi';
import {Colors} from '../assets/Colors';
import CustomChart from '../components/Chart.js';
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
  const [expanded, setExpanded] = React.useState(false);

  /**
   * Makes the opening and closing of a accordion a controlled state
   * @param {*} panel the clicked accordion
   * @return {*} sets the opposite of the clicked accordions opened/closed state
   */
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  /**
   * Handles the deleting of a report, checks if the deleting was successfull
   *  then removes the item from reportData
   * @param {*} item the item to be deleted
   * @param {*} index the index of the item
   */
  const handleDelete = async (item, index)=>{
    setExpanded(false);
    const res =
    await deleteReportAPI.delete('',
        {data:
          {
            docketNumber: item['Docket Number: '],
            wastePicture: item['Waste Picture: '],
            docketPicture: item['Docket Picture: '],
          }});
    if (res.status===200) {
      const old = Object.assign([], reportData);
      old.splice(index, 1);
      setReportData(old);
    }
  };

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
          // const pieData = {};
          const labels = [];
          const series = [];
          Object.entries(value).map(([k, v], i)=>{
            // tmp[v] = report.WasteData[k];
            labels.push(v.slice(0, -2));
            series.push(report.WasteData[k]);
            // const dataBit = {argument: v.slice(0, -2),
            //  value: report.WasteData[k]};
            // pieData.push(dataBit);
          });
          tmp['Waste Data'] = {labels: labels, series: series};
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
      <Paper elevation={2}
        square={true}
        sx={{flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: Colors.trasteNavyLight}}>
        {reportData.map((item, index)=>(
          <div key={index}>
            <Accordion
              square={true}
              sx={{backgroundColor: Colors.trasteNavyLight}}
              expanded = {expanded===('panel'+index)}
              onChange = {handleChange('panel'+index)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}
                aria-controls="panel1a-content"
                id="panel1a-header">

                <Typography color={'white'}>
                  {item['Date: '] + ' - ' + item['Docket Number: ']}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {Object.entries(item).map(([key, value], index)=>{
                    if (key === 'Docket Picture: ' ||
                    key === 'Waste Picture: ') {
                      return (
                        <ListItem key={index}>
                          <Stack direction='row'>
                            <ListItemText primary={key}
                              primaryTypographyProps={{color: 'white'}}/>
                            <Button onClick={()=>{
                              setSelectedImage(value);
                              handleOpen(true);
                            }}
                            variant="outlined"
                            sx={{marginLeft: '15px',
                              borderColor: Colors.trasteGreen,
                              backgroundColor: Colors.trasteNavyBlue,
                              color: Colors.trasteGreen}}
                            startIcon={<InsertPhotoIcon
                              style={{color: Colors.trasteGreen}}/>}>
                                Open image
                            </Button>

                          </Stack>
                        </ListItem>
                      );
                    } else if (key === 'Waste Data') {
                      return;
                    } else if (key === 'Name: ') {
                      return;
                    } else {
                      return (
                        <ListItem key={index}>
                          <ListItemText primary={key + value}
                            primaryTypographyProps={{color: 'white'}}/>
                        </ListItem>
                      );
                    }
                  })}
                </List>
                {Object.entries(item).map(([key, value], index)=>{
                  if (key === 'Waste Data') {
                    return (
                      <CustomChart labels={value['labels']}
                        seriesData={value['series']}/>);
                  }
                })}
                <Button
                  endIcon={<DeleteIcon style={{color: Colors.trasteGreen}}/>}
                  variant="outlined"
                  sx={{borderColor: Colors.trasteGreen,
                    backgroundColor: Colors.trasteNavyBlue,
                    color: Colors.trasteGreen}}
                  onClick={()=>{
                    handleDelete(item, index);
                  }}
                >
                Delete Report
                </Button>

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
      </Paper>
    </div>
  );
}
export default HistoryPage;
