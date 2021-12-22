import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent implements OnInit {

  @Input() open: boolean;
  @Input() title: string;
  @Input() showHeader: boolean;
  @Input() showFooter: boolean;

  @Output() OnClose: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.open = false;
  }

  ngOnInit(): void {
  }

  Close() {
    this.OnClose.emit();
  }

}
