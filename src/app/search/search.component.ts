import { Component } from '@angular/core';
import 'rxjs/Rx'; // For methods for Observables
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService, Person } from '../person.service'; // Needed to reference PersonService in this file


@Component({
  selector: 'app-root',
  templateUrl: './search.component.html'
})

export class SearchComponent {
  people: Person[] = [];
  private predicate: string = 'first';
  private reverse: boolean = false; // Will be needed for reverse sort
  private searchInput: FormControl;  
  private cookieKey = 'query';

  constructor(private personService: PersonService,
              private route: ActivatedRoute) {
    this.searchInput = new FormControl();
    const keystrokeTimeWait = 500;
    this.searchInput.valueChanges
      .debounceTime(keystrokeTimeWait)
      .subscribe((newValue) => this.checkSearch(newValue));
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let term = params['term']; 
      if (term) this.checkSearch(term);
    });
  }
  
  toggleSortOrder(column: string, newSearch = false) {
    if (column === this.predicate && !newSearch) {
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
    console.log("Searching...");
    if (term.length < 2) {
      this.people = [];
    } else {
      this.personService.getPeople(term) // Assuming the personService returns a Promise 
        .then((people) => {              // We would follow up with a then()
          this.toggleSortOrder(this.predicate, true);
          this.people = people;          // <-- Assumes the Promise resolves to an array
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
