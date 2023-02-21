import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-reactive-form';
  name = 'Reactive form example';
  submitFlag: boolean = false;
  addUserFlag: boolean = true;
  userForm!: FormGroup;
  registeredUsers: any = [];
  editedUser: any = {};

  constructor(private fb: FormBuilder) {
    this.registeredUsers = [
      {
        id: 'DOB_1403',
        firstName: 'Akhil',
        lastName: 'Kumar',
        email: 'akhil@gmail.com',
        phone: '9959479459',
        company: 'BuzzBoard',
        gender: 'male',
        dob: '14-03-1991',
        password: 'Akhil123',
        confirmPassword: 'Akhil123'
      },
      {
        id: 'DOB_0907',
        firstName: 'Rahul',
        lastName: 'Dev',
        email: 'rahul@gmail.com',
        phone: '8923193993',
        company: 'Infosys',
        gender: 'male',
        dob: '09-07-1990',
        password: 'Nikhil123',
        confirmPassword: 'Nikhil123'
      },
      {
        id: 'DOB_2706',
        firstName: 'Sampath',
        lastName: 'Kumar',
        email: 'sam@gmail.com',
        phone: '9703037744',
        company: 'Cognizant',
        gender: 'male',
        dob: '27-06-1989',
        password: 'Sam123',
        confirmPassword: 'Sam123'
      }
    ];
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/[0-9]{10}/g)]],
      company: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  get formValues() {
    return this.userForm.controls;
  }

  addUser() {
    this.addUserFlag = true;
    this.editedUser = {};
    this.submitFlag = false;
    this.userForm.reset();
  }

  submitForm() {
    this.submitFlag = true;
    if (this.userForm.invalid) {
      return;
    }
    if (this.addUserFlag) {
      let newUser: any = this.userForm.value;
      let dob_pass = this.userForm.value.dob.split('-');
      let newId = `DOB_${dob_pass[2]}${dob_pass[1]}`;
      console.log(newId);
      newUser.id = newId;
      this.registeredUsers.push(newUser);
    } else if (this.editedUser) {
      let userIndex = this.registeredUsers.findIndex(
        (        item: { id: any; }) => item.id === this.editedUser.id
      );
      if (userIndex != -1) {
        this.registeredUsers[userIndex] = this.userForm.value;
      }
    }
    this.addUserFlag = true;
    this.submitFlag = false;
    this.userForm.reset();
  }

  editUser(editUser: any) {
    this.addUserFlag = false;
    console.log(editUser);
    this.editedUser = editUser;
    this.userForm.patchValue({
      firstName: editUser.firstName,
      lastName: editUser.lastName,
      email: editUser.email,
      phone: editUser.phone,
      company: editUser.company,
      gender: editUser.gender,
      dob: editUser.dob,
      password: editUser.password,
      confirmPassword: editUser.confirmPassword
    });
  }

  deleteUser(user :any) {
    this.registeredUsers = this.registeredUsers.filter(
      (      item: { id: any; }) => item.id != user.id
    );
    this.addUserFlag = true;
    this.userForm.reset();
  }

  cancelForm() {
    this.addUserFlag = true;
    this.userForm.reset();
    this.editedUser = {};
  }

  changeVal1(eve: any) {
    console.log(eve);
  }

  changeVal2(eve:any) {
    console.log(eve);
  }
}
