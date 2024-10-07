import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from './movie/models/movie.model';
import { HttpClient } from '@angular/common/http';
import { Character } from './character/models/character.model';
import { Starship } from './starship/starship.model';
import { Planet } from './planet/planet.model';
import { Species } from './species/species.model';
import { Vehicle } from './vehicle/vehicle.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private http: HttpClient) { }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/films/${id}/`);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/people/${id}/`);
  }

  getStarshipByUrl(url: string): Observable<Starship> {
    return this.http.get<Starship>(url).pipe(
      map((starship: Starship) => ({ name: starship.name, url: starship.url}))
    );
  }

  getPlanetByUrl(url: string): Observable<Planet> {
    return this.http.get<Planet>(url).pipe(
      map((planet: Planet) => ({ name: planet.name, url: planet.url }))
    );
  }

  getSpeciesByUrl(url: string): Observable<Species> {
    return this.http.get<Species>(url).pipe(
      map((species: Species) => ({ name: species.name, url: species.url }))
    );
  }

  getVehicleByUrl(url: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(url).pipe(
      map((vehicle: Vehicle) => ({ name: vehicle.name, url: vehicle.url }))
    );
  }
}
