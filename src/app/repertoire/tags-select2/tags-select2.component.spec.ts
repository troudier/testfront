import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsSelect2Component } from './tags-select2.component';

describe('TagsSelect2Component', () => {
  let component: TagsSelect2Component;
  let fixture: ComponentFixture<TagsSelect2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsSelect2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsSelect2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
