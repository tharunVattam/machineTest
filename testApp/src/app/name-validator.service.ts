import { Injectable } from '@angular/core';
import {AsyncValidator,AbstractControl, ValidationErrors} from '@angular/forms';
import { Observable ,of} from 'rxjs';
import { AppserviceService } from './appservice.service';
import { catchError,map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NameValidatorService implements AsyncValidator{

  constructor(private appAervice:AppserviceService) { }
  validate(control: AbstractControl): Observable<any> {
    return this.appAervice.checkUser(control.value).pipe(map((data:any)=>{
      return (data.valid ? null : {taken:true})
    }),
    catchError(()=>of(null)))
      
  }
}
