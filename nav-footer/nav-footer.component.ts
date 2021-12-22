import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IFooterLink } from 'src/app/models/footer-link.model';

@Component({
  selector: 'app-nav-footer',
  templateUrl: './nav-footer.component.html',
  styleUrls: ['./nav-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavFooterComponent implements OnInit {

  @Input() caption: string;
  @Input() disclamer: string;
  @Input() bulletLinks: IFooterLink[];
  @Input() bottomLinks: IFooterLink[];

  constructor() { }

  ngOnInit(): void {
  }

}
