import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatutSelect2Component } from './statut-select2.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('StatutSelect2Component', () => {
  let component: StatutSelect2Component;
  let fixture: ComponentFixture<StatutSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatutSelect2Component ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatutSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
