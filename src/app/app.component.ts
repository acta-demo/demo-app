import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public toggleStatus = false;
  ngOnInit() {

  }

  onToggle($event) {
    $event.preventDefault();
    this.toggleStatus = !this.toggleStatus;
    /*if(this.headerE.nativeElement.style.display === 'block' || this.headerE.nativeElement.style.display === '') {
      this.headerE.nativeElement.style.display = 'none';
      this.isHeaderCollapsed = true;
    } else {
      this.headerE.nativeElement.style.display = 'block';
      this.isHeaderCollapsed = false;
    }*/
  }
}
