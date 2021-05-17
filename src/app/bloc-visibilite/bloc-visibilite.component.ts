import {AfterContentInit, AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit, Output} from '@angular/core';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {HelperService} from '../_services/helper.service';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {PersonneService} from '../_services/personne.service';

@Component({
    selector: 'app-bloc-visibilite',
    templateUrl: './bloc-visibilite.component.html',
    styleUrls: ['./bloc-visibilite.component.scss']
})
export class BlocVisibiliteComponent implements OnInit, AfterViewChecked {

    @Input() form;
    @Input() type;
    @Input() creation;
    @Input() uuidReferent;
    private errorMessage = '';
    public formCreation;

    constructor(
        private helperService: HelperService,
        private ref: ChangeDetectorRef,
        private personneService: PersonneService,
    ) {
    }

    // récupère l'uuid de la personne connecté
    getUuidUserConnecte(): void {
        this.personneService.getPersonneCourante().subscribe(
            data => {
                this.uuidReferent = data.uuid;
                if(this.form.controls.referent.value){
                    this.form.controls.referent.value.push(data.uuid);
                }else{
                    this.form.controls.referent.value = [data.uuid];
                }
            },
            err => {
                console.log(err);
                this.errorMessage = err.error;
            }
        );
    }

    ngOnInit(): void {
        // statut pour savoir si les composants est en création ou en édition
        this.formCreation = this.creation;
        this.getUuidUserConnecte();
        // set la visibilité par defaut à privé
        if (this.creation === true) {
            this.form.controls.visibilite.setValue('3');
        }

        if (this.form.controls.uuid) {
            this.helperService.getIntervenants(this.form.controls.uuid.value, this.type).subscribe(
                data => {
                    const intervenants = [];
                    data.map((item) => {
                            if (item.type === 1) {
                                this.form.controls.referent.setValue(item.uuid);
                            } else if (item.type === 2) {
                                intervenants.push(item.uuid);
                            }
                        }
                    );
                    this.form.controls.intervenants.setValue(intervenants);
                },
                err => {
                    console.log(err);
                }
            );
        }
    }

    ngAfterViewChecked(): void {
        this.ref.detectChanges();
    }

    onChangeActif($event): void {
        if ($event.target.checked) {
            this.form.controls.actif.setValue('1');
        } else {
            this.form.controls.actif.setValue('0');
        }
    }
}
