import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {IFilAriane} from './fil-ariane.interface';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';
import {FilArianeService} from '../../_services/fil-ariane.service';

@Component({
  selector: 'app-fil-ariane',
  templateUrl: './fil-ariane.component.html',
  styleUrls: ['./fil-ariane.component.scss']
})
export class FilArianeComponent implements OnInit, AfterViewInit {

  public filArianes: IFilAriane[];
  subscription: Subscription;
  libelle: string;
  isDynamic = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private filArianeService: FilArianeService,
    private cd: ChangeDetectorRef
  ) {     this.subscription = this.filArianeService.libelleCourrant.subscribe(libelle => this.libelle = libelle);
  }

  ngOnInit(): void {
    this.subscription = this.filArianeService.libelleCourrant.subscribe(libelle => this.libelle = libelle);
    this.filArianes = this.buildFilAriaine(this.activatedRoute.root);
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  public buildFilAriaine(route: ActivatedRoute, url: string = '', filArianes: IFilAriane[] = []): IFilAriane[] {
    let label = route.routeConfig && route.routeConfig.data ? route.routeConfig.data.ariane : '';
    let path = route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';
    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    this.isDynamic = isDynamicRoute;
    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = this.libelle;
    }
    const nextUrl = path ? `${url}/${path}` : url;

    const filAriane: IFilAriane = {
      label,
      url: nextUrl,
    };
    const newFilArianes = filAriane.label ? [ ...filArianes, filAriane ] : [ ...filArianes];
    if (route.firstChild) {
      return this.buildFilAriaine(route.firstChild, nextUrl, newFilArianes);
    }
    return newFilArianes;
  }

}
