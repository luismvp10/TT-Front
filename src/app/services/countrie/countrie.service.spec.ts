import { TestBed } from '@angular/core/testing';

import { CountrieService } from './countrie.service';

describe('CountrieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CountrieService = TestBed.get(CountrieService);
    expect(service).toBeTruthy();
  });
});
