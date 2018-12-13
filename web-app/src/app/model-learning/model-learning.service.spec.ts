import { TestBed } from '@angular/core/testing';

import { ModelLearningService } from './model-learning.service';

describe('ModelLearningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModelLearningService = TestBed.get(ModelLearningService);
    expect(service).toBeTruthy();
  });
});
