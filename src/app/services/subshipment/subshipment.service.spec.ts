import { TestBed } from '@angular/core/testing';

import { SubshipmentService } from './subshipment.service';

describe('SubshipmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubshipmentService = TestBed.get(SubshipmentService);
    expect(service).toBeTruthy();
  });
});
