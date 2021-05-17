import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MemoService} from '../../_services/memo.service';

@Component({
  selector: 'app-memos',
  templateUrl: './memos.component.html',
  styleUrls: ['./memos.component.scss']
})
export class MemosComponent implements OnInit {

  public memoTerme;
  @Input() personne;
  @Input() persist;
  @Output() changed = new EventEmitter<string>();
  @Input() disabled;
  constructor(
    private memoService: MemoService
  ) {
  }

  ngOnInit(): void {
  }

  addMemo(): void {
      this.memoService.add(this.memoTerme, this.personne.uuid, this.persist).subscribe(
        data => {
          this.personne.memos.unshift(data);
        },
        err => {
        }
      );
  }
}
