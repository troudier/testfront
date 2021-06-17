import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SegmentService} from '../../_services/segment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NotifierService} from 'angular-notifier';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ExceptionService} from '../../_services/exception.service';

@Component({
    selector: 'app-fiche-edit-segment',
    templateUrl: './fiche-edit-segment.component.html',
    styleUrls: ['./fiche-edit-segment.component.scss']
})
export class FicheEditSegmentComponent implements OnInit, AfterViewChecked {
    public form: FormGroup;
    public message;
    public segment;
    public errorMessage;
    public resultats;
    private notifier: NotifierService;
    public nbContacts;
    public showCalculer = false;
    public creation = false;
    public formValid = false;
    constructor(
        private router: Router,
        private segmentService: SegmentService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private ref: ChangeDetectorRef,
        private ngxService: NgxUiLoaderService,
        private exceptionService: ExceptionService,
        notifier: NotifierService
    ) {
        this.notifier = notifier;
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            uuid: [''],
            titre: ['', Validators.required],
            intervenants: [''],
            referent: [],
            visibilite: ['', Validators.required],
            actif: [''],
            filtres: ['']
        }, {});
        if (this.route.snapshot.params.id !== 'nouveau') {
            this.getData(this.route.snapshot.params.id);
        }else{
            this.creation = true;
            this.segment = {
                uuid: 'nouveau',
                titre: '',
                intervenants: [],
                referent: [],
                visibilite:  '3',
                actif: 1,
                nbContactsPublics: 0,
                nbContactsPrives: 0,
                filtres: null};
            this.form.patchValue(this.segment);
        }
    }

    /* Récupère les données d'une fiche */
    getData(uuid): void {

        this.segmentService.getSegment(
            uuid
        ).subscribe(
            data => {
                this.segment = data;
                this.form.patchValue(data);
                const parent = this;
                if (parent.segment.filtres) {
                    Object.keys(parent.segment.filtres).map((key, index) => {
                        parent.form.addControl(parent.segment.filtres[key].uuid, parent.formBuilder.control({}));
                        parent.segment.filtres[key].valeurs.map((valeur) => {
                            parent.form.controls[parent.segment.filtres[key].uuid].setValue(valeur);

                        });
                    });

                }
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }

    /* Récupère la liste des résultats du segment */
    getLiveResultats(uuid: string): void {

        this.segmentService.getSegmentLiveResultats(
            uuid,
            this.creerForm()
        ).subscribe(
            data => {
                this.resultats = data.content.resultats;

                this.segment.nbContactsPublics = data.content.count.public;
                this.segment.nbContactsPrives = data.content.count.prive;
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
    }

    ngAfterViewChecked(): void {
        this.ref.detectChanges();
    }

    refreshResultats(uuid): void {
        this.getLiveResultats(uuid);
    }

    onSubmit(): void {
        this.ngxService.start();
        const formData = this.creerForm();
        if (this.form.valid) {
            this.segmentService.updateSegment(this.segment.uuid, formData).subscribe(
                data => {
                    this.ngxService.stop();
                    this.showNotification('success', 'Le segment ' + this.segment.titre + ' a bien été mis à jour');
                },
                err => {
                    this.ngxService.stop();
                    this.showNotification('error', this.exceptionService.statutErreur(err));
                }
            );
            this.formValid = true;
        } else {
            this.ngxService.stop();
            this.showNotification('error', 'Veuillez remplir les champs requis');
        }
    }

    public showNotification(type: string, message: string): void {
        setTimeout(() => {
            this.notifier.notify(type, message);
        }, 1000);
    }

    calculateFiltres(): void {
        const formData = this.creerForm();
        this.segmentService.calculerResultats(this.segment.uuid, formData).subscribe(
            data => {
                this.nbContacts = data.content;
            },
            err => {
                this.message = err.error;
                this.showNotification('error', this.message);
            }
        );
    }

    creerForm(): any {
        if(!this.segment.filtres){
         //   this.segment.filtres = {};
        }
        return {
            titre: this.form.controls.titre.value,
            uuid: this.segment.uuid,
            visibilite: this.form.controls.visibilite.value,
            actif: this.form.controls.actif.value,
            referent: this.form.controls.referent.value,
            intervenants: this.form.controls.intervenants.value,
            filtres: this.form.controls.filtres.value
        };
    }

    showResultats(): void {
        this.resultats = null;
    }

    public onSubmitCancel(): void {
        this.onSubmit();
        setTimeout(() => {
            if (this.formValid === true) {
                this.router.navigate(['/segment/' + this.segment.uuid]);
            }
        }, 1000);
    }

    public onCancel(): void {
        this.router.navigate(['/segment/']);
    }
}
