import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { CachingService } from '../../../caching.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { Character } from '../../../character/models/character.model';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;
  characters: Character[] = [];
  isLoading: boolean = false;

  constructor(private cache: CachingService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.params['id']);
    this.fetchMovieDetails(movieId);
  }

  private fetchMovieDetails(movieId: number): void {
    this.isLoading = true;

    this.cache.getMovieById(movieId).subscribe(movie => {
    this.movie = movie;

      forkJoin({
        characters: forkJoin(movie.characters.map(url =>
                    this.cache.getCharacterById(Number(this.extractIdFromUrl(url)))))
      }).subscribe({
        next: (v) => {
          this.characters = v.characters;
          this.isLoading = false;
        },
        error: (e) => {
          console.error('Error fetching data:', e);
          this.isLoading = false;
        }
      });
    });
  }

    extractIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}

