import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.scss']
})
export class RepertoireComponent implements OnInit {



  constructor(
    public router: Router,
    public route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
  }


}
