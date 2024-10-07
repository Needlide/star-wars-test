import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Movie } from '../../models/movie.model';
import { CachingService } from '../../../caching.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [
    MatListModule,
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {
  movies: Movie[] = [];
  isLoading = false;

  constructor(private cache: CachingService) {
    this.fetchMovies();
  }

  private fetchMovies(): void {
    this.isLoading = true;

    const movieRequests = [];

    for (let id = 1; id <= 6; id++) {
      movieRequests.push(this.cache.getMovieById(id));
    }

    forkJoin(movieRequests).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.isLoading = false;
      },
      error: (e) => {
        console.error('Error fetching movies:', e);
        this.isLoading = false;
      }
    });
  }

  extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}
