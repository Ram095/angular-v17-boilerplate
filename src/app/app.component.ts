import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { getLoading } from './store/shared/shared.selector';
import { SharedState } from './store/shared/shared.state';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [DecimalPipe],
})
export class AppComponent {
  title = 'angular-boilerplate';
  showLoader!: Observable<boolean>;
  constructor(private store: Store<SharedState>) {
    this.showLoader = this.store.select(getLoading);
  }
}
