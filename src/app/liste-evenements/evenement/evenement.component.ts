import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {EvenementService} from '../../_services/evenement.service';
import {Router} from '@angular/router';
import * as moment from 'moment';
import {NotifierService} from 'angular-notifier';
import {ModalService} from '../../_modal';
import {ExceptionService} from '../../_services/exception.service';

@Component({
    selector: 'app-evenement',
    templateUrl: './evenement.component.html',
    styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {

    @Input() events;
    @Input() personne;
    @Input() statut;
    @Input() uuid;
    @Output() reload = new EventEmitter<string>();
    @Output() closed = new EventEmitter<any>();
    public event;
    public uuidEvent;
    public index;

    public current = moment().format('DD/MM/YYYY');
    public moment = moment().locale('fr_FR');
    private notifier: NotifierService;


    constructor(
        public evenementService: EvenementService,
        private router: Router,
        private modalService: ModalService,
        private exceptionService: ExceptionService,
        notifier: NotifierService
    ) {
        this.notifier = notifier;
    }

    ngOnInit(): void {
    }

    modifierEvenement(uuidEvent): void {
        this.router.navigate(['repertoire/modifier/evenement/' + uuidEvent + '/' + this.personne.uuid]);
    }

    desactiveEvenement(): void {
        this.evenementService.desactiveEvenement(this.uuidEvent).subscribe(
            data => {
                if (this.events.uuid === this.uuidEvent) {
                    this.events.actif = 0;
                    Object.keys(this.events).map(key => {
                        if (this.events[key] === this.index) {
                            delete this.events[key];
                        } else if (key > this.index) {
                            // @ts-ignore
                            this.events[key - 1] = this.events[key];
                            delete this.events[key];
                        }
                    });
                    this.events.pop();
                    this.closeModal('desactiveModalEvent');
                }
                this.reload.emit('reload');
                this.showNotification('warning', 'L\'évenement vient d\'être supprimé !');
            },
            err => {
                this.showNotification('error', this.exceptionService.statutErreur(err));
            });
        this.closeModal('desactiveModalEvent');
    }

    validerEvenement(): void {
        this.evenementService.validerEvenement(this.uuidEvent).subscribe(
            data => {
                if (this.events.uuid === this.uuidEvent) {
                    this.events.statut = 4;
                }
                this.reload.emit('reload');
                this.showNotification('success', 'L\'évenement vient d\'être validé !');
            },
            err => {
                this.showNotification('error', this.exceptionService.statutErreur(err));
            });
        this.closeModal('validateModalEvent');
    }

    public showNotification(type: string, message: string): void {
        this.notifier.notify(type, message);
    }

    openModal(id: string, event, index): void {
        this.event = event;
        this.index = index;
        this.uuidEvent = event.uuid;
        this.modalService.open(id);
    }

    closeModal(idModal): void {
        this.closed.emit(true);
        this.modalService.close(idModal);
    }

    getFormatFullDate(date): string {
        return moment(date).format('dd/MM/yyyy');
    }
}
