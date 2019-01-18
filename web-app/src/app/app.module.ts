import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';


import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {FormsModule} from '@angular/forms';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
} from '@coreui/angular';

import {AppRoutingModule} from './app.routing';
import {ModelLearningComponent} from './model-learning/model-learning.component';
import {ModelLearningDirective} from './model-learning/model-learning.directive';
import {ChartComponent} from './model-learning/chart/chart.component';
import {DataExplorationComponent} from './data-exploration/data-exploration.component';
import {DataExplorationChartComponent} from './data-exploration/data-exploration-chart/data-exploration-chart.component';
import {ModelComplexityComponent} from './model-complexity/model-complexity.component';
import {HomeComponent} from './home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        ModelLearningComponent,
        ModelLearningDirective,
        ChartComponent,
        DataExplorationComponent,
        DataExplorationChartComponent,
        ModelComplexityComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AppFooterModule,
        AppHeaderModule,
        AppSidebarModule,
        AppAsideModule,
        FormsModule,
        AppBreadcrumbModule.forRoot(),
        PerfectScrollbarModule,
        BsDropdownModule.forRoot(),
        TabsModule.forRoot(),
        TooltipModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
