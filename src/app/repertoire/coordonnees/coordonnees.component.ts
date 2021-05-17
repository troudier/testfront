import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';
import {ModalService} from '../../_modal';

@Component({
    selector: 'app-coordonnees',
    templateUrl: './coordonnees.component.html',
    styleUrls: ['./coordonnees.component.scss']
})
export class CoordonneesComponent implements OnInit {
    @Input() uuid;
    @Output() valeursEvent = new EventEmitter<object>();
    public coordonnees;
    public objetCourant;
    public typeCourant;

    constructor(
        private personneService: PersonneService,
        private modalService: ModalService
    ) {
    }

    ngOnInit(): void {
        this.personneService.getCoordonnees(this.uuid).subscribe(
            data => {
                this.coordonnees = data;
                this.valeursEvent.emit(this.coordonnees);
            },
            err => {
                console.log(err);
            }
        );
    }

    onSupprimer(uuid, entite): void {
        this.coordonnees[entite] = this.coordonnees[entite].filter(obj => obj.uuid !== uuid);
        this.valeursEvent.emit(this.coordonnees);
    }

    onEditer(item, type): void {
        this.objetCourant = item;
        this.typeCourant = type;
        this.openModal('editModal');
    }

    onChangeRadio(uuid, type): void {
        this.coordonnees[type].map((item) => {
                item.principal = item.uuid == uuid;
        });
        this.valeursEvent.emit(this.coordonnees);
    }

    openModal(id: string): void {
        this.modalService.open(id);
    }

    addCoordonnee($event): void {
        if (this.coordonnees[$event.type]) {
            this.coordonnees[$event.type].push($event.data);
        } else {
            this.coordonnees[$event.type] = [$event.data];

        }
    }
}
