import {Component, OnInit, ElementRef, ViewChild, ViewChildren, QueryList, Directive, Input, AfterViewInit} from '@angular/core';
import * as d3 from 'd3';
import {minBy, maxBy} from 'lodash';
import {ModelLearningService} from './model-learning.service';


// @ts-ignore
@Component({
    selector: 'app-model-learning',
    templateUrl: './model-learning.component.html',
    styleUrls: ['./model-learning.component.css']
})
export class ModelLearningComponent implements AfterViewInit {

    maxDepths: Array<number> = [1, 3, 4, 6];

    constructor() {
    }

    ngAfterViewInit() {
    }

    onSubmit() {

    }

}
