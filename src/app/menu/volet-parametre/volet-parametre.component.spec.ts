import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoletParametreComponent } from './volet-parametre.component';

describe('VoletParametreComponent', () => {
  let component: VoletParametreComponent;
  let fixture: ComponentFixture<VoletParametreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoletParametreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoletParametreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
