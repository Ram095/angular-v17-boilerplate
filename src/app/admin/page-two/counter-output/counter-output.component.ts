import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CounterState } from '../../../models/counter.model';
import { getCounter, getCounterName } from '../state/counter.selector';

@Component({
  selector: 'app-counter-output',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.scss',
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  counter!: number;
  counterName!: string;
  counterSubscription!: Subscription;
  counter$?: Observable<number>;
  constructor(private store: Store<CounterState>) {}

  ngOnInit() {
    this.counter$ = this.store.select(getCounter);

    this.store.select(getCounterName).subscribe((counterName) => {
      this.counterName = counterName;
    });
  }

  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
