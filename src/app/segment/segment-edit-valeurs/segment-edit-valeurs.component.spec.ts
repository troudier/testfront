import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegmentEditValeursComponent } from './segment-edit-valeurs.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SegmentEditValeursComponent', () => {
  let component: SegmentEditValeursComponent;
  let fixture: ComponentFixture<SegmentEditValeursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SegmentEditValeursComponent ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SegmentEditValeursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
