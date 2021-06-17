import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Select2OptionData} from 'ng-select2';
import { Options } from 'select2';
import {
  faListUl,
  faFilter,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';

@Component({
  selector: 'app-repertoire-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.scss']
})
export class OutilsComponent implements OnInit {
  rechercheTerme;
  faListUl = faListUl;
  faFilter = faFilter;
  faPlus = faPlus;
  @Output() rechercheEvent = new EventEmitter<string>();
  @Output() typeFiltreEvent = new EventEmitter<string>();
  @Output() statutFiltreEvent = new EventEmitter<string>();
  @Input() type;
  public statutData: Array<Select2OptionData>;
  public typeData: Array<Select2OptionData>;
  public typeOptions: Options;
  public typeValue: string[];
  public statutOptions: Options;
  public statutValue: string[];
  public statutCurrent: string;
  public current;
  public typeCurrent: string;

  constructor(
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.typeData = [
      {
        id: 'physique',
        text: 'Physiques'
      },
      {
        id: 'morale',
        text: 'Morales'
      },
      {
        id: 'lien',
        text: 'Lien'
      },
    ];

    this.statutData = [
      {
        id: 'prospect',
        text: 'Prospect'
      },
      {
        id: 'client',
        text: 'Client'
      },
      {
        id: 'adverse',
        text: 'Partie Advserse'
      },
      {
        id: 'membre',
        text: 'Membre'
      },
      {
        id: 'autre',
        text: 'Autre'
      },
    ];

    this.typeOptions = {
      multiple: true
    };
    this.statutOptions = {
      multiple: true
    };

  }
  public valueChangedStatut(event: string): void {
    this.statutFiltreEvent.emit(event);
  }

  public valueChangedType(event: string): void {
    this.typeFiltreEvent.emit(event);
  }

  recherche(): void {
    this.rechercheEvent.emit(this.rechercheTerme);
  }

  creerPersonne(): void {
    this.router.navigate(['repertoire/creer' ]);

  }
  creerSegment(): void{
    this.router.navigate(['segment/modifier/nouveau' ]);
  }

}
