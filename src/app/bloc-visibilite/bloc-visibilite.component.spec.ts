import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocVisibiliteComponent } from './bloc-visibilite.component';

describe('BlocVisibiliteComponent', () => {
  let component: BlocVisibiliteComponent;
  let fixture: ComponentFixture<BlocVisibiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocVisibiliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlocVisibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
