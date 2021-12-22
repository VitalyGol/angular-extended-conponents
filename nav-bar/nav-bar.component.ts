import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMenu } from 'src/app/models/menu.model';
import { IResponsiveImage } from '../models/image-responsive';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {

  toggleMenu = false;

  @Input() navBrandImage: IResponsiveImage;
  @Input() rightMenu: IMenu[];
  @Input() leftMenu: IMenu[];
  @Input() fixed: boolean;

  @Output() OnMenuLeftItemClick: EventEmitter<IMenu> = new EventEmitter();

  constructor() {
    this.fixed = false;
  }

  menuLeftItemClick(item: IMenu) {
    this.toggleMenu = false;
    this.OnMenuLeftItemClick.emit(item);
  }

  showSideMenu() {
    this.toggleMenu = true;
  }

  hideSideMenu() {
    this.toggleMenu = false;
  }

}
