import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelLearningComponent } from './model-learning.component';

describe('ModelLearningComponent', () => {
  let component: ModelLearningComponent;
  let fixture: ComponentFixture<ModelLearningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelLearningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelLearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
