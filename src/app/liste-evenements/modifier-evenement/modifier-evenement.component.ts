import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifierService} from 'angular-notifier';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonneService} from '../../_services/personne.service';
import {EvenementService} from '../../_services/evenement.service';
import * as moment from 'moment';
import {formatDate} from '@angular/common';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ExceptionService} from '../../_services/exception.service';

@Component({
    selector: 'app-modifier-evenement',
    templateUrl: './modifier-evenement.component.html',
    styleUrls: ['./modifier-evenement.component.scss']
})
export class ModifierEvenementComponent implements OnInit {
    public event;
    public uuidEvent = this.route.snapshot.params.id;
    public uuidPersonne = this.route.snapshot.params.idPersonne;
    public uuidReferent;
    public form: FormGroup;
    public message;
    private notifier: NotifierService;
    public dataPersonne;
    public current = moment().format('L');
    public moment = moment().locale('fr_FR');
    @Input() formCreation;
    @Input() formValeurs;
    @Output() valeursEvent = new EventEmitter<object>();

    constructor(
        private router: Router,
        private personneService: PersonneService,
        private evenementService: EvenementService,
        private formBuilder: FormBuilder,
        private ref: ChangeDetectorRef,
        private route: ActivatedRoute,
        private ngxService: NgxUiLoaderService,
        private exceptionService: ExceptionService,
        notifier: NotifierService
    ) {
        this.notifier = notifier;
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
                libelle: ['', Validators.required],
                type: ['', Validators.required],
                statut: ['', Validators.required],
                assignedTo: ['', Validators.required],
                dateEcheance: ['', Validators.required],
                timeEcheance: ['', Validators.required],
                description: ['']
            }, {}
        );
        this.getEvent();
    }

    ngAfterViewChecked(): void {
        this.ref.detectChanges();
    }

    public onSubmit(): void {
        this.ngxService.start();
        const formData = {
            libelle: this.form.controls.libelle.value,
            type: this.form.controls.type.value,
            statut: this.form.controls.statut.value,
            assignedTo: this.form.controls.assignedTo.value,
            dateEcheance: this.form.controls.dateEcheance.value,
            timeEcheance: this.form.controls.timeEcheance.value,
            description: this.form.controls.description.value,
            idUser: this.uuidReferent
        };
        if (this.form.valid) {
            this.evenementService.modifierEvenement(this.uuidEvent, formData).subscribe(
                data => {
                    this.ngxService.stop();
                    this.showNotification('success', 'L\'évènement ' + this.form.controls.libelle.value + ' vient d\'être mis à jour');
                    this.getEvent();
                },
                err => {
                    this.ngxService.stop();
                    this.showNotification('error', this.exceptionService.statutErreur(err));
                }
            );
        } else {
            this.ngxService.stop();
            this.showNotification('error', 'Veuillez remplir les champs requis');
        }
    }

    public getEvent(): void {
        this.evenementService.getEvenement(this.uuidEvent).subscribe(
            event => {
                this.event = event;
                this.event.statut = event.statut.toString();
                this.uuidReferent = event.uuidReferent;
                this.form.controls.assignedTo.setValue(this.uuidReferent);

                // appel de getPersonne pour récupérer les infos dans contact
                this.personneService.getDatasPersonne(this.uuidPersonne).subscribe(datasPersonne => {
                    this.dataPersonne = datasPersonne;
                });
                this.form.patchValue(event);
                // le set value de la date est après le patchValue (c'est voulut)
                this.form.controls.dateEcheance.setValue(formatDate(event.dateEcheance, 'yyyy-MM-dd', 'en'));
                this.form.controls.timeEcheance.setValue(formatDate(event.dateEcheance, 'HH:mm', 'en'));
            }, err => {
                this.showNotification('error', this.exceptionService.statutErreur(err));
            }
        );
    }

    public onCancel(): void {
        this.router.navigate(['/repertoire/' + this.uuidPersonne]);
    }

    public onSubmitCancel(): void {
        this.onSubmit();
        setTimeout(() => {
            this.router.navigate(['/repertoire/' + this.uuidPersonne]);
        }, 1000);
    }

    public showNotification(type: string, message: string): void {
        setTimeout(() => {
            this.notifier.notify(type, message);
        }, 1000);
    }

    public verificationChamps(): void {
        if (!this.form.valid) {
            this.showNotification('error', 'Veuillez remplir les champs requis avant de soumettre le formulaire s\'il vous plait');
        }
    }

    onChangedSelect2($event, id): void {
        this.form.controls[id].setValue($event);
    }
}
