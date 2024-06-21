import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnBoardingService } from 'src/app/Services/onboardingService';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.css'],
})
export class OnBoardingComponent implements OnInit {
  posForm!: FormGroup;
  usuario: any;
  submitted = false;
  public recaudos: any[] = [];

  constructor(
    private onBoardingService:OnBoardingService,
    private formBuilder: FormBuilder,
    private router: Router,private authService:AuthService) {
      this.usuario=authService.getUser();
     }



  ngOnInit(): void {
    this.posForm = this.formBuilder.group({
      acceptTerms: [''],
    });
  }

  get f() {
    return this.posForm.controls;
  }

  onSubmit() {
    this.submitted = true;


    console.log(this.posForm.value.acceptTerms);
    this.onBoardingService.setTermsAccepted(this.posForm.value.acceptTerms);
    this.router.navigate(['/posicionConsolidada']);
  }

}
