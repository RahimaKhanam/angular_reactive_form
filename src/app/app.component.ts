import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { passwordMatchingValidatior } from './password.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-reactive-form';
  submitFlag: boolean = false;
  addUserFlag: boolean = true;
  userForm!: FormGroup;
  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$";
  enrolledUsers = [
    {
      userId: 'USER_2106',
      firstName: 'Rohit',
      lastName: 'Kumar',
      email: 'Rohit@gmail.com',
      phone: '8898976567',
      company: 'Amazon',
      gender: 'male',
      dob: '1978-06-21',
      password: 'Rohit@123',
      confirmPassword: 'Rohit@123'
    },
    {
      userId: 'USER_2804',
      firstName: 'Shweta',
      lastName: 'Chauhaan',
      email: 'shweta@gmail.com',
      phone: '8976546785',
      company: 'Google',
      gender: 'female',
      dob: '1994-04-28',
      password: 'Shewata@123',
      confirmPassword: 'Shewata@123'
    },
    {
      userId: 'USER_1608',
      firstName: 'Mariyam',
      lastName: 'Rana',
      email: 'mar@gmail.com',
      phone: '9876758768',
      company: 'Asus',
      gender: 'female',
      dob: '1998-08-16',
      password: 'Rana@123',
      confirmPassword: 'Rana@123'
    }
  ];
  editUserDetails: any = {};

  constructor() {
  }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      phone: new FormControl('', [Validators.required, Validators.pattern(this.mobNumberPattern)]),
      company: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,  Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: passwordMatchingValidatior });
  }

  get formValues() {
    return this.userForm.controls;
  }

  addUser() {
    this.addUserFlag = true;
    this.editUserDetails = {};
    this.submitFlag = false;
    this.userForm.reset();
  }

  submitForm() {
    this.submitFlag = true;
    if (this.userForm.invalid) {
      return;
    }
    if (this.addUserFlag) {
      let userDetails: any = this.userForm.value;
      let dob_array = this.userForm.value.dob.split('-');
      let newId = `USER_${dob_array[2]}${dob_array[1]}`;
      userDetails.userId = newId;
      this.enrolledUsers.push(userDetails);
    } else if (this.editUserDetails) {
      let userIndex = this.enrolledUsers.findIndex(
        (item: { userId: any; }) => item.userId === this.editUserDetails.userId
      );
      if (userIndex != -1) {
        this.enrolledUsers[userIndex] = this.userForm.value;
      }
    }
    this.addUserFlag = true;
    this.submitFlag = false;
    this.userForm.reset();
  }

  editUser(data: any) {
    this.addUserFlag = false;
    this.editUserDetails = data;
    this.userForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      company: data.company,
      gender: data.gender,
      dob: data.dob,
      password: data.password,
      confirmPassword: data.confirmPassword
    });
  }

  deleteUser(data: any) {
    this.enrolledUsers = this.enrolledUsers.filter(
      (item: { userId: any; }) => item.userId != data.userId
    );
    this.addUserFlag = true;
    this.userForm.reset();
  }

  cancelForm() {
    this.addUserFlag = true;
    this.userForm.reset();
    this.editUserDetails = {};
  }
}
