import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';
import { AppState } from '../../store/app.state';
import { getPosts } from './state/list.selector';

@Component({
  selector: 'app-page-three',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './page-three.component.html',
  styleUrl: './page-three.component.scss',
})
export class PageThreeComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.posts$ = this.store.select(getPosts);
  }
}
