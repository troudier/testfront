import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationParenteSelect2Component } from './organisation-parente-select2.component';

describe('OrganisationParenteSelect2Component', () => {
  let component: OrganisationParenteSelect2Component;
  let fixture: ComponentFixture<OrganisationParenteSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganisationParenteSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationParenteSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
