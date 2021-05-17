import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampsPersonalisesComponent } from './champs-personalises.component';

describe('ChampsPersonalisesComponent', () => {
  let component: ChampsPersonalisesComponent;
  let fixture: ComponentFixture<ChampsPersonalisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChampsPersonalisesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChampsPersonalisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
