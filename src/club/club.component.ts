import {Component, OnInit} from '@angular/core';
import { LocalStorageService } from '../app/local-storage.service';
import{Observable} from "rxjs/Observable";
import {Club} from '../app/club';
import { ClubsService } from './clubService';
import { Color } from './color';
import { Router } from '@angular/router';

@Component({
    selector:'clubs',
    templateUrl:'club.component.html'
})
export class ClubComponent implements OnInit{
    pageTitle:string="List of Clubs";
    clubs:Club[]=[];
    result:boolean;
    errorMessage:string;

    constructor(private _localStorageService:LocalStorageService, private router:Router)
    {

    }
    ngOnInit():void
    {
        this._localStorageService.getClubs()
        .subscribe(dataFromSubscription=>
                {this.clubs=dataFromSubscription;},
            error=>this.errorMessage=error);

    }
    //Edit Club
    editClub(clubToEdit: Club):void{
        console.log("edit: " +  clubToEdit.id);
        this.router.navigate(['clubs/Edit', clubToEdit.id]);
    }

    //Delete Club
    deleteClub(clubToDelete: Club):void{
        this._localStorageService.removeClub(clubToDelete.id)
            .subscribe(result=>{
                    this.result=result;
                    console.log('Result of Delete:' + JSON.stringify(this.result));
                    console.log('Count before Delete:' + this.clubs.length);                
                    if(result){
                        //Deleted from local storage, now deleting from component
                        this.clubs = this.clubs.filter(s => s.id !== clubToDelete.id);  
                    }
                    console.log('Count after Delete:' + this.clubs.length);
                    
            },
            error=>this.errorMessage=<any>error); 
}
}
