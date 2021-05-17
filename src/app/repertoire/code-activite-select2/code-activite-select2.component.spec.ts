import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeActiviteSelect2Component } from './code-activite-select2.component';

describe('CodeActiviteSelect2Component', () => {
  let component: CodeActiviteSelect2Component;
  let fixture: ComponentFixture<CodeActiviteSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeActiviteSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeActiviteSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
