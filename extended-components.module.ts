import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal/modal.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselVideoComponent } from './carousel-video/carousel-video.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NavFooterComponent } from './nav-footer/nav-footer.component';
import { AutocompleteInputComponent } from './autocomplete-input/autocomplete-input.component';
import { NavTabsComponent } from './nav-tabs/nav-tabs.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { RouterModule } from '@angular/router';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';



@NgModule({
  declarations: [
    ModalComponent,
    CarouselComponent,
    CarouselVideoComponent,
    SafeUrlPipe,
    NavBarComponent,
    NavFooterComponent,
    AutocompleteInputComponent,
    NavTabsComponent,
    ImageGalleryComponent,
    BottomSheetComponent,
    ExpansionPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ModalComponent,
    CarouselComponent,
    CarouselVideoComponent,
    NavBarComponent,
    NavFooterComponent,
    AutocompleteInputComponent,
    NavTabsComponent,
    ImageGalleryComponent,
    BottomSheetComponent,
    ExpansionPanelComponent
  ]
})
export class ExtendedComponentsModule { }
