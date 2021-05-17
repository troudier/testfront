import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';
import {ModalService} from '../../_modal';

@Component({
    selector: 'app-adresses',
    templateUrl: './adresses.component.html',
    styleUrls: ['./adresses.component.scss']
})
export class AdressesComponent implements OnInit {
    @Input() uuid;
    @Output() valeursEvent = new EventEmitter<object>();
    public adresses;
    public objetCourant;

    constructor(
        private personneService: PersonneService,
        private modalService: ModalService
    ) {
    }

    ngOnInit(): void {
        this.personneService.getAdresses(this.uuid).subscribe(
            data => {
                this.adresses = data;
                this.valeursEvent.emit(this.adresses);
            },
            err => {
                console.log(err);
            }
        );
    }

    onChangeRadio(uuid): void {
        this.adresses.map((item) => {
            item.principal = item.uuid == uuid;
        });
        this.valeursEvent.emit(this.adresses);
    }

    onEditer(adresse): void {
        this.objetCourant = adresse;
        this.openModal('adresseEditModal');
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    onSupprimer(uuid): void {
        this.adresses = this.adresses.filter(obj => obj.uuid !== uuid);
        this.valeursEvent.emit(this.adresses);
    }

    addAdresses($event): void {
        if (this.adresses) {
            this.adresses.push($event.data);
        } else {
            this.adresses = [$event.data];
        }
        console.log(this.adresses);
    }
    close(): void{
        this.objetCourant = {
            principal: false,
            type: '',
            ligne1: '',
            ligne2: '',
            ligne3: '',
            cp: '',
            cedexCode: '',
            cedexLibelle: '',
            ville: '',
            pays: '',
            uuid: new Date().getTime()
        };
    }
    onAjouter(idModal): void{
        this.objetCourant = {
            principal: false,
            type: '',
            ligne1: '',
            ligne2: '',
            ligne3: '',
            cp: '',
            cedexCode: '',
            cedexLibelle: '',
            ville: '',
            pays: '',
            uuid: new Date().getTime()
        };
        this.modalService.open(idModal);
    }
}
