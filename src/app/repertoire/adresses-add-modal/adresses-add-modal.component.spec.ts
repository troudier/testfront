import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressesAddModalComponent } from './adresses-add-modal.component';

describe('AdressesAddModalComponent', () => {
  let component: AdressesAddModalComponent;
  let fixture: ComponentFixture<AdressesAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdressesAddModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressesAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
