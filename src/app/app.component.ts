import { Component } from '@angular/core';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import 'rxjs/Rx'; // For methods for Observables

@Component({
  providers: [HTTP_PROVIDERS],
  selector: 'my-app',
  templateUrl: './app.component.html'
})
export class AppComponent {
  server = 'https://angular-krysnewman.c9users.io:8081';
  people = [];

  constructor(private http: Http) {
  }

  checkSearch(term) {
    if (term.length < 2) {
      this.people = [];
    } else {
      this.http.get(this.server + '/people/' + term)
        .map((res) => res.json())
        .subscribe((response) => {
          this.people = response.people;
        });
    }
  }
}
