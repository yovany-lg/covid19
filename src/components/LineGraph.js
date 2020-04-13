import React, { useMemo } from 'react';
import { ResponsiveLine, Line } from '@nivo/line'
import { makeStyles } from '@material-ui/core/styles';
import { red, blueGrey, lightGreen } from '@material-ui/core/colors';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const useStyles = makeStyles(theme => ({
  line: {
      height: 380,
      width: 800,
  },
}));

const valueFormat = (value) => new Intl.NumberFormat('en-US').format(value);

const MyResponsiveLine = ({ data }) => {
  const classes = useStyles();
  const graphData = useMemo(() => [
    { id: 'Muertes',  color: blueGrey[500], data: data ? data.timeline.deaths : [] },
    { id: 'Recuperados', color: lightGreen[500], data: data ? data.timeline.recovered : [] },
    { id: 'Casos',  color: red[500], data: data ? data.timeline.cases : [] },
  ], [data]);
  return (
    <div className={classes.line}>
      <ResponsiveLine
          data={graphData}
          margin={{ top: 25, right: 110, bottom: 25, left: 60 }}
          xScale={{ type: 'time', format: '%m/%d/%y', presicion: 'day' }}
          xFormat="time:%Y-%m-%d"
          yFormat={valueFormat}
          yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
          curve="cardinal"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            format: '%b %d',
            tickValues: 'every 8 days',
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              format: valueFormat,
          }}
          colors={{ datum: 'color' }}
          pointSize={6}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabel="y"
          enableSlices='x'
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
              {
                  anchor: 'bottom-right',
                  direction: 'column',
                  justify: false,
                  translateX: 100,
                  translateY: 0,
                  itemsSpacing: 0,
                  itemDirection: 'left-to-right',
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: 'circle',
                  symbolBorderColor: 'rgba(0, 0, 0, .5)',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemBackground: 'rgba(0, 0, 0, .03)',
                              itemOpacity: 1
                          }
                      }
                  ]
              }
          ]}
      />
    </div>
  )
}

export default MyResponsiveLine;