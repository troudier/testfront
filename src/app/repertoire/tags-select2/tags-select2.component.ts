import {
    Component,
    EventEmitter,
    Input, OnChanges,
    OnInit,
    Output
} from '@angular/core';
import {Observable} from 'rxjs';
import {Select2OptionData} from 'ng-select2';
import {Options} from 'select2';
import {TagService} from '../../_services/tag.service';
import {PersonneService} from '../../_services/personne.service';
import {NotifierService} from 'angular-notifier';

@Component({
    selector: 'app-tags-select2',
    templateUrl: './tags-select2.component.html',
    styleUrls: ['./tags-select2.component.scss']
})
export class TagsSelect2Component implements OnInit, OnChanges {

    public data: Observable<Array<Select2OptionData>> = new Observable(observer => {
        observer.next([]);
        observer.complete();
    });
    public options: Options;
    public value: string[];
    public errorMessage;
    @Input() personne;
    @Input() persist;
    @Input() disabled;
    @Output() changed = new EventEmitter<string[]>();

    constructor(
        private tagService: TagService,
        private personneService: PersonneService,
        private notifier: NotifierService
    ) {
    }

    ngOnInit(): void {
        this.initTags();
        this.value = [];
        this.personne.tags.map((item) => {
            this.value.push(item.uuid);
        });
    }

    ngOnChanges(): void {
        if (this.value) {
            this.value.map((val) => {
                let found = false;
                this.personne.tags.map((item) => {
                    if (item.uuid === val) {
                        found = true;
                    }
                });
                if (!found) {
                    this.value = this.value.filter(obj => obj !== val);
                }

            });
            this.personne.tags.map((item) => {
                let found = false;
                this.value.map((val) => {
                    if (val === item.uuid) {
                        found = true;
                    }
                });
                if (!found) {
                    this.value.push(item.uuid);
                }
            });
        }
    }

    /* Récupération liste des tags disponbiles pour les personnes  et init du select2 */
    initTags(): void {
        this.data = new Observable(observer => {
            observer.next([]);
            observer.complete();
        });
        this.tagService.getTagsListe(
            'personnes'
        ).subscribe(
            data => {
                const tags = [];
                data.map((item) => tags.push(
                    {
                        id: item.uuid,
                        text: item.libelle
                    }
                ));
                this.data = new Observable(observer => {
                    observer.next(tags);
                    observer.complete();
                });
            },
            err => {
                this.errorMessage = err.error.message;
            }
        );
        this.options = {
            multiple: true
        };
    }

    addTag($event: string[]): void {
        this.changed.emit($event);
        if ($event !== this.value) {
            if (this.persist) {
                this.personneService.setTags($event, this.personne.uuid).subscribe(
                    data => {
                        this.showNotification('success', 'Le tag a bien été mis à jour');
                    },
                    err => {
                        this.errorMessage = err.error.message;
                        this.showNotification('error', this.errorMessage);
                    }
                );
            }
        }
    }

    public showNotification(type: string, message: string): void {
        this.notifier.notify(type, message);
    }
}
