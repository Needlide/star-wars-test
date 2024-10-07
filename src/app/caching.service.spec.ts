import { TestBed } from '@angular/core/testing';

import { CachingService } from './caching.service';
import { DataService } from './data.service';
import { Movie } from './movie/models/movie.model';
import { of } from 'rxjs';
import { Character } from './character/models/character.model';
import { Starship } from './starship/starship.model';
import { Species } from './species/species.model';
import { Planet } from './planet/planet.model';
import { Vehicle } from './vehicle/vehicle.model';

describe('CachingService', () => {
  let service: CachingService;
  let dataServiceSpy: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('DataService', [
      'getMovieById',
      'getCharacterById',
      'getStarshipByUrl',
      'getPlanetByUrl',
      'getSpeciesByUrl',
      'getVehicleByUrl'
    ]);

    TestBed.configureTestingModule({
      providers: [
        CachingService,
        { provide: DataService, useValue: spy }
      ]
    });
    service = TestBed.inject(CachingService);
    dataServiceSpy = TestBed.inject(DataService) as jasmine.SpyObj<DataService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovieById', () => {
    it('should return a cached movie if available', () => {
      const dummyMovie: Movie = {
        episode_id: 1,
        title: 'A New Hope',
        opening_crawl: '',
        director: '',
        producer: '',
        release_date: '',
        created: '',
        edited: '',
        characters: [],
        planets: [],
        species: [],
        starships: [],
        vehicles: [],
        url: '' };

      service['cachedMovies'].set(1, dummyMovie); // Cache dummy movie

      service.getMovieById(1).subscribe(result => {
        expect(result).toEqual(dummyMovie);
      });

      expect(dataServiceSpy.getMovieById).not.toHaveBeenCalled();
    });

    it('should fetch a movie via API if not cached and cache it', () => {
      const dummyMovie: Movie = {
        episode_id: 1,
        title: 'A New Hope',
        opening_crawl: '',
        director: '',
        producer: '',
        release_date: '',
        created: '',
        edited: '',
        characters: [],
        planets: [],
        species: [],
        starships: [],
        vehicles: [],
        url: '' };

      dataServiceSpy.getMovieById.and.returnValue(of(dummyMovie));

      service.getMovieById(1).subscribe((result) => {
        expect(result).toEqual(dummyMovie);
        expect(service['cachedMovies'].get(1)).toEqual(dummyMovie);
      });

      expect(dataServiceSpy.getMovieById).toHaveBeenCalledOnceWith(1);
    });
  });

  describe('getCharacterById', () => {
     it('should return a cached character if available', () => {
       const dummyCharacter: Character = {
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: ''
      };

      const id = 1;

      service['cachedCharacters'].set(id, dummyCharacter); // Cache dummy character

      service.getCharacterById(id).subscribe(result => {
        expect(result).toEqual(dummyCharacter);
      });

      expect(dataServiceSpy.getCharacterById).not.toHaveBeenCalled();
    });

    it('should fetch a character via API if not cached and cache it', () => {
      const dummyCharacter: Character = {
        name: '',
        height: '',
        mass: '',
        hair_color: '',
        skin_color: '',
        eye_color: '',
        birth_year: '',
        gender: '',
        homeworld: '',
        films: [],
        species: [],
        vehicles: [],
        starships: [],
        created: '',
        edited: '',
        url: ''
      };

      dataServiceSpy.getCharacterById.and.returnValue(of(dummyCharacter));

      const id = 1;

      service.getCharacterById(id).subscribe((result) => {
        expect(result).toEqual(dummyCharacter);
        expect(service['cachedCharacters'].get(id)).toEqual(dummyCharacter);
      });

      expect(dataServiceSpy.getCharacterById).toHaveBeenCalledOnceWith(id);
    });
  });

  describe('getStarshipByUrl', () => {
    it('should return a cached starship if available', () => {
       const dummyStarship: Starship = {
         name: '',
         url: ''
      };

      const url = 'https://swapi.dev/api/starships/1/';

      service['cachedStarships'].set(url, dummyStarship); // Cache dummy starship

      service.getStarshipByUrl(url).subscribe(result => {
        expect(result).toEqual(dummyStarship);
      });

      expect(dataServiceSpy.getStarshipByUrl).not.toHaveBeenCalled();
    });

    it('should fetch a starship via API if not cached and cache it', () => {
      const dummyStarship: Starship = {
        name: '',
        url: ''
      };

      dataServiceSpy.getStarshipByUrl.and.returnValue(of(dummyStarship));

      const url = 'https://swapi.dev/api/starships/1/';

      service.getStarshipByUrl(url).subscribe((result) => {
        expect(result).toEqual(dummyStarship);
        expect(service['cachedStarships'].get(url)).toEqual(dummyStarship);
      });

      expect(dataServiceSpy.getStarshipByUrl).toHaveBeenCalledOnceWith(url);
    });
  });

  describe('getVehicleByUrl', () => {
    it('should return a cached Vehicle if available', () => {
       const dummyVehicle: Vehicle = {
         name: '',
         url: ''
      };

      const url = 'https://swapi.dev/api/vehicles/1/';

      service['cachedVehicles'].set(url, dummyVehicle); // Cache dummy vehicle

      service.getVehicleByUrl(url).subscribe(result => {
        expect(result).toEqual(dummyVehicle);
      });

      expect(dataServiceSpy.getVehicleByUrl).not.toHaveBeenCalled();
    });

    it('should fetch a vehicle via API if not cached and cache it', () => {
      const dummyVehicle: Vehicle = {
        name: '',
        url: ''
      };

      dataServiceSpy.getVehicleByUrl.and.returnValue(of(dummyVehicle));

      const url = 'https://swapi.dev/api/vehicles/1/';

      service.getVehicleByUrl(url).subscribe((result) => {
        expect(result).toEqual(dummyVehicle);
        expect(service['cachedVehicles'].get(url)).toEqual(dummyVehicle);
      });

      expect(dataServiceSpy.getVehicleByUrl).toHaveBeenCalledOnceWith(url);
    });
  });

  describe('getPlanetByUrl', () => {
    it('should return a cached planet if available', () => {
       const dummyPlanet: Planet = {
         name: '',
         url: ''
      };

      const url = 'https://swapi.dev/api/planets/1/';

      service['cachedPlanets'].set(url, dummyPlanet); // Cache dummy planet

      service.getPlanetByUrl(url).subscribe(result => {
        expect(result).toEqual(dummyPlanet);
      });

      expect(dataServiceSpy.getPlanetByUrl).not.toHaveBeenCalled();
    });

    it('should fetch a planet via API if not cached and cache it', () => {
      const dummyPlanet: Planet = {
        name: '',
        url: ''
      };

      dataServiceSpy.getPlanetByUrl.and.returnValue(of(dummyPlanet));

      const url = 'https://swapi.dev/api/planets/1/';

      service.getPlanetByUrl(url).subscribe((result) => {
        expect(result).toEqual(dummyPlanet);
        expect(service['cachedPlanets'].get(url)).toEqual(dummyPlanet);
      });

      expect(dataServiceSpy.getPlanetByUrl).toHaveBeenCalledOnceWith(url);
    });
  });

  describe('getSpeciesByUrl', () => {
    it('should return a cached species if available', () => {
       const dummySpecies: Species = {
         name: '',
         url: ''
      };

      const url = 'https://swapi.dev/api/species/1/';

      service['cachedSpecies'].set(url, dummySpecies); // Cache dummy character

      service.getSpeciesByUrl(url).subscribe(result => {
        expect(result).toEqual(dummySpecies);
      });

      expect(dataServiceSpy.getSpeciesByUrl).not.toHaveBeenCalled();
    });

    it('should fetch a species via API if not cached and cache it', () => {
      const dummySpecies: Species = {
        name: '',
        url: ''
      };

      dataServiceSpy.getSpeciesByUrl.and.returnValue(of(dummySpecies));

      const url = 'https://swapi.dev/api/species/1/';

      service.getSpeciesByUrl(url).subscribe((result) => {
        expect(result).toEqual(dummySpecies);
        expect(service['cachedSpecies'].get(url)).toEqual(dummySpecies);
      });

      expect(dataServiceSpy.getSpeciesByUrl).toHaveBeenCalledOnceWith(url);
    });
  });
});
