import { TestBed } from '@angular/core/testing';

import { UpsellLastEntitesService } from './upsell-last-entites.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('UpsellLastEntitesService', () => {
  let service: UpsellLastEntitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [
      RouterTestingModule,
    ]});
    service = TestBed.inject(UpsellLastEntitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
