import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { isAuthenticated } from '../../auth/state/auth.selector';
import { AuthState } from '../../auth/state/auth.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  lang: string;

  isAuthenticated!: Observable<boolean>;
  constructor(
    private translateService: TranslateService,
    private store: Store<AuthState>,
    private authService: AuthService
  ) {
    translateService.setDefaultLang('en');
    this.lang = translateService.getDefaultLang();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }

  handleSidebarToggle = () => {
    this.toggleSidebar.emit(!this.isExpanded);
  };

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.lang = lang;
  }

  logout() {
    this.authService.logOut();
  }
}
