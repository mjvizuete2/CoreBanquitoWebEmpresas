import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recupera-contra',
  templateUrl: './recupera-contra.component.html',
  styleUrls: ['./recupera-contra.component.css'],
})
export class RecuperaContraComponent implements OnInit {
  recuperaForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.recuperaForm = this.formBuilder.group({
      usuario: ['', Validators.required],
    });
  }

  get f() {
    return this.recuperaForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.recuperaForm.invalid) {
      return;
    }

    console.log(this.recuperaForm.value);
  }
}
