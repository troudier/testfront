import {Component, Input, OnInit} from '@angular/core';
import {
    faSearch,
    faArrowRight,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {SegmentService} from '../../_services/segment.service';

@Component({
    selector: 'app-segment-carte',
    templateUrl: './carte-segment.component.html',
    styleUrls: ['./carte-segment.component.scss']
})
export class CarteSegmentComponent implements OnInit {
    @Input()
    segment;

    faSearch = faSearch;
    faArrowRight = faArrowRight;
    faExclamationCircle = faExclamationCircle;
    public resultats;

    constructor(        private segmentService: SegmentService,
                        public router: Router
    ) {
    }

    ngOnInit(): void {
    }

    openFiche(uuid): void {
        this.router.navigateByUrl('segment/' + uuid, {state: this.segment});
    }

    export(uuid): void {
        console.log(uuid);
    }

    calculate(uuid): void {
        this.getResultats(uuid);
    }

    /* Récupère la liste des résultats du segment */
    getResultats(uuid: string): void {
        this.segmentService.getSegmentResultats(
            uuid
        ).subscribe(
            data => {
                this.resultats = data.resultats;
                this.segment.nbContactsPublics = data.count.public;
                this.segment.nbContactsPrives = data.count.prive;
            },
            err => {
            }
        );
    }

}
