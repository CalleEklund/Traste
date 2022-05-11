import React from 'react';
import PropTypes from 'prop-types';
import {Colors} from '../assets/Colors';
import Chart from 'react-apexcharts';
import {Paper} from '@mui/material';


/**
 * Constructor for custom chart.
 * @param {*} labels Starting value.
 * @param {*} seriesData Handler.
 * @return {Paper} Rendered field.
 */
function CustomChart({labels, seriesData}) {
  const state = {
    series: seriesData,
    options: {
      colors: [Colors.trasteGreen,
        Colors.trasteBlue,
        Colors.trasteTeal,
        Colors.trasteDarkPurple,
        Colors.trastePurple],

      chart: {
        redrawOnParentResize: true,
        redrawOnWindowResize: true,
        foreColor: 'white',
        width: '110%',
        type: 'donut',
      },
      labels: labels,
      theme: {
        monochrome: {
          enabled: false,
          color: Colors.trasteGreen,
          shadeTo: 'dark',
          shadeIntensity: 0.45,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            fontFamily: 'Gilroy',
            enabled: true,
            size: '42%',
          },
          minAngleToShowLabel: 0,
          expandOnClick: true,
          dataLabels: {
            offset: 0,
          },
        },
      },
      dataLabels: {
        style: {
          fontWeight: 'regular',
          fontSize: '12px',
          fontFamily: 'Gilroy',
          colors: [Colors.trasteNavyBlue,
            'white',
            'white',
            'white',
            'white'],
        },
        enabled: true,
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + '%'];
        },
      },
      legend: {
        fontFamily: 'Gilroy',
        show: true,
        position: 'bottom',
        onItemClick: {
          toggleDataSeries: false,
        },
        onItemHover: {
          highlightDataSeries: false,
        },
      },
      // title: {
      //  text: 'Waste Data:',
      //  align: 'left',
      //  style: {
      //    fontWeight: 'regular',
      //    color: 'white',
      //    fontFamily: 'Gilroy',
      //  },
      // },
      stroke: {
        colors: ['transparent'],
      },
      tooltip: {
        enabled: true,
        enabledOnSeries: true,
        shared: true,
        followCursor: false,
        intersect: false,
        inverseOrder: false,
        fillSeriesColor: false,
        theme: 'dark',
        style: {

          'fontSize': '12px',
          'fontFamily': 'Gilroy',
        },
      },
    },
  };
  return (
    <Paper elevation={0}
      sx={{display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: '100vw', maxWidth: '650px', justifyContent: 'center',
        backgroundColor: 'transparent', marginLeft: -2}}>
      <Chart options={state.options}
        series={state.series} type="donut"
        width='100%'
      />
    </Paper>
  );
}
/**
 * Return function for custom chart.
 * @return {Paper} Rendered field.
 */

CustomChart.propTypes = {
  labels: PropTypes.array.isRequired,
  seriesData: PropTypes.array.isRequired,
};

export default CustomChart;
