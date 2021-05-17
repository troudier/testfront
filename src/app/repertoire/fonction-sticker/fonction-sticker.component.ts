import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-fonction-sticker',
  templateUrl: './fonction-sticker.component.html',
  styleUrls: ['./fonction-sticker.component.scss']
})
export class FonctionStickerComponent implements OnInit {
  @Input()
  statut;
  constructor() { }

  ngOnInit(): void {
  }

}
