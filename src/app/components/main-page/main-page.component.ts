import { Component, OnInit } from '@angular/core';
import { DataBaseService } from 'src/app/services/db/data-base.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  source = false;
  constructor(private db: DataBaseService) { }

  ngOnInit(): void {
  }

  getFile(event: any) {
    console.log(event)
    this.source = true;
    let elem = document.getElementById('card');
    if(elem != null){
      elem.style.setProperty("height","50%");
      elem.style.setProperty("top","-55%");
    }
  }

  onSubmit() {
    
  }
}
