import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { IVideoSliderItem } from 'src/app/models/video-slider-item.model';

@Component({
  selector: 'app-carousel-video',
  templateUrl: './carousel-video.component.html',
  styleUrls: ['./carousel-video.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarouselVideoComponent implements OnInit, OnChanges {

  @Input() caption: string;
  @Input() sliderItems: IVideoSliderItem[];
  @Input() countInRow: number;
  umbracoImg: string;
  activeIndex = 0;
  countPages = 0;

  constructor() {

  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    const sliderItems = changes.sliderItems?.currentValue || this.sliderItems || [];
    const cnt = changes.countInRow?.currentValue || this.countInRow || 1;
    this.calculateCountPages(sliderItems, cnt);

  }

  isActive(index: number) {
    return (this.activeIndex * this.countInRow <= index) && (this.activeIndex * this.countInRow + this.countInRow > index);
  }

  counter(i: number) {
    return new Array(Math.floor(i));
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  goPrev(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.countPages - 1;
    }
  }

  goNext(): void {
    if (this.activeIndex + 1 < this.countPages) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
  }

  private calculateCountPages(items: IVideoSliderItem[], countOnPage: number) {
    if (items && countOnPage) {
      if (items.length > 0) {
        this.activeIndex = 0;
        this.countPages = Math.ceil(items.length / countOnPage);
      }
    }
  }
}
