import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnBoardingService } from 'src/app/Services/onboardingService';
import { Router } from '@angular/router';


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
    private router: Router
  ) {}
  
  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  ngOnInit(): void {
    this.posForm = this.formBuilder.group({
      acceptTerms: [''],
    });
    this.usuario = this.getItem('usuario');
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
