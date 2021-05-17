import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectDynamiqueComponent } from './select-dynamique.component';

describe('SelectDynamiqueComponent', () => {
  let component: SelectDynamiqueComponent;
  let fixture: ComponentFixture<SelectDynamiqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectDynamiqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectDynamiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
