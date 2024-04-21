import { Component } from '@angular/core';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-page-two',
  standalone: true,
  imports: [CounterComponent],
  templateUrl: './page-two.component.html',
  styleUrl: './page-two.component.scss',
})
export class PageTwoComponent {}
