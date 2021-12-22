import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { ISlider } from 'src/app/models/slider.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy {

  @Input() sliderItems: ISlider[];
  @Input() animated: boolean;
  umbracoImg: string;
  activeIndex = 0;

  // Animate visible items
  private source = interval(environment.autoScrollTimeinSec * 1000);
  private subscription: Subscription;

  constructor() {
    this.sliderItems = [];
    this.umbracoImg = environment.umbracoImg;
    this.subscription = new Subscription();
    this.subscription.add(this.source.pipe(
      takeWhile(() => this.animated && this.sliderItems?.length > 1)
    ).subscribe(() => {
      this.animateChangePage();
    }));

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  setActive(index: number): void {
    this.activeIndex = index;
  }

  onItemClick(link) {
    if (link) {
      try {
        const json = JSON.parse(link)[0];
        if (json.url) {
          window.open(json.url, '_blank');
          this.animated = false;
        }
      } catch { }
    }
  }

  animateChangePage() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.sliderItems.length - 1;
    }
  }

  goPrev(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    } else {
      this.activeIndex = this.sliderItems.length - 1;
    }
    this.animated = false;
  }

  goNext(): void {
    if (this.activeIndex + 1 < this.sliderItems.length) {
      this.activeIndex++;
    } else {
      this.activeIndex = 0;
    }
    this.animated = false;
  }

}
