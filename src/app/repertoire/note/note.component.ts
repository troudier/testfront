import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonneService} from '../../_services/personne.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  libelle: string;
  errorMessage = '';
  qualite: number;
  @Output() note = new EventEmitter<number>();
  stars: Array<any>;
  @Input() noteDisabled;

  constructor(
    private personneService: PersonneService,
    public route: ActivatedRoute,
    public router: Router
  ) {
  }

  ngOnInit(): void {
    this.stars = [];
    this.getStars(3);
    this.personneService.getPersonne(
      this.route.snapshot.params.id
    ).subscribe(
      data => {
        // tslint:disable-next-line:radix
        this.qualite = parseInt(data.qualite);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  public changeQualite(qualite): void {
    if (this.noteDisabled !== false) {
      this.qualite = qualite;
      this.note.emit(qualite);
    }
  }

  public getStars(nbEtoile: number): void {
    this.stars = [1, 2, 3];
  }
}
