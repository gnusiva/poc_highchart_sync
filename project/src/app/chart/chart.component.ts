import { Component, OnInit, OnChanges, Input, AfterViewChecked } from '@angular/core';
import * as Highcharts from 'highcharts';
import {ChartService} from './chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewChecked {

  @Input() data;
  chartId;
  viewChecked = false;

  constructor(public chartService: ChartService) {
    Highcharts.Pointer.prototype.reset = function () {
        return undefined;
    };

    /**
     * Highlight a point by showing tooltip, setting hover state and draw crosshair
     */
    Highcharts.Point.prototype['highlight'] = function (event) {
        event = this.series.chart.pointer.normalize(event);
        this.onMouseOver(); // Show the hover marker
        this.series.chart.tooltip.refresh(this); // Show the tooltip
        this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
    };
  }

  ngOnInit() {
    this.chartId = 'performanceChart-' + Math.floor(Math.random() * 1000 );
  }

  ngAfterViewChecked(): void {
    if ( ! this.viewChecked ) {
      this.viewChecked = true;
      this.ngOnChanges();
    }
  }

  ngOnChanges(): void {
    if ( this.data && this.viewChecked ) {
      this.highChart(this.data);
    }
  }

  highChart(dataset) {
    Highcharts.chart(this.chartId, this.chartService.getOptions(dataset) );
  }

  chartSync(e) {
    var chart,
        point,
        i,
        event;

    for (i = 0; i < Highcharts.charts.length; i = i + 1) {
        chart = Highcharts.charts[i];
        // Find coordinates within the chart
        event = chart.pointer.normalize(e);
        // Get the hovered point
        point = chart.series[0].searchPoint(event, true);

        if (point) {
            point.highlight(e);
        }
    }
  }

}
