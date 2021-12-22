import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AutocompleteInputComponent implements OnInit {

  @Input() selectedResults: string[];
  @Input() placeholder: string;
  @Output() inputChange: EventEmitter<string> = new EventEmitter();
  @Output() inputSearch: EventEmitter<string> = new EventEmitter();
  @Output() resultSelect: EventEmitter<string> = new EventEmitter();
  currentValue = '';
  showResults = true;


  constructor() {
    this.selectedResults = [];
  }

  ngOnInit() {
  }

  onChange($event) {
    this.inputChange.emit($event.target.value);
  }

  onButtonSearch() {
    this.selectedResults = [];
    this.inputSearch.emit(this.currentValue);
  }

  onSearch($event: KeyboardEvent) {
    // Check pressed char is printable
    if ($event.key.length === 1) {
      const value = ($event.target as HTMLInputElement).value;
      this.currentValue = value;
      this.selectedResults = [];
      this.inputSearch.emit(value);
    }
  }

  onSelect($event) {
    this.currentValue = $event;
    this.selectedResults = [];
    this.resultSelect.emit($event);
  }

  customSplit(item: string) {
    const result = [];
    const value = this.currentValue;
    if (value.trim() === '') {
      result.push(item);
    } else {
      let startValue = 0;
      for (let index = 0; index < item.length - (value.length - 1);) {
        let same = true;
        for (const iterator of value) {
          const char = item[index];
          index++;
          if (char !== iterator) {
            same = false;
            break;
          }
        }
        if (same) {
          result.push(item.slice(startValue, index - value.length), value);
          startValue = index;
        }
      }
      result.push(item.slice(startValue));
    }
    return result;
  }

}
