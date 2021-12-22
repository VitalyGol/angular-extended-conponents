import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.css']
})
export class BottomSheetComponent {

  private $isOpen: boolean;
  @Input() set isOpen(val: boolean) {
    const body = document.body;
    body.style.overflow = val ? 'hidden' : 'auto';
    this.$isOpen = val;
  }

  get isOpen() {
    return this.$isOpen;
  }

  @Input() title: string;
  @Output() OnClose: EventEmitter<void> = new EventEmitter();

  constructor() {
    const body = document.querySelector('body');
    body.style.overflow = 'hidden';

  }

  close() {
    this.OnClose.emit();
  }

}
