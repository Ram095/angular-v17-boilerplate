import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { CounterButtonComponent } from './counter-button/counter-button.component';
import { CounterOutputComponent } from './counter-output/counter-output.component';
import { CounterComponent } from './counter/counter.component';

@Component({
  selector: 'app-page-two',
  standalone: true,
  imports: [CounterComponent],
  templateUrl: './page-two.component.html',
  styleUrl: './page-two.component.scss',
})
export class PageTwoComponent {}
