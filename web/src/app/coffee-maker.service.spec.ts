import { TestBed } from '@angular/core/testing';

import { CoffeeMakerService } from './coffee-maker.service';

describe('CoffeeMakerService', () => {
  let service: CoffeeMakerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoffeeMakerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
