import { TestBed } from '@angular/core/testing';

import { UpsellLastEntitesService } from './upsell-last-entites.service';

describe('UpsellLastEntitesService', () => {
  let service: UpsellLastEntitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpsellLastEntitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
