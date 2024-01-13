import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service'
import { Router } from '@angular/router'
import { AddressService } from '../../services/address.service';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    name : new FormControl('',[Validators.required]),
    username: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
    role: new FormControl('')
  });
  constructor(private router: Router,private signup: SignupService,private cart:CartService,private address:AddressService) { }
  ngOnInit(): void {
  }
  register(){  
    console.log("this " ,this.signupForm.value);
    
    this.signup.signups(this.signupForm.value).subscribe(
      data => {
        if(data.message){  
          console.log(data.data);
          this.cart.addCart(data.data).subscribe( 
            data => {
              console.log(data);
            },
            err => {
               console.log(err);   
            }
          )
          let playload = {
            firstname : '',
            lastname : '',
            address : '',
            phonenumber:'',
            userId : data.data._id
          }
          this.address.addAddress(playload).subscribe(
            data => {
              console.log(data);
            },
            err => {
              console.log(err);
            }
          )
          this.router.navigate(['/signin']);
        }else{
          alert('Cannot Sign up');
        }
      },
      err => {
        console.log(err);
        alert('Cannot Sign up');
      });
  }

  
  get fromdata(){
    console.log(this.signupForm.controls);
    

    return this.signupForm.controls
  }

  
  
}
