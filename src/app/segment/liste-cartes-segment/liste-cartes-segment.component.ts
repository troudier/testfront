import {Component, OnInit} from '@angular/core';
import {SegmentService} from '../../_services/segment.service';

@Component({
    selector: 'app-liste-cartes-segment',
    templateUrl: './liste-cartes-segment.component.html',
    styleUrls: ['./liste-cartes-segment.component.scss']
})

export class ListeCartesSegmentComponent implements OnInit {

    errorMessage = '';
    segments;
    offset = 0;
    limit = 20;
    recherche = '';
    private finListe = false;
    private rechercheEnCours = false;
    constructor(
        private segmentService: SegmentService
    ) {
    }

    ngOnInit(): void {
        this.segmentService.getSegmentsListe(
            this.offset.toString(),
            this.limit.toString(),
            this.recherche
        ).subscribe(
            data => {
                this.segments = data;
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }

    onScroll(): void {
        if (!this.rechercheEnCours && !this.finListe) {
            this.rechercheEnCours = true;
            this.offset = this.offset + this.limit;
            this.segmentService.getSegmentsListe(
                this.offset.toString(),
                this.limit.toString(),
                this.recherche
            ).subscribe(data => {
                    this.finListe = data.length === 0;
                    data.map((item) => this.segments.push(item));
                    this.rechercheEnCours = false;
                },
                err => {
                    this.errorMessage = err.error.message;
                }
            );
        }
    }

    onRecherche(recherche): void {
        this.recherche = recherche;
        this.offset = 0;
        this.segmentService.getSegmentsListe(
            this.offset.toString(),
            this.limit.toString(),
            this.recherche
        ).subscribe(data => {
                this.segments = [];
                data.map((item) => this.segments.push(item));
                this.offset = this.offset + this.limit;
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }
}
