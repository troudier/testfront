import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionSelect2Component } from './fonction-select2.component';

describe('FonctionSelect2Component', () => {
  let component: FonctionSelect2Component;
  let fixture: ComponentFixture<FonctionSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FonctionSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FonctionSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
