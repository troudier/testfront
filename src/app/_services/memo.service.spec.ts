import { TestBed } from '@angular/core/testing';

import { MemoService } from './memo.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MemoService', () => {
  let service: MemoService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
        HttpClientTestingModule
      ]});
    service = TestBed.inject(MemoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
