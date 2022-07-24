import { Movieface } from './../interface/movieface';
import { MoviesService } from './../services/movies.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private _MoviesService: MoviesService) {}
  trendingMovies!: Partial<Movieface>[];
  moviesSubscrip: Subscription = new Subscription();
  trendingTv!: Partial<Movieface>[];
  tvSubscrip: Subscription = new Subscription();
  trendingPerson!: Partial<Movieface>[];
  personSubscrip: Subscription = new Subscription();
  prefixImg: string = 'https://image.tmdb.org/t/p/original';
  isLoding: boolean = true;
  ngOnInit(): void {
    setTimeout(() => {
      this.getTrendingMovies();
      this.getTrendingTv();
      this.getTrendingPerson();
    }, 500);
  }
  // get trending movies
  getTrendingMovies() {
    this.moviesSubscrip = this._MoviesService.getTrending('movie').subscribe({
      next: (response) => {
        this.trendingMovies = response.results.slice(0, 10);
      },
      complete: () => {
        this.isLoding = false;
      },
    });
  }
  // get trending tv
  getTrendingTv() {
    this.tvSubscrip = this._MoviesService.getTrending('tv').subscribe({
      next: (response) => {
        this.trendingTv = response.results.slice(0, 10);
      },
    });
  }
  // get trending person
  getTrendingPerson() {
    this.personSubscrip = this._MoviesService.getTrending('person').subscribe({
      next: (response) => {
        this.trendingPerson = response.results.slice(0, 10);
      },
    });
  }
  // when go out component
  ngOnDestroy(): void {
    this.moviesSubscrip.unsubscribe();
    this.tvSubscrip.unsubscribe();
    this.personSubscrip.unsubscribe();
  }
}
