import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { takeWhile } from 'rxjs/operators';
import { IGalleryItem } from 'src/app/models/gallery-item.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.css']
})
export class ImageGalleryComponent implements OnInit, OnDestroy {

  private GalleryItems: IGalleryItem[];
  private CountOnPage: number;

  @Input() set galleryItems(items: IGalleryItem[]) {
    this.GalleryItems = items;
    this.calculateCountPages(this.GalleryItems, this.CountOnPage);
  }

  get galleryItems() {
    return this.GalleryItems;
  }

  @Input() set countOnPage(value: number) {
    this.CountOnPage = value;
    this.calculateCountPages(this.GalleryItems, this.CountOnPage);
  }

  get countOnPage() {
    return this.CountOnPage;
  }

  @Input() animated: boolean;
  @Input() umbracoImg: string;

  @Output() ItemClick: EventEmitter<IGalleryItem> = new EventEmitter();

  countPages: number; // Total count pages of items
  activePage: number; // Active visible page of items

  private source = interval(environment.autoScrollTimeinSec * 1000);
  private subscription: Subscription;

  constructor() {
    this.countPages = 1;
    this.umbracoImg = '';
    this.subscription = new Subscription();
    this.subscription.add(this.source.pipe(
      takeWhile(() => this.animated && this.countPages > 0)
    ).subscribe(() => {
      this.animateChangePage();
    }));
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onItemClick(item: IGalleryItem) {
    this.ItemClick.emit(item);
  }

  isActive(index: number) {
    let result = false;
    if (this.countPages === 0) {
      result = true;
    } else {
      result = (this.activePage * this.countOnPage <= index) && (this.activePage * this.countOnPage + this.countOnPage > index);
    }
    return result;
  }

  // Change active page of items to previous
  goPrevContent() {
    if (this.countPages > 0) {
      if (this.activePage === 0) {
        this.activePage = this.countPages;
      } else {
        this.activePage--;
      }
      // Press on button cancel animation effect
      this.animated = false;
    }
  }

  // Change active page of items to next
  goNextContent() {
    if (this.countPages > 0) {
      if (this.activePage === this.countPages) {
        this.activePage = 0;
      } else {
        this.activePage++;
      }
      // Press on button cancel animation effect
      this.animated = false;
    }
  }

  private calculateCountPages(items: IGalleryItem[], countOnPage: number) {
    if (items && countOnPage) {
      if (items.length > 0) {
        this.activePage = 0;
        this.countPages = 0;
        this.countPages = Math.floor(items.length / countOnPage);
        if (items.length % countOnPage === 0 && countOnPage > 0) {
          this.countPages--;
        }
      }
    }
  }

  // Fired on animate on
  animateChangePage() {
    if (this.countPages > 0) {
      if (this.activePage === this.countPages) {
        this.activePage = 0;
      } else {
        this.activePage++;
      }
    }
  }

}
