import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataExplorationChartComponent } from './data-exploration-chart.component';

describe('DataExplorationChartComponent', () => {
  let component: DataExplorationChartComponent;
  let fixture: ComponentFixture<DataExplorationChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataExplorationChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataExplorationChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
