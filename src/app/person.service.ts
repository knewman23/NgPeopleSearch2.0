import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

export class Person {
  id: number;
  first: string;
  middle: string;
  last: string;
  gender: string;
  ssn: string;
  salary: string;
  birthDate: any;
}

@Injectable()
export class PersonService {
  server = 'https://angular-krysnewman.c9users.io:8081';

  constructor(private http: Http) { }

  getPeople(term: string): Promise <Person[]> {
    return this.http.get(this.server + '/people/' + term)
      .map(function (res) { return res.json(); })
      .map((res) => res.people)
      .map((people) => {
        people.forEach((person) => 
          {person.birthDate = new Date(person.birthDate); })
        return people;
      })
      .toPromise()
  }
}
