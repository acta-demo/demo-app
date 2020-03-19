import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '../assets/ckeditor.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test-ed';
  public Editor = ClassicEditor;

  ngOnInit() {
    //....
  }
}
