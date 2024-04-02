import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { AdminService } from '../admin.service';
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
export class HomeComponent implements OnInit {
  countries!: Country[];
  countries$!: Observable<Country[]>;
  filter = new FormControl('', { nonNullable: true });
  constructor(public pipe: DecimalPipe, public adminService: AdminService) {}
  ngOnInit(): void {
    this.getCountryData();
  }

  getCountryData() {
    this.adminService.getCountryList().subscribe((res) => {
      this.countries = res;
      this.countries$ = this.filter.valueChanges.pipe(
        startWith(''),
        map((text) => this.search(text, this.pipe))
      );
    });
  }

  search(text: string, pipe: PipeTransform): Country[] {
    return this.countries.filter((country) => {
      const term = text.toLowerCase();
      return (
        country.name.toLowerCase().includes(term) ||
        pipe.transform(country.area).includes(term) ||
        pipe.transform(country.population).includes(term)
      );
    });
  }
}
