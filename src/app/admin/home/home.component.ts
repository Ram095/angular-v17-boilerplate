import { DecimalPipe } from '@angular/common';
import { Component, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import data from '../../../assets/data/countries.json';
interface Country {
  name: string;
  flag: string;
  area: number;
  population: number;
}
@Component({
  selector: 'app-landing',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  Countries: Country[] = data;

  countries$: Observable<Country[]>;
  filter = new FormControl('', { nonNullable: true });
  constructor(pipe: DecimalPipe) {
    this.countries$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe))
    );
  }

  search(text: string, pipe: PipeTransform): Country[] {
    return this.Countries.filter((country) => {
      const term = text.toLowerCase();
      return (
        country.name.toLowerCase().includes(term) ||
        pipe.transform(country.area).includes(term) ||
        pipe.transform(country.population).includes(term)
      );
    });
  }
}
