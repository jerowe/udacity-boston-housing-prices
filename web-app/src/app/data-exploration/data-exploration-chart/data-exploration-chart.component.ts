import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import * as d3 from 'd3';
import {minBy, maxBy, meanBy} from 'lodash';

@Component({
    selector: 'app-data-exploration-chart',
    templateUrl: './data-exploration-chart.component.html',
    styleUrls: ['./data-exploration-chart.component.css']
})
export class DataExplorationChartComponent implements OnInit {
    @Input() 'data': Array<any>;
    @Input() 'feature' = 'RM';
    @Input() 'stats': any;
    @ViewChild('chart') chartElement: ElementRef;
    public modelLearningResults: {};
    public chartProps: any = {};
    public colorByVar: any;
    public svg;

    constructor() {
    }

    ngOnInit() {
        if (!this.colorByVar) {
            this.colorByVar = this.feature;
        }
        this.buildChart();
        this.getStats();
    }

    getStats() {
        console.log(this.stats);
    }

    buildChart() {
        const data: Array<any> = this.data;
        const margin = {top: 30, right: 20, bottom: 30, left: 60},
            width = 800 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        // Set the ranges
        this.chartProps.x = d3.scaleLinear().range([0, width]);
        this.chartProps.y = d3.scaleLinear().range([height, 0]);

        const _this = this;

        const trainingLine = d3.line()
            .x(function (d) {
                // @ts-ignore
                return _this.chartProps.x(d.RM);
            })
            .y(function (d) {
                // @ts-ignore
                return _this.chartProps.y(d.MEDV);
            });

        this.svg = d3.select(this.chartElement.nativeElement)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const minRm = minBy(data, this.feature)[this.feature];
        const minMedv = minBy(data, 'MEDV')['MEDV'];
        this.chartProps.x.domain([minRm, d3.max(data, function (d) {
            // @ts-ignore
            return d[_this.feature];
        })]);
        this.chartProps.y.domain([minMedv, d3.max(data, function (d) {
            // @ts-ignore
            return d.MEDV;
        })]);

        this.colorCircles();

        // Add the X Axis
        this.svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(this.chartProps.x).ticks(5));

        // Add the Y Axis
        this.svg.append('g')
            .call(d3.axisLeft(this.chartProps.y).ticks(5));


        // Add the X Axis

        // Setting the required objects in chartProps so they could be used to update the chart
        // this.chartProps.svg = this.svg;
        this.chartProps.trainingLine = trainingLine;
        this.chartProps.xAxis = d3.axisBottom(this.chartProps.x);
        this.chartProps.yAxis = d3.axisLeft(this.chartProps.y);
    }

    colorCircles() {
        const data: Array<any> = this.data;
        const _this = this;
        // Data dots
        const RMScale = d3.scaleLinear()
            .range([0, 1])
            .domain([minBy(data, this.colorByVar)[this.colorByVar], maxBy(data, this.colorByVar)[this.colorByVar]]);

        this.svg.selectAll('train-line')
            .data(data)
            .enter().append('circle')
            .attr('class', 'data-circle')
            .attr('r', 2)
            .style('fill', function (d) {
                return d3.interpolateYlGnBu(RMScale(d[_this.colorByVar]));
            })
            .attr('cx', function (d) {
                return _this.chartProps.x(d[_this.feature]);
            })
            .attr('cy', function (d) {
                return _this.chartProps.y(d.MEDV);
            });

    }

    reset() {
        this.colorByVar = this.feature;
        this.colorCircles();
    }

}
