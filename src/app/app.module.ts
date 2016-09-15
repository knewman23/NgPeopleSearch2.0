import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { PersonService } from './person.service';
import { AppComponent } from './app.component';
import { GenderPipe } from './gender.pipe';
import { appRouterProviders } from './app.routes';
import { ShowComponent } from './show/show.component';
import { SearchComponent } from './search/search.component';
import { EditComponent } from './edit/edit.component';
import { CookieService } from 'angular2-cookie/core';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    GenderPipe,
    ShowComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule,
    appRouterProviders
  ],
  providers: [PersonService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
