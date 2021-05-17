import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampsRequetablesSelect2Component } from './champs-requetables-select2.component';

describe('ChampsRequetablesSelect2Component', () => {
  let component: ChampsRequetablesSelect2Component;
  let fixture: ComponentFixture<ChampsRequetablesSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampsRequetablesSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampsRequetablesSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
