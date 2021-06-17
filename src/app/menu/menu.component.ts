import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
    faHome,
    faAddressCard,
    faFilter,
    faEnvelope,
    faFileSignature,
    faChartLine,
    faExclamationCircle,
    faBell,
    faPowerOff
} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {UpsellLastEntitesService} from '../_services/upsell-last-entites.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
    @Input() personneConnecte: any;
    @Input() position: any;
    @Output() ongletEvent = new EventEmitter<string>();

    constructor(
        public router: Router,
        public upsellLastEntity: UpsellLastEntitesService,
) {
    }

    faHome = faHome;
    faAddressCard = faAddressCard;
    faFilter = faFilter;
    faEnvelope = faEnvelope;
    faFileSignature = faFileSignature;
    faChartLine = faChartLine;
    faExclamationCircle = faExclamationCircle;
    faBell = faBell;
    faPowerOff = faPowerOff;
    public lastItems;

    ngOnInit(): void {
        this.upsellLastEntity.getItems().subscribe((item) => {
            this.lastItems = JSON.parse(item);
        });
    }

    // ouvre et ferme le volet sur le click de l'avatar dans le menu
    actionVolet(): void {
        const voletParametre = document.getElementById('voletParametre');
        if (voletParametre.classList.contains('ouvert')) {
            voletParametre.classList.remove('ouvert');
        } else {
            voletParametre.classList.add('ouvert');
        }
    }

    onClickUpsellLastEntities(lastItem): void {
        // this.router.navigate(['/repertoire/' + lastItem]);
        // TODO : ne marche pas sans le reload à voir
        this.router.navigate(['/repertoire/' + lastItem]).then(() => {
            window.location.reload();
        });
    }
}
