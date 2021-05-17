import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionPersonneSelect2Component } from './fonction-personne-select2.component';

describe('FonctionPersonneSelect2Component', () => {
  let component: FonctionPersonneSelect2Component;
  let fixture: ComponentFixture<FonctionPersonneSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FonctionPersonneSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FonctionPersonneSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
