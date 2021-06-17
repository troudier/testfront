import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-onglet',
    templateUrl: './onglet.component.html',
    styleUrls: ['./onglet.component.scss']
})
export class OngletComponent implements OnInit {

    @Input() data;
    @Input() active;
    @Output() ongletEvent = new EventEmitter<string>();
    public libelles;

    constructor(
        private location: Location,
        public router: Router,
    ) {
    }

    ngOnInit(): void {
        this.libelles = [];
        if (this.data) {
            this.data.forEach((value) => {
                console.log(value.type);
            });
            this.data.map((item) => {
                let donnee = '';
                if (item.type === 'physique') {
                    donnee = item.prenom + ' ' + item.nom;
                } else {
                    donnee = item.fonction + ' (' + item.raisonSociale + ')';
                }
                this.libelles.push({
                    uuid: item.uuid,
                    libelle: donnee
                });
            });
        }

    }

    public changeOnglet(uuid: string): void {
        this.ongletEvent.emit(uuid);
        this.active = uuid;
        this.location.replaceState('/repertoire/' + uuid);
    }

    addFonction(uuid): void {
        let donnee = '';
        this.data.map((item) => {
            if (item.uuid === uuid) {
                donnee = item.prenom + ' ' + item.nom;
            }

        });
        window.sessionStorage.setItem(uuid, donnee);
        this.router.navigateByUrl('/repertoire/creer/fonction/physique/' + uuid);
    }
}
