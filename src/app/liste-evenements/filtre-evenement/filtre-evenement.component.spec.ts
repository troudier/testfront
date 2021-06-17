import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltreEvenementComponent } from './filtre-evenement.component';

describe('FiltreEvenementComponent', () => {
  let component: FiltreEvenementComponent;
  let fixture: ComponentFixture<FiltreEvenementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FiltreEvenementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltreEvenementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
