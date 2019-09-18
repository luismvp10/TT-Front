import { TestBed, async, inject } from '@angular/core/testing';

import { IsSpecialistGuard } from './is-specialist.guard';

describe('IsSpecialistGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSpecialistGuard]
    });
  });

  it('should ...', inject([IsSpecialistGuard], (guard: IsSpecialistGuard) => {
    expect(guard).toBeTruthy();
  }));
});
