import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';

@Component({
  selector: 'app-titre-autocomplete',
  templateUrl: './titre-autocomplete.component.html',
  styleUrls: ['./titre-autocomplete.component.scss']
})
export class TitreAutocompleteComponent implements OnInit {
  @Input() form;
  @Input() value;
  @Output() changed = new EventEmitter<string>();

  constructor(private personneService: PersonneService) {
  }

  public data = [];
  public keyword;
  public   titre;
  ngOnInit(): void {
    this.titre = {
        id: '',
        name: this.form.controls.titre.value
    };
    this.personneService.getListeTitres().subscribe(
      data => {
        data.map((item) => this.data.push(
          {
            id: item.uuid,
            name: item.libelle
          }
        ));
      });
    this.keyword = 'name';


  }
  selectEvent(item): void {
    this.changed.emit(item.name);
    // do something with selected item
  }

  onChangeSearch(val: string): void {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e): void {
    // do something when input is focused
  }
}
