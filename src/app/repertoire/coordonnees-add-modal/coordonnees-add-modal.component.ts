import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Options} from 'ts-node';

@Component({
    selector: 'app-coordonnees-add-modal',
    templateUrl: './coordonnees-add-modal.component.html',
    styleUrls: ['./coordonnees-add-modal.component.scss']
})
export class CoordonneesAddModalComponent implements OnInit {
    public typesCoordoonees;
    public options: Options;
    public choix = 0;
    public typeCourant;
    public objetCourant;
    @Input() idModal;
    @Output() added = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit(): void {
        this.objetCourant = {
            principal: false,
            type: '',
            valeur: '',
            uuid: new Date().getTime()
        };
        this.typesCoordoonees = [
            {
                id: 1,
                text: ''
            },
            {
                id: 2,
                text: 'E-Mail',
                value: 'email'
            },
            {
                id: 3,
                text: 'Site',
                value: 'site'
            },
            {
                id: 4,
                text: 'Téléphone',
                value: 'telephone'
            },
            {
                id: 5,
                text: 'Fax',
                value: 'fax'
            }
        ];
    }

    chooseCoordonnee($event): void {
        this.choix = $event;
        this.typesCoordoonees.map((item) => {
            if (item.id == $event) {
                this.typeCourant = item.value;
            }
        });
        console.log(this.typeCourant);
    }

    addCoordonnee($event): void {
        this.choix = 0;
        this.objetCourant = {
            principal: false,
            type: '',
            valeur: '',
            uuid: new Date().getTime()
        };
        this.added.emit($event);
    }
    close(): void{
        this.choix = 0;
        this.objetCourant = {
            principal: false,
            type: '',
            valeur: '',
            uuid: new Date().getTime()
        };
    }
}
