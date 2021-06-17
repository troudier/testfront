import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrigineSelect2Component } from './origine-select2.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OrigineSelect2Component', () => {
  let component: OrigineSelect2Component;
  let fixture: ComponentFixture<OrigineSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrigineSelect2Component ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrigineSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
