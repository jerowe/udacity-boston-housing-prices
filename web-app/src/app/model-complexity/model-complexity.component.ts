import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ModelLearningService} from '../model-learning/model-learning.service';
import * as d3 from 'd3';
import {minBy, maxBy, meanBy} from 'lodash';

@Component({
    // selector: 'app-model-complexity',
    templateUrl: './model-complexity.component.html',
    styleUrls: ['./model-complexity.component.css']
})
export class ModelComplexityComponent implements OnInit {

    public data: any;
    public chartProps: any = {};
    public svg: any;
    public modelLearningResults: any;
    private _options: { width, height } = {width: 800, height: 600};
    @ViewChild('chart') chartElement: ElementRef;

    constructor(private modelLearningService: ModelLearningService) {
        this.modelLearningService.modelComplexity()
            .subscribe((results) => {
                console.log(results);
                this.data = results;
                this.modelLearningResults = results;
                this.buildChart();
            }, (error) => {
                console.log(error);
            });
    }

    ngOnInit() {
    }


    get options() {
        return this._options = {
            width: window.innerWidth,
            height: window.innerHeight
        };
    }

    buildChart() {

        const margin = {top: 30, right: 20, bottom: 60, left: 60},
            width = 800 - margin.left - margin.right,
            height = 200 - margin.top - margin.bottom;

        const data: Array<any> = [];
        this.modelLearningResults['train_mean'].map((v, index) => {
            data.push({
                'index': index,
                'max_depths': this.modelLearningResults['max_depths'][index],
                'train_mean': v,
                'train_std': this.modelLearningResults['train_std'][index],
                'test_std': this.modelLearningResults['test_std'][index],
                'test_mean': this.modelLearningResults['test_mean'][index]
            });
        });

        // Set the ranges
        this.chartProps.x = d3.scaleLinear().range([0, width]);
        this.chartProps.y = d3.scaleLinear().range([height, 0]);

        const _this = this;
        const trainingLine = d3.line()
            .x(function (d) {
                // @ts-ignore
                return _this.chartProps.x(d.max_depths);
            })
            .y(function (d) {
                // @ts-ignore
                return _this.chartProps.y(d.train_mean);
            });
        // define the area
        const trainArea = d3.area()
            .x(function (d) {
                // @ts-ignore
                return _this.chartProps.x(d.max_depths);
            })
            .y0(function (d) {
                // @ts-ignore
                const y = d.train_mean - d.train_std;
                return _this.chartProps.y(y);
            })
            .y1(function (d) {
                // @ts-ignore
                const y = d.train_mean + d.train_std;
                return _this.chartProps.y(y);
            });
        const testArea = d3.area()
            .x(function (d) {
                // @ts-ignore
                return _this.chartProps.x(d.max_depths);
            })
            .y0(function (d) {
                // @ts-ignore
                const y = d.test_mean - d.test_std;
                return _this.chartProps.y(y);
            })
            .y1(function (d) {
                // @ts-ignore
                const y = d.test_mean + d.test_std;
                return _this.chartProps.y(y);
            });

        const testingLine = d3.line()
            .x(function (d) {
                // @ts-ignore
                return _this.chartProps.x(d.max_depths);
            })
            .y(function (d) {
                // @ts-ignore
                return _this.chartProps.y(d.test_mean);
            });

        const svg = d3.select(this.chartElement.nativeElement)
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xMin = Math.min(minBy(data, 'train_mean'), minBy(data, 'test_mean'));
        this.chartProps.x.domain([0, d3.max(data, function (d) {
            // @ts-ignore
            return d.max_depths;
        })]);
        this.chartProps.y.domain([0, d3.max(data, function (d) {
            // @ts-ignore
            return d.train_mean;
        })]);

        // add the area
        svg.append('path')
            .attr('class', 'area')
            .style('fill', 'pink')
            .attr('d', trainArea(data));
        // add the area
        svg.append('path')
            .attr('class', 'area')
            .style('fill', 'lightgreen')
            .attr('d', testArea(data));

        // Add the trainingLine path.
        svg.append('path')
            .attr('class', 'train-line')
            .style('stroke', 'red')
            .style('fill', 'none')
            .attr('d', trainingLine(data));

        // Data dots
        svg.selectAll('train-line')
            .data(data)
            .enter().append('circle')
            .attr('class', 'data-circle')
            .attr('r', 2)
            .style('fill', 'red')
            .attr('cx', function (d) {
                return _this.chartProps.x(d.max_depths);
            })
            .attr('cy', function (d) {
                return _this.chartProps.y(d.train_mean);
            });

        // Data dots
        svg.selectAll('test-line')
            .data(data)
            .enter().append('circle')
            .attr('class', 'data-circle')
            .attr('r', 2)
            .style('fill', 'green')
            .attr('cx', function (d) {
                return _this.chartProps.x(d.max_depths);
            })
            .attr('cy', function (d) {
                return _this.chartProps.y(d.test_mean);
            });

        svg.append('path')
            .attr('class', 'line')
            .style('stroke', 'green')
            .style('fill', 'none')
            .attr('d', testingLine(data));


        // Add the X Axis
        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', `translate(0,${height})`)
            .call(d3.axisBottom(this.chartProps.x).ticks(5));

        // Add the Y Axis
        svg.append('g')
            .call(d3.axisLeft(this.chartProps.y).ticks(5));

        // text label for the x axis
        svg.append('text')
            .attr('transform',
                'translate(' + (width / 2) + ' ,' +
                (height + margin.top + 5) + ')')
            .style('text-anchor', 'middle')
            .text('Max Depth');

        // text label for the y axis
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', 0 - margin.left)
            .attr('x', 0 - (height / 2))
            .attr('dy', '1em')
            .style('text-anchor', 'middle')
            .text('Score');


        // Setting the required objects in chartProps so they could be used to update the chart
        this.chartProps.svg = svg;
        this.chartProps.trainingLine = trainingLine;
        this.chartProps.xAxis = d3.axisBottom(this.chartProps.x);
        this.chartProps.yAxis = d3.axisLeft(this.chartProps.y);

    }

}
