import {Routes, RouterModule} from '@angular/router';
import {SearchComponent} from  './search/search.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: 'show/:id', component: ShowComponent},
  {path: 'edit/:id', component: EditComponent},
  {path: 'search/:term', component: SearchComponent},
  {path: '**', component: SearchComponent}
];

export const appRouterProviders = RouterModule.forRoot(routes)