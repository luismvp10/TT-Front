import { TestBed, async, inject } from '@angular/core/testing';

import { IsAdministratorGuard } from './is-administrator.guard';

describe('IsAdministratorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsAdministratorGuard]
    });
  });

  it('should ...', inject([IsAdministratorGuard], (guard: IsAdministratorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
