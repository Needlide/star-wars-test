import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character } from '../../models/character.model';
import { Movie } from '../../../movie/models/movie.model';
import { CachingService } from '../../../caching.service';
import { forkJoin } from 'rxjs';
import { Planet } from '../../../planet/planet.model';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-character-details',
  standalone: true,
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    RouterModule,
    MatListModule,
    MatCardModule,
    MatExpansionModule
  ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss'
})
export class CharacterDetailsComponent implements OnInit {
  character: Character | undefined;
  homeworld: Planet | undefined;
  movies: Movie[] = [];
  isLoading: boolean = false;

  constructor(private cache: CachingService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const characterId = Number(this.route.snapshot.params['id']);
    this.fetchCharacterData(characterId);
  }

  private fetchCharacterData(characterId: number) {
   this.isLoading = true;

   this.cache.getCharacterById(characterId).subscribe(character => {
    this.character = character;

    forkJoin({
      homeworld: this.cache.getPlanetByUrl(character.homeworld),
      movies: forkJoin(character.films.map(url =>
      this.cache.getMovieById(Number(this.extractIdFromUrl(url)))))
    }).subscribe({
      next: (v) => {
        this.homeworld = v.homeworld;
        this.movies = v.movies;
        this.isLoading = false;
      },
      error: (e) => {
        console.error('Error fetching data', e);
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
