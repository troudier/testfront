import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {SegmentService} from '../../_services/segment.service';
import {FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-fiche-edit-segment-filtres',
    templateUrl: './fiche-edit-segment-filtres.component.html',
    styleUrls: ['./fiche-edit-segment-filtres.component.scss']
})
export class FicheEditSegmentFiltresComponent implements OnInit {

    @Input() filtres;
    @Input() form;
    @Input() uuid;
    @Input() nbContacts;
    @Output() recalculer = new EventEmitter<string>();
    @Output() showResultat = new EventEmitter<string>();
    @Input() showCalculer;
    public toRecalculer = [];
    public nbValeurs = [];
    public afficheValeur = [];

    constructor(
        private formBuilder: FormBuilder,
        private segmentService: SegmentService
    ) {
    }

    ngOnInit(): void {
        if (this.filtres) {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < Object.keys(this.filtres).length; i++) {
                this.toRecalculer.push(false);
                this.afficheValeur.push(true);
            }
            this.segmentService.getSegmentCountList(
                this.uuid
            ).subscribe(
                data => {
                    this.nbContacts = data;
                    this.showCalculer = false;

                },
                err => {
                }
            );
        }
    }

    onClickChamp(index): void {
        this.afficheValeur[index] = false;
    }

    onChangedSelect2($event, id, type, index): void {
        Object.keys(this.form.controls.filtres.value).map((key) => {
            if (this.form.controls.filtres.value[key].uuid === id) {
                if (this.form.controls.filtres && this.form.controls.filtres.value[key][type].uuid !== $event.uuid) {
                    this.showCalculer = true;
                    this.showResultat.emit();
                    this.showDeprecie(index);
                    this.afficheValeur[index] = true;
                }
                this.form.controls.filtres.value[key][type].uuid = $event.uuid;
                this.form.controls.filtres.value[key][type].type = $event.type;
                this.form.controls.filtres.value[key][type].libelle = $event.libelle;
            }
        });
        if (this.form.controls[id]) {
        } else {
            this.form.addControl(id, this.formBuilder.control({}));
        }
    }

    onChangedSelect2Operateur($event, id, type, index): void {
        this.nbValeurs[index] = $event.nbValeurs;
        Object.keys(this.form.controls.filtres.value).map((key) => {
            if (this.form.controls.filtres.value[key].uuid === id) {
                if (this.form.controls.filtres && this.form.controls.filtres.value[key][type].uuid !== $event.event) {
                    this.showCalculer = true;
                    this.showResultat.emit();
                    this.showDeprecie(index);
                    this.afficheValeur[index] = true;
                }
                this.form.controls.filtres.value[key][type].uuid = $event.event;
            }
        });
        if (this.form.controls[id]) {
        } else {
            this.form.addControl(id, this.formBuilder.control({}));
        }

    }

    onSupprimer(uuid, index): void {
        this.showCalculer = true;
        this.showResultat.emit();
        this.showDeprecie(index);
        Object.keys(this.filtres).map((key) => {
            if (this.filtres[key].uuid === uuid) {
                delete this.filtres[key];
            } else if (key > index) {
                this.filtres[key].ordre = this.filtres[key].ordre - 1;
                // @ts-ignore
                this.filtres[key - 1] = this.filtres[key];
                delete this.filtres[key];
            }
        });
    }

    calculate(uuid): void {
        this.showCalculer = false;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < Object.keys(this.filtres).length; i++) {
            this.toRecalculer[i] = false;
        }
        this.recalculer.emit(uuid);
    }

    showRecalculer(index): void {
        this.showCalculer = true;
        this.showResultat.emit();
        this.showDeprecie(index);
    }

    showDeprecie(index): void {
        this.toRecalculer.map((item, i) => {
            if (i >= index) {
                this.toRecalculer[i] = true;
            }
        });
    }

    ajouterChamp(): void {
        const squelette = {
            uuid: Date.now(),
            champ: {
                libelle: '',
                uuid: ''
            },
            operateur: {
                libelle: '',
                uuid: ''
            },
            valeurs: []
        };
        if (!this.filtres) {
            this.filtres = {};
            this.form.addControl('filtres', this.formBuilder.control({}));
            this.form.controls.filtres.value = {};
            this.form.controls.filtres.value[1] = squelette;
            this.filtres[0] = squelette;
            this.toRecalculer.push(false);
            this.afficheValeur.push(false);
        } else {
            const index = Object.keys(this.filtres).length + 1;
            this.filtres[index] = squelette;
        }
    }
}
