import {Component, OnInit, Input, ElementRef, ViewChild} from '@angular/core';
import {ModelLearningService} from '../model-learning/model-learning.service';

// @ts-ignore
@Component({
    // selector: 'app-data-exploration',
    templateUrl: './data-exploration.component.html',
    styleUrls: ['./data-exploration.component.css']
})
export class DataExplorationComponent implements OnInit {

    public data: Array<any> = null;
    public stats: any;

    constructor(private modelLearningService: ModelLearningService) {
    }

    ngOnInit() {
        this.getData();
        this.getStats();
    }

    getStats() {
        this.modelLearningService.getStats()
            .subscribe((results) => {
                this.stats = results;
            }, (error) => {
                console.log(error);
            });
    }

    getData() {
        this.modelLearningService.getData()
            .subscribe((results) => {
                this.data = results;
            }, (error) => {
                console.log(error);
            });

    }

}
