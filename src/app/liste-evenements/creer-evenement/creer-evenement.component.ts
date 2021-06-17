import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PersonneService} from '../../_services/personne.service';
import {EvenementService} from '../../_services/evenement.service';
import {NotifierService} from 'angular-notifier';
import * as moment from 'moment';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {ExceptionService} from '../../_services/exception.service';

@Component({
    selector: 'app-creer-evenement',
    templateUrl: './creer-evenement.component.html',
    styleUrls: ['./creer-evenement.component.scss']
})
export class CreerEvenementComponent implements OnInit {
    public uuid = this.route.snapshot.params.id;
    public form: FormGroup;
    public message;
    private notifier: NotifierService;
    public personne;
    public current = moment().format('L');
    public moment = moment().locale('fr_FR');
    @Input() uuidReferent;
    @Input() formCreation;
    @Input() formValeurs;
    @Output() valeursEvent = new EventEmitter<object>();
    public statut;

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
        this.personneService.getPersonne(this.uuid).subscribe(
            data => {
                this.personne = data;
            }, err => {
                this.showNotification('error', this.exceptionService.statutErreur(err));
            }
        );
    }

    ngAfterViewChecked(): void {
        this.ref.detectChanges();
    }

    public onSubmit(): void {
        this.ngxService.start();
        const formData = {
            libelle: this.form.controls.libelle.value,
            type: this.form.controls.type.value,
            statut: this.form.controls.type.value,
            assignedTo: this.form.controls.assignedTo.value,
            dateEcheance: this.form.controls.dateEcheance.value,
            timeEcheance: this.form.controls.timeEcheance.value,
            description: this.form.controls.description.value,
            idUser: this.uuid,
            typePersonne: this.personne.type
        };
        if (this.form.valid) {
            this.evenementService.creerEvenement(formData).subscribe(
                data => {
                    this.router.navigate(['/repertoire/' + this.uuid]);
                    this.ngxService.stop();
                },
                err => {
                    this.ngxService.stop();
                    this.showNotification('error', this.exceptionService.statutErreur(err));
                }
            );
        } else {
            this.ngxService.stop();
            this.showNotification('error', 'Veuillez remplir les champs requis avant de soumettre le formulaire s\'il vous plait');
        }
    }

    public onCancel(): void {
        this.router.navigate(['/repertoire/' + this.uuid]);
    }

    public showNotification(type: string, message: string): void {
        setTimeout(() => {
            this.notifier.notify(type, message);
        }, 1000);
    }

    onChangedSelect2($event, id): void {
        this.form.controls[id].setValue($event);
    }
}
