import { Component, OnInit } from '@angular/core';
import { PersonService, Person } from '../person.service'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  person: Person = null;

  constructor(private personService: PersonService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
     let id = +params['id']; // (+) converts string 'id' to a number

     this.personService.getPerson(id).then((person) => {
       this.person = person;
     });
   });
  }

}
