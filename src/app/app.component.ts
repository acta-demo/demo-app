import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { faFile, faCubes, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('myForm', { static: false }) myForm: ElementRef;

  toggleStatus = false;
  menuFile: string[] = ['Open document', 'Open template'];
  menuBB: string[] = ['Snippets', 'Strings', 'References', 'Variables', 'List of speakers'];
  searchMenuElements: string[] = ['Strings', 'Snippets'];
  selectedMenuElement: string = '';
  faFile = faFile;
  faCubes = faCubes;
  faAngleDoubleLeft = faAngleDoubleLeft;
  faAngleDoubleRight = faAngleDoubleRight;
  closeButton = 'true';
  receivedStwordMessage: string;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) { }
  ngOnInit() {

  }
  getStwordMessage(message: string) {
    console.log('receivedStwordMessage:', this.receivedStwordMessage);
    this.receivedStwordMessage = message;
    this.myForm.nativeElement.style.display = 'none';
  }
  openForm() {
    console.log('myForm:', this.myForm);
    this.myForm.nativeElement.style.display = "block";
  }

  closeForm() {
    this.myForm.nativeElement.style.display = "none";
  }

  onFileElementClick($event, element) {
    this.menuFile.sort(function(x,y){ return x === element ? -1 : y === element ? 1 : 0; });
    this.selectedMenuElement = element;
    console.log('this.menuFile:', this.menuFile);
  }

  onBBElementClick($event, element) {
    this.menuBB.sort(function(x,y){ return x === element ? -1 : y === element ? 1 : 0; });
    this.selectedMenuElement = element;
    console.log('this.menuBB:', this.menuBB);
    const intersection: string[] = this.menuBB.filter(value => this.searchMenuElements.includes(value))
    if(intersection.length > 0) {
      console.log('INTERSECTION');
    }
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
