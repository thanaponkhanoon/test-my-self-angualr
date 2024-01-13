import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AddressService } from '../../services/address.service'
import { LocalStorageService } from 'angular-web-storage'

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  address:any = [{}]
  constructor(private ps: AddressService, private local: LocalStorageService) {this.onLoading() }
  addressForm = new FormGroup({
    userId : new FormControl(''),
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    phonenumber: new FormControl('', [Validators.required,Validators.pattern('[0][0-9]{9}')]),
    address: new FormControl('', [Validators.required]),
  })

  previewLoaded: boolean = false
  ngOnInit(): void {
  }
  get fromdata(){
    console.log(this.addressForm.controls);
    return this.addressForm.controls
  }
  
  onLoading(){
    try{
      this.ps.getAddressById().subscribe(
        data =>{
          this.address = data     
        },
        err =>{
           console.log(err);
        }
      )
    }catch(err){
      console.log(err);
    }
  }


  getUser() {
    return this.local.get('user').result.username
  }
  putData(){
    this.addressForm.value.userId = this.local.get('user').result.id
    this.ps.putAddress(this.addressForm.value).subscribe(data=>{
      alert("add address successfull !!!")
      
    },err=>{
      console.log(err);
      
    })
  }

}
