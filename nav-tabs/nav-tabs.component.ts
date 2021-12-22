import { Component, Output, EventEmitter, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['./nav-tabs.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavTabsComponent implements OnInit {

  private TabList: string[];
  private Size: number;
  hiddenTabs: string[];
  visibleTabs: string[];

  @Input() selectedTab: string;
  @Output() TabClick: EventEmitter<string> = new EventEmitter();

  @Input() set tabList(tabs: string[]) {
    this.TabList = tabs;
    this.ReCalculateVisibilityTabs(this.TabList, this.Size);
  }

  get tabList() {
    return this.TabList;
  }

  @Input() set size(val: number) {
    this.Size = val;
    this.ReCalculateVisibilityTabs(this.TabList, this.Size);
  }

  get size() {
    return this.Size;
  }

  constructor() {}

  ngOnInit(): void {
  }

  onTabClick(item: string) {
    this.TabClick.emit(item);
  }

  goPrev() {
    if (this.hiddenTabs.length > 0) {
      const visibleElement = this.visibleTabs.shift();
      const hiddenElement = this.hiddenTabs.pop();
      this.visibleTabs.push(hiddenElement);
      this.hiddenTabs.unshift(visibleElement);
      if (this.hiddenTabs.length > 0) {
        this.TabClick.emit(this.visibleTabs[0]);
      }
    }
  }

  // Queue change visibilty of tiles
  goNext() {
    if (this.hiddenTabs.length > 0) {
      const visibleElement = this.visibleTabs.pop();
      const hiddenElement = this.hiddenTabs.shift();
      this.visibleTabs.unshift(hiddenElement);
      this.hiddenTabs.push(visibleElement);
      if (this.hiddenTabs.length > 0) {
        this.TabClick.emit(hiddenElement);
      }
    }
  }

  private ReCalculateVisibilityTabs(tabs: string[], size: number) {
    if (tabs && size) {
      this.visibleTabs = [];
      this.hiddenTabs = [].concat(tabs);
      if (this.selectedTab) {
        while (this.hiddenTabs[0] !== this.selectedTab) {
          this.hiddenTabs.push(this.hiddenTabs.shift());
        }
      }
      if (this.hiddenTabs && this.hiddenTabs.length > 0) {
        for (let index = 0; index < size && this.hiddenTabs.length > 0; index++) {
          const element = this.hiddenTabs.shift();
          this.visibleTabs.push(element);
        }
      }
    }
  }


}
