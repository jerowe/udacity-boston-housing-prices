import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelComplexityComponent } from './model-complexity.component';

describe('ModelComplexityComponent', () => {
  let component: ModelComplexityComponent;
  let fixture: ComponentFixture<ModelComplexityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelComplexityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelComplexityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
