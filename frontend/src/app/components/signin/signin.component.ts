import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  authForm = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[Validators.required]),
  });
  constructor(private auth: AuthService,private router: Router) { }

  ngOnInit(): void {
  }
  signin(){
  console.log(this.authForm.value)
      this.auth.signin(this.authForm.value).subscribe(
        data => {
          if(data.status == true){
            this.router.navigate([''])
          }else{
            alert('Email or Password is insorrect');
          }
        },
        err => {
          console.log(err);
          alert('Email or Password is insorrect');
        });
  }
  signup(){
    this.router.navigate(['/signup']);
  }


  
  
  get fromdata(){
    console.log(this.authForm.controls);
    return this.authForm.controls
  }


}
