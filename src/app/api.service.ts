import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {
      
   }
   postBookData(data: any) {
    return this.http.post<any>("http://localhost:3000/bookData/", data);
   }
   getBookData(){
    return this.http.get<any>("http://localhost:3000/bookData/");
   }
   deleteBook(id: number){
    return this.http.delete<any>("http://localhost:3000/bookData/"+ id);
   }
   getSortData(columnName : string, order:string){
    console.log("http://localhost:3000/bookData/?_sort="+columnName+"&_order="+order);
    return this.http.get<any>("http://localhost:3000/bookData/?_sort="+columnName+"&_order="+order);
   }
}
