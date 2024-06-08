import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,     
    private router: Router
  ) { }

  ngOnInit(): void {
    this.registroForm = this.formBuilder.group({
      ruc: ['', [Validators.required, Validators.pattern(/^\d{13}$/), Validators.minLength(13)]],
      docIdentidad: ['', [Validators.required, Validators.pattern(/^\d{10}$/), Validators.minLength(10)]]
    });
    
  }

  get f() { return this.registroForm.controls; }


  onSubmit() {
    this.submitted = true;

    if (this.registroForm.valid) {
      const credentials = this.registroForm.value;
      // this.loginService.login(credentials).subscribe(
      //   (response) => {
      //     console.log('Login successful', response);
      //   },
      //   (error) => {
      //     console.error('Login failed', error);
      //   }
      // );
      this.router.navigate(['/login']);
    }
  }
}