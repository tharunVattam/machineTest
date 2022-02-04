import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  userName='';

  constructor(private http:HttpClient) { }
  signUp(formData:any){
    let url='http://localhost:3001/signup';
    const options= new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(url,formData,{headers:options}).pipe(tap(data=>data));

  }
  checkUser(value:string){
    let url='http://localhost:3001/checkUser?userName='+value;
    const options= new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get(url,{headers:options}).pipe(tap(data=>data));

  }
  getData(){
    let url='http://localhost:3001/getData?userName='+this.userName;
    const options= new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get(url,{headers:options}).pipe(tap(data=>data));

  }
  login(formData:any){
    let url='http://localhost:3001/login';
    const options= new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(url,formData,{headers:options}).pipe(tap(data=>data));

  }
  upload(formData:any){
    let fileData={
      data:formData,
      userName:this.userName
    }
    let url='http://localhost:3001/upload';
    const options= new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(url,fileData,{headers:options}).pipe(tap(data=>data));

  }
}
