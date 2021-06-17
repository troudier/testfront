import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemosComponent } from './memos.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MemosComponent', () => {
  let component: MemosComponent;
  let fixture: ComponentFixture<MemosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemosComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
