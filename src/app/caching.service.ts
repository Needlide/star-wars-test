import { Injectable } from '@angular/core';
import { Movie } from './movie/models/movie.model';
import { Character } from './character/models/character.model';
import { Starship } from './starship/starship.model';
import { Planet } from './planet/planet.model';
import { Vehicle } from './vehicle/vehicle.model';
import { Species } from './species/species.model';
import { DataService } from './data.service';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private cachedMovies = new Map<number, Movie>();
  private cachedCharacters = new Map<number, Character>();
  private cachedStarships = new Map<string, Starship>();
  private cachedPlanets = new Map<string, Planet>();
  private cachedVehicles = new Map<string, Vehicle>();
  private cachedSpecies = new Map<string, Species>();

  constructor(private dataService: DataService) { }

  getMovieById(id: number): Observable<Movie> {
    const movie = this.cachedMovies.get(id);

    if (movie) {
      return of(movie);
    } else {
      return this.dataService.getMovieById(id).pipe(
        tap((movie: Movie) => this.cachedMovies.set(id, movie)) // Cache the movie after retrieving
      );
    }
  }

  getCharacterById(id: number): Observable<Character> {
    const character = this.cachedCharacters.get(id);

    if (character) {
      return of(character);
    } else {
      return this.dataService.getCharacterById(id).pipe(
        tap((character: Character) => this.cachedCharacters.set(id, character))
      );
    }
  }

  getStarshipByUrl(url: string): Observable<Starship> {
    const starship = this.cachedStarships.get(url);

    if (starship) {
      return of(starship);
    } else {
      return this.dataService.getStarshipByUrl(url).pipe(
        tap((starship: Starship) => this.cachedStarships.set(url, starship))
      );
    }
  }

  getPlanetByUrl(url: string): Observable<Planet> {
    const planet = this.cachedPlanets.get(url);

    if (planet) {
      return of(planet);
    } else {
      return this.dataService.getPlanetByUrl(url).pipe(
        tap((planet: Planet) => this.cachedPlanets.set(url, planet))
      );
    }
  }

  getVehicleByUrl(url: string): Observable<Vehicle> {
    const vehicle = this.cachedVehicles.get(url);

    if (vehicle) {
      return of(vehicle);
    } else {
      return this.dataService.getVehicleByUrl(url).pipe(
        tap((vehicle: Vehicle) => this.cachedVehicles.set(url, vehicle))
      );
    }
  }

  getSpeciesByUrl(url: string): Observable<Species> {
    const species = this.cachedSpecies.get(url);

    if (species) {
      return of(species);
    } else {
      return this.dataService.getSpeciesByUrl(url).pipe(
        tap((species: Species) => this.cachedSpecies.set(url, species))
      );
    }
  }
}
