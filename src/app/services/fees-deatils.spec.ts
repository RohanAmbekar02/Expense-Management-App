import { TestBed } from '@angular/core/testing';

import { FeesDeatils } from './fees-deatils';

describe('FeesDeatils', () => {
  let service: FeesDeatils;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeesDeatils);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
