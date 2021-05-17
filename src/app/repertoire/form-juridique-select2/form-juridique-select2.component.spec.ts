import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormJuridiqueSelect2Component } from './form-juridique-select2.component';

describe('PersonnesMoraleSelect2Component', () => {
  let component: FormJuridiqueSelect2Component;
  let fixture: ComponentFixture<FormJuridiqueSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormJuridiqueSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormJuridiqueSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
