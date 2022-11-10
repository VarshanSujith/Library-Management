import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../api.service';
import { FormControl} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-delete',
  templateUrl: './add-delete.component.html',
  styleUrls: ['./add-delete.component.css']
})
export class AddDeleteComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  addimg : string = "assets/changes-l.jpg";

  constructor(private api: ApiService, private route: Router) { }
  userSubmitData = { bookName: "", authorName: "", year: "", genre: "" }
  dataFromJson!: Array<any>;
  ngOnInit(): void {
    this.getBooks();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  pushDynamicData() {
    for(let i = 0 ; i < this.dataFromJson.length ; i++){
      this.options.push(this.dataFromJson[i].bookName);
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  showAdd = true
  showDel = true
  showTable = false
  bookAdd() {
    if (this.showDel == true || this.showTable == false) {
      this.showAdd = !this.showAdd
      this.showTable = !this.showTable
    }
  }
  bookDel() {
    if (this.showAdd == true || this.showTable == false) {
      this.showDel = !this.showDel
      this.showTable = !this.showTable
    }
  }
  Aval() {
    if (this.showAdd == false) {
      const Inputs = document.getElementsByTagName("input");
      this.userSubmitData.bookName = Inputs[0].value;
      this.userSubmitData.authorName = Inputs[1].value;
      this.userSubmitData.year = Inputs[2].value;
      this.userSubmitData.genre = Inputs[3].value;
      console.log('Added Input', Inputs[0].value);
      this.api.postBookData(this.userSubmitData)
        .subscribe({
          next: (res) => {
            console.log('From postData', 'Success');
          },
          error: () => {
            console.log('From postData', 'Error');
          }
        })
        this.showAdd =!this.showAdd;
    }
    // window.location.reload();
    this.route.navigate(['/content']);
    
  }
  Dval() {
    if (this.showDel == false) {
      const Input = document.getElementsByTagName("input");
      var DelVal = this.myControl.value;
      var DelId = 0;
      console.log('Option',this.myControl.value);
      for(let i = 0 ; i < this.dataFromJson.length ; i++){
        if(this.dataFromJson[i].bookName == DelVal){
          DelId = this.dataFromJson[i].id;
          break;
        }
      }
      console.log('Del Value', DelId, DelVal);
      this.deleteData(DelId);
      this.showDel =!this.showDel;
      this.route.navigate(['/content']);
    }

  }
  deleteData(id : number) {
     this.api.deleteBook(id)
     .subscribe({
      next : (res) =>{
        console.log("Successfully Deleted!!!");
      },
      error: () =>{
        console.log("Error");
      }
     });
  }
  Reset() {
    const x = document.getElementsByTagName("input");
    for (let i = 0; i < x.length; i++) {
      x[i].value = '';
    }
    console.log(x);
  }
  getBooks() {
    this.api.getBookData()
    .subscribe({
      next: (res) => {
        this.dataFromJson = res;
        console.log('From GetData', 'Success', this.dataFromJson);
        this.pushDynamicData();
      },
      error: () =>{
        console.log('From GetData', 'Error');
      }
    })
  }
}
