import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

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
  
  getPerson(userId: number) {
    let url = this.server + '/person/' + userId;
    return this.http.get(url)
      .map(res => res.json())
      .toPromise()
      .then(response => response.person)
      .then((person: Person) => {
        // Chrome Date Field requires dates to be formatted
        person.birthDate = new Date(person.birthDate);
        return person;
      });
  }
  
  
  saveUser(user: Person) {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    let headers = {headers: header};

    let url = this.server + '/person/' + user.id;
    user.birthDate = this.yyyymmdd2mmddyyyy(user.birthDate);
    console.log("saving with date:", user.birthDate);
    let userString = JSON.stringify(user);

    return this.http.post(url, userString, headers)
      .map(res => res.json())
      .toPromise()
      .then(response => response.person);
  }
  
  private yyyymmdd2mmddyyyy(birthDate: string) {
    let yyyyMMddArray = birthDate.split('-'); // Expect yyyy-mm-dd

    // server stores dates formatted, so return mm/dd/yyyy
    return yyyyMMddArray[1] + '/' + yyyyMMddArray[2] + '/' + yyyyMMddArray[0];
  }
}
