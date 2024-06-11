import { Component, OnInit, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export function forbiddenNameValidator(name: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return name === control.value
      ? { forbiddenName: { value: control.value } }
      : null;
  };
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  nameControl = new FormControl('Nancy');

  userForm = new FormGroup({
    userName: new FormControl({value: 'Tom', disabled: true}, V),
    userAge: new FormControl('31'),
  });

  ngOnInit(): void {
  }

  updateName() {
    this.nameControl.setValue('Loky');
  }

  submit() {
    console.log(this.userForm.value);
    console.log(this.userForm.getRawValue());
  }
}
