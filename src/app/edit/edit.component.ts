import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonService, Person } from '../person.service'; // Needed to reference PersonService in this file
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  person: Person = null;
  genders = [{long: 'Female', short: 'F'}, {long: 'Male', short: 'M'}];
  private editForm: FormGroup;

  constructor(private personService: PersonService,
              private router: Router,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) { 
    this.editForm = formBuilder.group({
      'first': ['', [Validators.required, Validators.minLength(2)]],
      'last': ['', [Validators.required, Validators.minLength(2)]],
      'ssn': ['', [Validators.required, Validators.pattern('^\d{3}-\d{2}-\d{4}$')]],
      'birthDate': [''],
      'gender': ['']
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
     let id = +params['id']; // (+) converts string 'id' to a number

     this.personService.getPerson(id).then((person) => {
       person.birthDate = this.dateFormatter(person.birthDate);
       this.person = person;
     });
   });
  }
  
  savePerson() {
    this.personService.saveUser(this.person).then(() => {
      this.showPerson();
    });
  }
  
  showPerson() {
    this.router.navigate(['/show', this.person.id]);
  }
  
  dateFormatter(date) {
   let year = date.getFullYear();
   let month =("0" + (date.getMonth() +　1)).slice(-2)
   let day = ("0" + (date.getDate())).slice(-2);
   return year + '-' + month + '-' + day;
  }
}
