import { Injectable } from "@angular/core";
import {Color} from './color';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';


@Injectable()
export class ClubsService
{
    private _colorUrl= '../assets/colors.json';
    constructor(private _http: HttpClient)
    {}
    public getColors(): Observable<Color[]>
    {
        return this._http.get<Color[]>(this._colorUrl)
        .do(data=> console.log('All Colors:' + JSON.stringify(data)))
        .catch(this.handleError);
    }
    private handleError(err:HttpErrorResponse)
    {
        console.log("OOPs: " + this._colorUrl+" - " +err.message);
        return Observable.throw(err.message);
    }
}