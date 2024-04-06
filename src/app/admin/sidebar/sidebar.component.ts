import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() isExpanded: boolean = false;
  @Output() toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();
  lang: string;
  constructor(private translateService: TranslateService) {
    translateService.setDefaultLang('en');
    this.lang = translateService.getDefaultLang();
  }

  handleSidebarToggle = () => {
    this.toggleSidebar.emit(!this.isExpanded);
  };

  changeLanguage(lang: string) {
    this.translateService.use(lang);
    this.lang = lang;
  }
}
