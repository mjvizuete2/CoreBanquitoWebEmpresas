import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OnBoardingService } from 'src/app/Services/onboardingService';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { OrdenesService } from 'src/app/Services/ordenes.service';

@Component({
  selector: 'app-on-boarding',
  templateUrl: './on-boarding.component.html',
  styleUrls: ['./on-boarding.component.css'],
})
export class OnBoardingComponent implements OnInit {
  posForm!: FormGroup;
  usuario: any;
  contract: any;

  submitted = false;
  public recaudos: any[] = [];

  constructor(
    private onBoardingService:OnBoardingService,
    private formBuilder: FormBuilder,
    private ordenesService: OrdenesService,
    private router: Router,private authService:AuthService) {
      this.usuario=authService.getUser();
     }

     obtenerContract(): void {
      const currentUserStr = localStorage.getItem('currentUser');
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        this.ordenesService.empresaxGmail(currentUser.email).subscribe(
          response => {
            this.contract = response.contractAcceptance
            ;
           
          },
          error => {
            console.error('Error al obtener la contract:', error);
          }
        );
      } else {
        console.error('No se encontró currentUser en localStorage.');
      }
    }

  ngOnInit(): void {
    this.posForm = this.formBuilder.group({
      acceptTerms: [''],
    });
    this.obtenerContract();

  }

  get f() {
    return this.posForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.contract)


    console.log(this.posForm.value.acceptTerms);
    this.onBoardingService.setTermsAccepted(this.posForm.value.acceptTerms);
    this.router.navigate(['/posicionConsolidada']);
  }

}
