import { Component } from '@angular/core';
import 'rxjs/Rx'; // For methods for Observables
import { PersonService, Person } from './person.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})


export class AppComponent {
  people: Person[] = [];
   
  constructor(private personService: PersonService) {
  }

  ngOnInit() {
  }

  checkSearch(term: string) {
    if (term.length < 2) {
      this.people = [];
    } else {
      this.personService.getPeople(term) // Assuming the personService returns a Promise 
        .then((people) => {              // We would follow up with a then()
          this.people = people;          // <-- Assumes the Promise resolves to an array
        })
    }
  }

}