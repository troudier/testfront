import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionStickerComponent } from './fonction-sticker.component';

describe('FonctionComponent', () => {
  let component: FonctionStickerComponent;
  let fixture: ComponentFixture<FonctionStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FonctionStickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FonctionStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
