import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import {ClubComponent} from '../club/club.component';

import {ClubsService} from '../club/clubService';

import { LocalStorageService } from './local-storage.service';
import { ClubAddOREditComponent } from '../club/club.add-edit.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ClubComponent,
    ClubAddOREditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/clubs', pathMatch: 'full' },
      {path: 'clubs',component:ClubComponent},
      {path: 'clubs/Add',component:ClubAddOREditComponent},
      {path: 'clubs/Edit/:Id',component:ClubAddOREditComponent}
    ])
  ],
  providers: [
    LocalStorageService,
    ClubsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
