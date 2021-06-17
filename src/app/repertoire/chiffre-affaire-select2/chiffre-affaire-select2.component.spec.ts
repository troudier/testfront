import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiffreAffaireSelect2Component } from './chiffre-affaire-select2.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('ChiffreAffaireSelect2Component', () => {
  let component: ChiffreAffaireSelect2Component;
  let fixture: ComponentFixture<ChiffreAffaireSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChiffreAffaireSelect2Component ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiffreAffaireSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
