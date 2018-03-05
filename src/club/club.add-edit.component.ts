import {Component, OnInit, Input} from '@angular/core';
import {Club} from '../app/club';
import {ClubComponent} from './club.component';
import { LocalStorageService } from '../app/local-storage.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Color } from './color';
import { ClubsService } from './clubService';


@Component({
    templateUrl:'club.add-edit.component.html'
})
export class ClubAddOREditComponent implements OnInit
{
    pageTitle:string="";
    aClub:Club;
    clubId:number;
    colors:Color[];
    errorMessage: string;

    constructor(private _localStorageService:LocalStorageService,private _clubService:ClubsService, private route: ActivatedRoute)
    {
        console.log("Add edit called");
    }
    
    ngOnInit():void{
        //Check if an Id was passed.
        //If Yes, then we are in edit mode, else, in add mode
        this.route.params.subscribe(params => {
            this.clubId = +params['Id']; 
            console.log('Routed Data ID:' + this.clubId);
            if(isNaN(this.clubId)){
                //We are adding a club
                console.log('Creating new Club');
                this.pageTitle="Add new club";
                this.aClub={id:null, name:null, city:null,color:null,isTopFour:null,nextMatchDate:null};

            } 
            else{
                //Get the club object to edit
                this.getClubById(this.clubId);
                this.pageTitle="Edit club: "+this.aClub.name;
            }
        });

        //Get all colors
        this._clubService.getColors()
            .subscribe(
                colorsData=>this.colors=colorsData,
                error=>this.errorMessage=error
            );

    }

    getClubById(id: number):void{
        //Call local storage to get clubs and the filter
        var clubs:Club[];
        this._localStorageService.getClubs()
        .subscribe(dataFromSubscription=>
                {
                    clubs=dataFromSubscription;
                    console.log("clubs before filter:"+clubs.length);
                    clubs = clubs.filter(s => s.id==id); 
                    console.log("clubs after filter:"+clubs.length);
                    if(clubs.length==1)
                        this.aClub= clubs[0] ;
                },
            error=>this.errorMessage=error);

    }
    saveClub():void{
        //If aClub.id=null then call addClub
        if(this.aClub.id==null)
        {
            console.log("Calling add club on local storage");
            this._localStorageService.addClub(this.aClub)
                .subscribe(newClub=>{
                    this.aClub=newClub;
                    console.log('Added club:' + JSON.stringify(this.aClub));
                },
                error=>this.errorMessage=<any>error);
        }
        else{
            //else call editClub on LocalStorageService
            this._localStorageService.editClub(this.aClub.id,this.aClub)
                .subscribe(newClub=>{
                    this.aClub=newClub;
                    console.log('Updated Club:' + JSON.stringify(this.aClub));
                },
                error=>this.errorMessage=<any>error);

        }  
    }
    
}
