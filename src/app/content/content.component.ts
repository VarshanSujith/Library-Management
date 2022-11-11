import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { I18NHtmlParser } from '@angular/compiler';

export interface UserData {
  id: string;
  bookname: string;
  authorname: string;
  year: string;
  genre: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  dataFromJson !: Array<any>;
  contentImage: string = "assets/content-l.png"
  ngOnInit(): void {
    this.getBooks();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    ); 
  }

  displayedColumns: string[] = ['id', 'bookName', 'authorName', 'genre', 'year'];
  arrowstyle : string[] = ['','arrow_upward','arrow_downward'];
  ordered : string[] =['','asc','desc']
  imagecounter: number[] =[0,0,0,0,0];
  dataSource !: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;

  authors: string[] = [];
  genres: string[] = [];
  years: string[] = [];
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  showAdd = true
  showDel = true
  showTable = false
  constructor(private api: ApiService, private route: Router) { }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  
  }

  pushDynamicData() {
    for (let i = 0; i < this.dataFromJson.length; i++) {
      if (!this.authors.includes(this.dataFromJson[i].authorName)) {
        this.authors.push(this.dataFromJson[i].authorName);
      }
      if (!this.years.includes(this.dataFromJson[i].year)) {
        this.years.push(this.dataFromJson[i].year);
      }
      if (!this.genres.includes(this.dataFromJson[i].genre)) {
        this.genres.push(this.dataFromJson[i].genre);
      }
    }
  }

  myFilter(row: string) {
    this.dataSource.filter = row.trim().toLowerCase();
  }


  getBooks() {
    this.api.getBookData()
      .subscribe({
        next: (res) => {
          this.dataFromJson = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          // console.log(this.dataSource.sort);
          // this.pushDynamicData();
        },
        error: () => {
          console.log('From GetData', 'Error');
        }
      })
  }

  // ngAfterViewInit() {
  // this.dataSource.paginator = this.paginator;
  // this.dataSource.sort = this.sort;
  // }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  homeP() {
    // this.route.navigate(["/content"]);
    window.location.reload();


  }
  orderby !: string
  imagechange(target : number){
    
    if(this.imagecounter[target]<2){
      this.imagecounter[target]+=1
      document.getElementsByTagName("mat-icon")[target+1].innerHTML=this.arrowstyle[this.imagecounter[target]];
      if(this.imagecounter[target]==1)
      {this.orderby=this.ordered[1];
      this.getSortData(this.displayedColumns[target],this.orderby);
      }
      else{
        this.orderby=this.ordered[2];
      this.getSortData(this.displayedColumns[target],this.orderby);
      }
    }
    else{
    this.imagecounter[target]=0
    document.getElementsByTagName("mat-icon")[target+1].innerHTML=this.arrowstyle[this.imagecounter[target]];
    this.getBooks();

    }
  }
  getSortData(columnName : string,orderby : string) {
    this.api.getSortData(columnName,orderby)
      .subscribe({
        next: (res) => {
          this.dataFromJson = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log(res);
          this.pushDynamicData();
        },
        error: () => {
          console.log('From GetData', 'Error');
        }
      })
  }


  arrowchange(target: number){

    switch(target){
      case 0:
        this.imagechange(target);
        break;

      case 1:
        this.imagechange(target);
        break;

      case 2:
        this.imagechange(target);
        break;
            
      case 3:
        this.imagechange(target);
        break;
              
      case 4:
        this.imagechange(target);
        break;

    }
    
  }
}