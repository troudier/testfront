import { TestBed } from '@angular/core/testing';

import { FilArianeService } from './fil-ariane.service';

describe('FilArianeService', () => {
  let service: FilArianeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilArianeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
