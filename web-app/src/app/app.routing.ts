import {NgModule} from '@angular/core';
import {Routes, RouterModule, ExtraOptions} from '@angular/router';
import {ModelLearningComponent} from './model-learning/model-learning.component';
import {DataExplorationComponent} from './data-exploration/data-exploration.component';
import {ModelComplexityComponent} from './model-complexity/model-complexity.component';
import {HomeComponent} from './home/home.component';

// Import Containers

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'model-learning',
        component: ModelLearningComponent,
    },
    {
        path: 'model-complexity',
        component: ModelComplexityComponent,
    },
    {
        path: 'data-exploration',
        component: DataExplorationComponent,
    },
];

const config: ExtraOptions = {
    enableTracing: false,
    useHash: true,
};

@NgModule({
    imports: [RouterModule.forRoot(routes, config)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
