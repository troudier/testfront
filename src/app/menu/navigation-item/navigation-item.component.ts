import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss']
})
export class NavigationItemComponent implements OnInit {
  @Input()
  className;
  @Input()
  faIconName;
  @Input()
  route;

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

}
