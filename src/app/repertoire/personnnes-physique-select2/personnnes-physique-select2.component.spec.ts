import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnnesPhysiqueSelect2Component } from './personnnes-physique-select2.component';

describe('PersonnnesPhysiqueSelect2Component', () => {
  let component: PersonnnesPhysiqueSelect2Component;
  let fixture: ComponentFixture<PersonnnesPhysiqueSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnnesPhysiqueSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnnesPhysiqueSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
