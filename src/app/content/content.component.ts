import {AfterViewInit, Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { ApiService } from '../api.service';
import { count, map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';

export interface UserData {
  id: string;
  bookname:string;
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
  contentImage :string ="assets/content-l.png"
  ngOnInit(): void {
    this.getBooks();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  
  displayedColumns: string[] = ['id', 'bookname', 'authorname', 'genre','year'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  authors: string[] = [];
  genres: string[] = [];
  years: string[] = [];
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  constructor(private api:ApiService,private route : Router) {
    
    
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
    
  }

  pushDynamicData() {
    for(let i = 0 ; i < this.dataFromJson.length ; i++){
      if(!this.authors.includes(this.dataFromJson[i].authorName)){
        this.authors.push(this.dataFromJson[i].authorName);
      }
      if(!this.years.includes(this.dataFromJson[i].year)){
        this.years.push(this.dataFromJson[i].year);
      }
      if(!this.genres.includes(this.dataFromJson[i].genre)){
        this.genres.push(this.dataFromJson[i].genre);
      }   
    }
  }

  myFilter(row : string){
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
        this.pushDynamicData();
      },
      error: () =>{
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

  showAdd=true
  showDel=true
  showTable=false
  homeP(){
    this.route.navigate(["/"]);
  }
  
}