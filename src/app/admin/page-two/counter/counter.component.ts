import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CounterState } from '../../../models/counter.model';
import { CounterButtonComponent } from '../counter-button/counter-button.component';
import { CounterOutputComponent } from '../counter-output/counter-output.component';
import { changeCounterName, customIncrement } from '../state/counter.action';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CounterButtonComponent, CounterOutputComponent, FormsModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent {
  customValue!: number;
  customText!: string;
  constructor(private store: Store<CounterState>) {}
  addCustomCounter() {
    if (this.customValue) {
      this.store.dispatch(customIncrement({ count: this.customValue }));
    }
  }

  changeText() {
    if (this.customText) {
      this.store.dispatch(changeCounterName({ text: this.customText }));
    }
  }
}
