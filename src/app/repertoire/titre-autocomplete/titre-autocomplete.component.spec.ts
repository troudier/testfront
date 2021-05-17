import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitreAutocompleteComponent } from './titre-autocomplete.component';

describe('TitreAutocompleteComponent', () => {
  let component: TitreAutocompleteComponent;
  let fixture: ComponentFixture<TitreAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TitreAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitreAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
