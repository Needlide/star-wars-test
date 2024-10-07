import { Component, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { CachingService } from '../../../caching.service';
import { ActivatedRoute } from '@angular/router';
import { Starship } from '../../../starship/starship.model';
import { forkJoin } from 'rxjs';
import { Vehicle } from '../../../vehicle/vehicle.model';
import { Planet } from '../../../planet/planet.model';
import { Species } from '../../../species/species.model';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit {
  movie: Movie | undefined;
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
        starships: forkJoin(movie.starships.map(url => this.cache.getStarshipByUrl(url))),
        vehicles: forkJoin(movie.vehicles.map(url => this.cache.getVehicleByUrl(url))),
        planets: forkJoin(movie.planets.map(url => this.cache.getPlanetByUrl(url))),
        species: forkJoin(movie.species.map(url => this.cache.getSpeciesByUrl(url)))
      }).subscribe({
        next: (relatedData) => {
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

