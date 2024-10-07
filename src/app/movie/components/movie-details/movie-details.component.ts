import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { CachingService } from '../../../caching.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Starship } from '../../../starship/starship.model';
import { forkJoin } from 'rxjs';
import { Vehicle } from '../../../vehicle/vehicle.model';
import { Planet } from '../../../planet/planet.model';
import { Species } from '../../../species/species.model';
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
  starships: Starship[] = [];
  vehicles: Vehicle[] = [];
  planets: Planet[] = [];
  species: Species[] = [];
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
        characters: forkJoin(movie.characters.map(url => this.cache.getCharacterByUrl(url))),
        starships: forkJoin(movie.starships.map(url => this.cache.getStarshipByUrl(url))),
        vehicles: forkJoin(movie.vehicles.map(url => this.cache.getVehicleByUrl(url))),
        planets: forkJoin(movie.planets.map(url => this.cache.getPlanetByUrl(url))),
        species: forkJoin(movie.species.map(url => this.cache.getSpeciesByUrl(url)))
      }).subscribe({
        next: (relatedData) => {
          this.characters = relatedData.characters;
          this.starships = relatedData.starships;
          this.vehicles = relatedData.vehicles;
          this.planets = relatedData.planets;
          this.species = relatedData.species;
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

