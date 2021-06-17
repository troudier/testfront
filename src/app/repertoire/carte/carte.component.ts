import {Component, Input, OnInit} from '@angular/core';
import {
    faUserAlt,
    faBuilding,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {UpsellLastEntitesService} from '../../_services/upsell-last-entites.service';

@Component({
    selector: 'app-repertoire-carte',
    templateUrl: './carte.component.html',
    styleUrls: ['./carte.component.scss']
})

export class CarteComponent implements OnInit {
    @Input() personne;
    faUserAlt = faUserAlt;
    faBuilding = faBuilding;
    faExclamationCircle = faExclamationCircle;

    constructor(
        public router: Router,
        private upsellLastEntity: UpsellLastEntitesService
    ) {
    }

    ngOnInit(): void {
    }

    openFiche(uuid): void {
        this.upsellLastEntity.setItem(uuid, this.personne);
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['repertoire/' + uuid]);
    }
}
