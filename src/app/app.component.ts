import { Component } from '@angular/core';
import 'rxjs/Rx'; // For methods for Observables
import { PersonService, Person } from './person.service';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html'
})

export class AppComponent {
  people: Person[] = [];
  private predicate: string = 'first';
  private reverse: boolean = false; 
   
  constructor(private personService: PersonService) {}

  ngOnInit() { }


   toggleSortOrder(column: string, newSearch = false) {
    if (column === this.predicate && !newSearch) {
      // User clicked on the same column that's already being used to sort.
      // Reverse the sort.
      this.people.reverse();
      this.reverse = !this.reverse;
    } else {
      this.predicate = column;
      this.reverse = false;
      this.people.sort((itemOne, itemTwo) =>
        (itemOne[column] < itemTwo[column]) ? -1 :
          (itemOne[column] > itemTwo[column]) ? 1 : 0
      );
    }
  }

  checkSearch(term: string) {
    if (term.length < 2) {
      this.people = [];
    } else {
      this.personService.getPeople(term)
        .then((people) => {    
          people.forEach((person) => {
            person.birthDate = new Date(person.birthDate); 
          })
          this.people = people;
        })
    }
  }

  arrow(column: string) {
    if (!this.reverse && (this.predicate === column)) {
      return '▲';
    }
    if (this.reverse && (this.predicate === column)) {
      return '▼';
    }
    return '';
  }

}