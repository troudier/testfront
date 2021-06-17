import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {EvenementService} from '../_services/evenement.service';
import * as moment from 'moment';

@Component({
    selector: 'app-liste-evenements',
    templateUrl: './liste-evenements.component.html',
    styleUrls: ['./liste-evenements.component.scss']
})
export class ListeEvenementsComponent implements OnInit {
    @Input() uuid;
    @Input() personne;
    public events;
    private notifier: NotifierService;
    public enRetard;
    public current = moment().format('DD/MM/YYYY');
    public moment = moment().locale('fr_FR');

    public statuts = [
        'planifie',
        'aujourdhui',
        'enRetard',
        'termine'
    ];

    constructor(
        public evenementService: EvenementService,
        private router: Router,
        private route: ActivatedRoute,
        notifier: NotifierService
    ) {
        this.notifier = notifier;
    }

    ngOnInit(): void {
        this.getListeEvenements();
    }

    getListeEvenements(): void {
        this.evenementService.getListeEvenements(this.uuid).subscribe(
            events => {
                events.forEach(evenement => {
                    evenement.moisEcheance = moment(evenement.dateEcheance).locale('fr_FR').format('MMMM');
                    if (moment(evenement.dateEcheance).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')) {
                        evenement.aujourdhui = true;
                        evenement.enRetard = false;
                        evenement.planifie = false;
                        evenement.etat = 'aujourdhui';
                    }
                    if (moment(evenement.dateEcheance).format('DD/MM/YYYY HH:mm') < moment().format('DD/MM/YYYY HH:mm')) {
                        evenement.enRetard = true;
                        evenement.planifie = false;
                        evenement.aujourdhui = false;
                        evenement.etat = 'en_retard';
                        // @ts-ignore
                        const d = moment().locale('fr_FR').diff(moment(evenement.dateEcheance).locale('fr_FR'), 'days');
                        const h = moment().locale('fr_FR').diff(moment(evenement.dateEcheance).locale('fr_FR'), 'hours');
                        const m = moment().locale('fr_FR').diff(moment(evenement.dateEcheance).locale('fr_FR'), 'minutes');
                        const s = moment().locale('fr_FR').diff(moment(evenement.dateEcheance).locale('fr_FR'), 'seconds');

                        if (d > 0) {
                            evenement.dateEcheanceCalc = d + ' jours';
                            if (d <= 1) {
                                evenement.dateEcheanceCalc = d + ' jour';
                            }
                        } else if (h > 0) {
                            evenement.dateEcheanceCalc = h + ' heures';
                            if (h <= 1) {
                                evenement.dateEcheanceCalc = h + ' heure';
                            }
                        } else if (m > 0) {
                            evenement.dateEcheanceCalc = m + ' minutes';
                            if (m <= 1) {
                                evenement.dateEcheanceCalc = m + ' minute';
                            }
                        } else if (s > 0) {
                            evenement.dateEcheanceCalc = s + ' secondes';
                            if (s <= 1) {
                                evenement.dateEcheanceCalc = s + ' seconde';
                            }
                        }
                    }
                    if (moment(evenement.dateEcheance).format('DD/MM/YYYY') > moment().format('DD/MM/YYYY')) {
                        evenement.planifie = true;
                        evenement.enRetard = false;
                        evenement.aujourdhui = false;
                        evenement.etat = 'planifie';
                    }
                    if (evenement.statut === 2) {
                        evenement.etat = 'fait';
                    }
                });
                this.events = events;
            }
        );
    }

    public reload(): void {
        this.getListeEvenements();
    }
}
