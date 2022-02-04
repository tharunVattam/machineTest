import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,FormBuilder,Validators} from '@angular/forms';
import { AppserviceService } from '../appservice.service';
import { Router } from '@angular/router';
import { NameValidatorService } from '../name-validator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  signForm:FormGroup;
  logging:boolean=true;
  signing=false;
  errorMessage='';
  show=false;
  show2=false;

  constructor(private fb:FormBuilder,private appService:AppserviceService,
    private nameValidate:NameValidatorService,private router:Router) { 
    this.loginForm=this.fb.group({
      userName:['',[Validators.required]],
      password:['',[Validators.required]]
    })
    this.signForm=this.fb.group({
      userName:['',{
        validators:[Validators.required,Validators.minLength(6)],
        asyncValidators:[this.nameValidate.validate.bind(this.nameValidate)]
      }],
      password:['',[Validators.required,this.passwordValidation]],
      repassword:['',[Validators.required]]
    })
  }
  toggleLogin(){
    this.logging=(!this.logging);
  }

  ngOnInit(): void {
  }
  passwordValidation(control:FormControl){
    let value = control.value;
    const isWhitespace = /^(?=.*\s)/;
    
    if (isWhitespace.test(value)) {
      return {pass:{message:"Password must not contain Whitespaces."}};
    }


    const isContainsUppercase = /^(?=.*[A-Z])/;
    if (!isContainsUppercase.test(value)) {
      return {pass:{message:"Password must have at least one Uppercase Character."}};
    }


    const isContainsLowercase = /^(?=.*[a-z])/;
    if (!isContainsLowercase.test(value)) {
      return {pass:{message:"Password must have at least one Lowercase Character."}};
    }


    const isContainsNumber = /^(?=.*[0-9])/;
    if (!isContainsNumber.test(value)) {
      return {pass:{message:"Password must contain at least one Digit."}};
    }


    const isContainsSymbol =
      /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!isContainsSymbol.test(value)) {
      return {pass:{message:"Password must contain at least one Special Symbol."}};
    }


    const isValidLength = /^.{8,}$/;
    if (!isValidLength.test(value)) {
      return {pass:{message:"Password length should be greater than or equal to 8"}};
    }
    return null;

  }
  login(){
    if(this.loginForm.valid && !this.signing){
      this.signing=true;
      this.appService.login(this.loginForm.value).subscribe(res=>{
        this.signing=false;
        this.appService.userName=this.loginForm.value.userName;
        this.router.navigate(['/home']);

      },err=>{
        this.errorMessage=err.error;
        this.signing=false;
        setTimeout(() => {
          this.errorMessage='';
          
        }, 3000);
      })
    }
  }
  signUp(){
    if(this.signForm.valid && this.signing){
      if(this.signForm.value.password==this.signForm.value.repassword){
        this.signing=true;
        this.appService.signUp(this.signForm.value).subscribe(res=>{
          this.signing=false;
          this.appService.userName=this.signForm.value.userName;
          this.router.navigate(['/home'])
        },err=>{
          this.errorMessage=err.error;
          this.signing=false;
        })

      }
      else{
        this.errorMessage='Passwords did not match';
        setTimeout(() => {
          this.errorMessage='';
          
        }, 3000);
      }

    }
  }

}
