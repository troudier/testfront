import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectifSelect2Component } from './effectif-select2.component';

describe('EffectifSelect2Component', () => {
  let component: EffectifSelect2Component;
  let fixture: ComponentFixture<EffectifSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffectifSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EffectifSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
