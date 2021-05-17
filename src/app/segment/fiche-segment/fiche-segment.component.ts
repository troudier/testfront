import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {FilArianeService} from '../../_services/fil-ariane.service';
import {SegmentService} from '../../_services/segment.service';

@Component({
    selector: 'app-fiche',
    templateUrl: './fiche-segment.component.html',
    styleUrls: ['./fiche-segment.component.scss']
})
export class FicheSegmentComponent implements OnInit, OnDestroy {
    public libelle: string;
    private subscription: Subscription;
    private errorMessage = '';
    private uuid = '';
    public personne;
    public onglets;
    public tags;
    public disabled = false;
    public segment;
    public resultats;
    public nbResultats;
    constructor(
        private segmentService: SegmentService,
        private route: ActivatedRoute,
        private filArianeService: FilArianeService,
        private router: Router
    ) {
        this.subscription = this.filArianeService.libelleCourrant.subscribe(libelle => this.libelle = libelle);
        if (this.router.getCurrentNavigation() && this.router.getCurrentNavigation().extras.state) {
            this.filArianeService.changeLibelle(this.libelle);
        }
    }

    ngOnInit(): void {
        this.tags = [];
        this.onglets = [];
        this.personne = '';
        this.subscription = this.filArianeService.libelleCourrant.subscribe(libelle => this.libelle = libelle);
        this.getData(this.route.snapshot.params.id);

    }

    ngOnDestroy(): void {
        this.filArianeService.changeLibelle('');
        this.subscription.unsubscribe();
    }

    /* Récupère les données d'une fiche */
    getData(uuid): void {
        this.segmentService.getSegment(
            uuid
        ).subscribe(
            data => {
                this.segment = data;
                this.getResultats(this.route.snapshot.params.id);
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }

    /* Récupère la liste des résultats du segment */
    getResultats(uuid: string): void {
        this.segmentService.getSegmentResultats(
            uuid
        ).subscribe(
            data => {
                this.resultats = data.resultats;
                this.segment.nbContacts = data.count;
                this.nbResultats =  data.count;
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }


    toModifier(uuid): void {
        this.router.navigate(['/segment/modifier/' + uuid]);
    }

    actualiser(uuid): void {
        this.getResultats(uuid);
    }

    isInstanceOf(candidat): string {
        return typeof candidat;
    }
}
