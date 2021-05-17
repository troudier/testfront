import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperateursSelect2Component } from './operateurs-select2.component';

describe('OperateursSelect2Component', () => {
  let component: OperateursSelect2Component;
  let fixture: ComponentFixture<OperateursSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperateursSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperateursSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
