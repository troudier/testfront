import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonneService} from '../_services/personne.service';
import {Observable} from 'rxjs';
import {Select2OptionData} from 'ng-select2';
import {Options} from 'ts-node';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-champs-personalises',
    templateUrl: './champs-personalises.component.html',
    styleUrls: ['./champs-personalises.component.scss']
})
export class ChampsPersonalisesComponent implements OnInit {
    @Input() type;
    @Input() uuid;
    @Input() editForm;
    @Input() formValeurs;
    @Output() valeursEvent = new EventEmitter<object>();

    public form: FormGroup;
    public CheckBoxValeurs = [];
    public listeChamps = [];
    public listeChampsVisibles = [];
    public chargementComplet = false;
    public valeurs = [];
    public options: Options;
    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });

    constructor(
        private formBuilder: FormBuilder,
        private personneService: PersonneService
    ) {
    }

    ngOnInit(): void {
        this.options = {};
        this.data = new Observable(observer => {
            observer.next([]);
            observer.complete();
        });
        this.form = this.formBuilder.group({});
        this.personneService.getPersonneChamps(this.uuid).subscribe(
            data => {
                this.valeurs = data;
                if (data.length) {
                    data.map((item) => {
                        this.formValeurs.push({id: item.uuid, value: item.valeur});
                        this.valeursEvent.emit(this.formValeurs);
                    });
                }
                this.fetchChamps();
            },
            err => {
                console.log(err);
            }
        );
    }

    fetchChamps(): void {
        this.personneService.getChampsDisponbiles(this.type).subscribe(
            data => {
                this.listeChamps = data;
                const selectData = [];
                const textAreaUuids = [];
                const checkBoxUuids = [];
                data.map((item) => {
                        if (item.requis) {
                            this.listeChampsVisibles.push(item);
                        } else if (this.valeurs.length) {
                            this.valeurs.map((valeur) => {
                                if (valeur.uuid === item.uuid) {
                                    this.listeChampsVisibles.push(item);
                                }
                            });
                        }
                        if (item.type === 'textarea') {
                            textAreaUuids.push(item);
                        }
                        if (item.type === 'checkbox') {
                            if (item.valeurs) {
                                const checkBoxValues = item.valeurs.map(val => {
                                    checkBoxUuids.push(item);
                                    const obj = {};
                                    obj[val.id] = false;
                                    if (this.valeurs.length > 0) {
                                        this.valeurs.map((valeur) => {
                                            if (valeur.uuid === item.uuid) {
                                                valeur.valeur.map((valItem) => {
                                                    if (valItem === val.id) {
                                                        obj[val.id] = true;
                                                    }
                                                });
                                            }
                                        });
                                    }
                                    return this.formBuilder.group(obj);
                                });

                                const formArray = this.formBuilder.array(checkBoxValues);
                                this.form.addControl(item.uuid, formArray);
                            }

                        } else {
                            this.form.addControl(item.uuid, this.formBuilder.control({}));
                        }
                        selectData.push({
                            id: item.uuid,
                            text: item.libelle
                        });
                    }
                );
                this.data = new Observable(observer => {
                    observer.next(selectData);
                    observer.complete();
                });
                if (this.valeurs.length) {
                    this.valeurs.map((valeur) => {
                            this.listeChampsVisibles.map((item) => {
                                if (item.uuid === valeur.uuid) {
                                    if (item.type === 'checkbox') {
                                        item.valeurs.map((val) => {
                                                valeur.valeur.map((valeurItem) => {
                                                    const id = val.id;
                                                    const bool = valeurItem === val.id;
                                                    if (valeurItem === val.id && bool) {
                                                        this.form.controls[valeur.uuid].get(id).patchValue({id: bool});
                                                    }
                                                });
                                            }
                                        );

                                    } else {
                                        this.form.controls[valeur.uuid].setValue(valeur.valeur);
                                    }
                                }
                            });
                        }
                    );
                }
                textAreaUuids.map((item) => {
                    if (!this.form.controls[item.uuid].value.length) {
                        this.form.controls[item.uuid].setValue('');
                    }
                });

                this.chargementComplet = true;
            },
            err => {
                console.log(err);
            }
        );
    }

    onSupprimer(uuid): void {
        if (this.form.controls[uuid]) {
            const data = {id: uuid, value: this.form.controls[uuid].value};
            this.formValeurs = this.formValeurs.filter(obj => obj.id !== data.id);
            this.valeursEvent.emit(this.formValeurs);
        }
        this.listeChampsVisibles = this.listeChampsVisibles.filter(obj => obj.uuid !== uuid);
    }

    onChange($event, uuid): void {
        this.formValeurs = this.formValeurs.filter(obj => obj.id !== uuid);
        this.formValeurs.push({id: uuid, value: this.form.controls[uuid].value});
        this.valeursEvent.emit(this.formValeurs);
    }

    onChangeCheckBox($event, uuid, id): void {
        this.formValeurs.map((valeur) => {
            if (valeur.id === uuid) {
                this.CheckBoxValeurs = valeur.value;
            }
        });
        if ($event.target.checked) {
            this.CheckBoxValeurs.push($event.target.name);
        } else {
            this.CheckBoxValeurs = this.CheckBoxValeurs.filter(obj => obj !== $event.target.name);
        }
        this.formValeurs = this.formValeurs.filter(obj => obj.id !== uuid);
        this.formValeurs.push({id: uuid, value: this.CheckBoxValeurs});
        this.valeursEvent.emit(this.formValeurs);
    }

    onValueChange($event, uuid): void {
        this.formValeurs = this.formValeurs.filter(obj => obj.id !== uuid);
        this.formValeurs.push({id: uuid, value: $event});
        this.valeursEvent.emit(this.formValeurs);
    }

    onChampChange($event, uuid): void {
        let nouveauChamp;
        let ancienChamp;
        this.listeChamps.map((item) => {
            if (item.uuid === $event) {
                nouveauChamp = item;
            }
            if (item.uuid === uuid) {
                ancienChamp = item;
            }
        });
        if (this.listeChampsVisibles.indexOf(nouveauChamp) < 0) {
            this.listeChampsVisibles[this.listeChampsVisibles.indexOf(ancienChamp)] = nouveauChamp;
        }
        if (ancienChamp) {
            this.onSupprimer(uuid);
        } else {
            this.listeChampsVisibles.map((item) => {
                if (item.uuid === uuid) {
                    ancienChamp = item;
                }
            });
            this.listeChampsVisibles[this.listeChampsVisibles.indexOf(ancienChamp)] = nouveauChamp;
        }
    }

    ajouterChamp(): void {
        this.listeChampsVisibles.push({uuid: 'tmp'});
    }
}
