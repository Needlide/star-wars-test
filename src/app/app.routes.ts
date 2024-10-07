import { Routes } from '@angular/router';
import { MovieListComponent } from './movie/components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie/components/movie-details/movie-details.component';

export const routes: Routes = [
  { path: '', component: MovieListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent }
];
