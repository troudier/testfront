import { Component, OnInit } from '@angular/core';
import {HelperService} from '../_services/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  fileName = '';

  constructor(private helperService: HelperService) {
  }

  ngOnInit(): void {
  }
  onFileSelected($event): void{
    const file: File = $event.target.files[0];

    if (file) {

      this.fileName = file.name;

      const formData = new FormData();
      console.log(file);
      formData.append('file', file);
      this.helperService.importFile(formData).subscribe(
        data => {
          console.log(data);
        }
      );
    }
  }
}
