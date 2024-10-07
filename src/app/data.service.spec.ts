import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { DataService } from './data.service';
import { provideHttpClient } from '@angular/common/http';
import { Movie } from './movie/models/movie.model';
import { Character } from './character/models/character.model';
import { Starship } from './starship/starship.model';
import { Vehicle } from './vehicle/vehicle.model';
import { Planet } from './planet/planet.model';
import { Species } from './species/species.model';

describe('DataService', () => {
  let service: DataService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(DataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => { httpMock.verify(); });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a movie by ID', () => {
    const dummyMovie: Movie = {
      title: 'A New Hope',
      episode_id: 4,
      opening_crawl: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....",
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: '1977-05-25',
      characters: [
        "https://swapi.dev/api/people/1/",
      ],
      planets: [
        "https://swapi.dev/api/planets/1/",
      ],
      starships: [
        "https://swapi.dev/api/starships/2/",
      ],
      vehicles: [
        "https://swapi.dev/api/vehicles/4/",
      ],
      species: [
		    "https://swapi.dev/api/species/1/",
      ],
      created: '2014-12-10T14:23:31.880000Z',
      edited: '2014-12-20T19:49:45.256000Z',
      url: 'https://swapi.dev/api/films/1/'
    };

    service.getMovieById(1).subscribe((movie: Movie) => {
      expect(movie).toEqual(dummyMovie);
    });

    const req = httpMock.expectOne('https://swapi.dev/api/films/1/');
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('https://swapi.dev/api/films/1/');
    req.flush(dummyMovie);
  });

    it('should retrieve a character by URL', () => {
    const dummyCharacter: Character = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
        films: [
		"https://swapi.dev/api/films/1/",
      ],
    species: [],
    vehicles: [
		"https://swapi.dev/api/vehicles/14/",
    ],
    starships: [
		"https://swapi.dev/api/starships/12/",
    ],
    created: '2014-12-09T13:50:51.644000Z',
    edited: '2014-12-20T21:17:56.891000Z',
    url: 'https://swapi.dev/api/people/1/'
    };

    service.getCharacterByUrl('https://swapi.dev/api/people/1/').subscribe(character => {
      expect(character).toEqual(dummyCharacter);
    });

    const req = httpMock.expectOne('https://swapi.dev/api/people/1/');
    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('https://swapi.dev/api/people/1/');
    req.flush(dummyCharacter);
  });

  it('should retrieve a starship by URL', () => {
    const dummyStarship: Starship = {
      name: 'Star Destroyer',
      url: 'https://swapi.dev/api/starships/3/'
    };

      service.getStarshipByUrl('https://swapi.dev/api/starships/3/').subscribe(starship => {
        expect(starship).toEqual(dummyStarship);
      });

      const req = httpMock.expectOne('https://swapi.dev/api/starships/3/');
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe('https://swapi.dev/api/starships/3/');
      req.flush(dummyStarship);
  });

  it('should retrieve a vehicle by URL', () => {
    const dummyVehicle: Vehicle = {
      name: 'Snowspeeder',
      url: 'https://swapi.dev/api/vehicles/14/'
    };

      service.getVehicleByUrl('https://swapi.dev/api/vehicles/14/').subscribe(vehicle => {
        expect(vehicle).toEqual(dummyVehicle);
      });

      const req = httpMock.expectOne('https://swapi.dev/api/vehicles/14/');
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe('https://swapi.dev/api/vehicles/14/');
      req.flush(dummyVehicle);
  });

  it('should retrieve a planet by URL', () => {
    const dummyPlanet: Planet = {
      name: 'Yavin IV',
      url: 'https://swapi.dev/api/planets/3/'
    };

      service.getPlanetByUrl('https://swapi.dev/api/planets/3/').subscribe(planet => {
        expect(planet).toEqual(dummyPlanet);
      });

      const req = httpMock.expectOne('https://swapi.dev/api/planets/3/');
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe('https://swapi.dev/api/planets/3/');
      req.flush(dummyPlanet);
  });

  it('should retrieve a species by URL', () => {
    const dummySpecies: Species = {
      name: 'Wookie',
      url: 'https://swapi.dev/api/species/3/'
    };

      service.getSpeciesByUrl('https://swapi.dev/api/species/3/').subscribe(species => {
        expect(species).toEqual(dummySpecies);
      });

      const req = httpMock.expectOne('https://swapi.dev/api/species/3/');
      expect(req.request.method).toBe('GET');
      expect(req.request.url).toBe('https://swapi.dev/api/species/3/');
      req.flush(dummySpecies);
  });
})
