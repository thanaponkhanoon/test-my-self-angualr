import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage'
@Injectable({
  providedIn: 'root'
})
export class AddressService {
  addresses: any 
  constructor(private http: HttpClient,private local:LocalStorageService) { }

  addAddress(address:any) {
    return this.http.post<any>('http://localhost:3000/api/user/add/',address).pipe(map(data => {
      return data
    }))
  }

  
  putAddress(address:any) {
    let token = this.local.get('user').token
    console.log(address);
    return this.http.put<any>('http://localhost:3000/api/user/put/',address, {
      headers: new HttpHeaders().set('Authorization', token),
    }).pipe(map(data => {
      return data
    }))
  }

  
  getAddressById() {
    let token = this.local.get('user').token
    let userid = this.local.get('user').result.id
    return this.http.get<any>('http://localhost:3000/api/user/get/'+userid, {
      headers: new HttpHeaders().set('Authorization', token),
    }).pipe(map(data => {
      return data
    }))
  }


}
