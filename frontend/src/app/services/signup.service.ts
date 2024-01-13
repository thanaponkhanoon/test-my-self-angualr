import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage'
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient,public local: LocalStorageService) { }
  signups(signupData: any){
    signupData.role = "user"
    return this.http.post<any>('http://localhost:3000/user/signup', signupData)
    .pipe(map(data=>{
      if(data){
        console.log(data)
      }
      return data;
    }));
  }
}
