import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectifSelect2Component } from './effectif-select2.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('EffectifSelect2Component', () => {
  let component: EffectifSelect2Component;
  let fixture: ComponentFixture<EffectifSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EffectifSelect2Component ],
      imports: [
        HttpClientTestingModule
      ]
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
