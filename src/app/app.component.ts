import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Library-M';
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();
  sideBarState = false;
  myTogle(){
    this.toggleSidebarForMe.emit();
  }
  sideBarToggleman(){
    this.sideBarState =! this.sideBarState
  }
  showButton=true;
  butS(){
    this.showButton = !this.showButton
    console.log("Works!!")
  }
}
