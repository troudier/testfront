import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-segment',
  templateUrl: './segment.component.html',
  styleUrls: ['./segment.component.scss']
})
export class SegmentComponent implements OnInit {
  constructor(
      public router: Router,
      public route: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
  }

}
