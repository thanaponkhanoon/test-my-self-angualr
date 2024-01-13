import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { LocalStorageService } from 'angular-web-storage'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart:any

  constructor(private http: HttpClient,public local: LocalStorageService) { 
  }

  
  addCart(data:any){
    console.log("this " + data._id);
    let id =  data._id
    return this.http.post<any>('http://localhost:3000/api/cart/add/'+id,"").pipe(map(data => {
      if(data){
        console.log(data);
        this.cart=data
        console.log(this.cart); 
      }
      return this.cart
    }))
  }
 
  getCartByUserId(){
    let token = this.local.get('user').token
    let userid = this.local.get('user').result.id
    return this.http.get<any>('http://localhost:3000/api/cart/get/'+userid,{
      headers: new HttpHeaders().set('Authorization', token),
    }).pipe(map(data => {
      if(data){
        console.log(data);
        this.cart=data
        console.log(this.cart); 
      }
      return this.cart
    }))
  }


  pushCart(cart:any){
    try{
    var token = this.local.get('user').token
    }catch(err){
     alert("login plss")
    }
    let userid = this.local.get('user').result.id
    cart.userId = userid
    console.log("this cart " ,cart);
    
    return this.http.put<any>('http://localhost:3000/api/cart/put/',cart,{
      headers: new HttpHeaders().set('Authorization', token),
    }).pipe(map(data => {
      if(data){
        console.log(data);
        this.cart=data
        console.log(this.cart); 
      }
      return this.cart
    }))
  }


  deleteOneProduct(id:any){
    let userid = this.local.get('user').result.id
    let token = this.local.get('user').token
    return this.http.delete<any>('http://localhost:3000/api/cart/delete/'+id+"/"+userid,{
      headers: new HttpHeaders().set('Authorization', token),
    }).pipe(map(data => {
      if(data){
        console.log(data);
        this.cart=data
        console.log(this.cart); 
      }
      return this.cart
    }))
  }
  
  
}


