import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContentComponent } from './content/content.component';
import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { AddDeleteComponent } from './add-delete/add-delete.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatMenuModule} from '@angular/material/menu'; 




const routes: Routes = [
  {
    path: 'content',
    component: ContentComponent
  },
  {
    path : '',
    component : ContentComponent,
    pathMatch : 'full'
  },
  {
    path: 'content/alterbook',
    component: AddDeleteComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    AddDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MatToolbarModule, MatButtonModule,
    MatIconModule, MatSidenavModule, MatTableModule, RouterModule.forRoot(routes), MatPaginatorModule,
    MatFormFieldModule, MatSortModule, MatSelectModule, MatInputModule, MatDialogModule,
    HttpClientModule, MatAutocompleteModule, FormsModule, ReactiveFormsModule,MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
