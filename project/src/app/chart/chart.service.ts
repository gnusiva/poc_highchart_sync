import { Injectable } from '@angular/core';
import * as Highcharts from 'highcharts';
import {data} from '../data';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  options = {
      chart: {
          marginLeft: 40, // Keep all charts left aligned
          spacingTop: 20,
          spacingBottom: 20
      },
      title: {
          text: '',
          align: 'left',
          margin: 0,
          x: 30
      },
      credits: {
          enabled: false
      },
      legend: {
          enabled: false
      },
      xAxis: {
          crosshair: true,
          events: {
              setExtremes: function (e) {
                var thisChart = this.chart;
                if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                    Highcharts.each(Highcharts.charts, function (chart) {
                        if (chart !== thisChart) {
                            if (chart.xAxis[0].setExtremes) { // It is null while updating
                                chart.xAxis[0].setExtremes(
                                    e.min,
                                    e.max,
                                    undefined,
                                    false,
                                    { trigger: 'syncExtremes' }
                                );
                            }
                        }
                    });
                }
            }
          },
          labels: {
              format: '{value} km'
          }
      },
      yAxis: {
          title: {
              text: null
          }
      },
      tooltip: {
          positioner: function () {
              return {
                  // right aligned
                  x: this.chart.chartWidth - this.label.width,
                  y: 10 // align to title
              };
          },
          borderWidth: 0,
          backgroundColor: 'none',
          pointFormat: '{point.y}',
          headerFormat: '',
          shadow: false,
          style: {
              fontSize: '18px'
          },
          // valueDecimals: dataset.valueDecimals
      },
      series: [
      // {
      //     data: dataset.data,
      //     name: dataset.name,
      //     type: dataset.type,
      //     color: 'red', //Highcharts.getOptions().colors[i],
      //     fillOpacity: 0.3,
      //     tooltip: {
      //         valueSuffix: ' ' + dataset.unit
      //     }
      // }
      ]
  };

  constructor() { }

  getOptions(dataset): any {
    this.options.series = [];
    this.options.series.push({
      data: dataset.data,
      name: dataset.name,
      type: dataset.type,
      color: 'blue', //Highcharts.getOptions().colors[i],
      fillOpacity: 0.3,
      tooltip: {
          valueSuffix: ' ' + dataset.unit
      }
    });
    return this.options;
  }

}
