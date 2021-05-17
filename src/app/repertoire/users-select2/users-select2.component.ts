import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Options} from 'select2';
import {Select2OptionData} from 'ng-select2';
import {PersonneService} from '../../_services/personne.service';

@Component({
    selector: 'app-users-select2',
    templateUrl: './users-select2.component.html',
    styleUrls: ['./users-select2.component.scss']
})
export class UsersSelect2Component implements OnInit {
    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    @Input() form;
    @Input() id;
    @Input() multiple;
    public options: Options;
    public value: string[];
    public referent;
    @Input() uuidReferent;
    @Input() formCreation;

    constructor(private personneService: PersonneService) {
    }

    ngOnInit(): void {
        this.options = {
            multiple: this.multiple
        };
        this.data = new Observable(observer => {
            observer.next([]);
            observer.complete();
        });
        this.initSelect();
    }

    private initSelect(): void {
        this.value = [];
        this.personneService.getListeUsers().subscribe(
            data => {
                const referents = [];
                data.map((item) => {
                        referents.push({
                            id: item.uuid,
                            text: item.civilite + ' ' + item.prenom + ' ' + item.nom
                        });
                        // on regarde si le select2 fait partie du composant en mode edition ou pas
                        if (this.id === 'referent' && this.formCreation === true) {
                            this.referent = referents[0].id;
                        }
                    }
                );
                this.data = new Observable(observer => {
                    observer.next(referents);
                    observer.complete();
                });
            },
            err => {
            }
        );
    }
}
