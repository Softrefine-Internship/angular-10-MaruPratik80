import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

import { UploadImageDialogComponent } from '../upload-image-dialog/upload-image-dialog.component';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';
import { ImageGalleryService } from '../image-gallery.service';
import { Image } from '../image.model';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  images: Image[] = [];
  loadedImages: Image[] = [];
  searchTag: string = '';
  sortOption: string = 'name';
  imagesSub!: Subscription;
  isMobile: boolean = false;

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private breakpointObserver: BreakpointObserver,
    private imageGalleryService: ImageGalleryService
  ) {}

  ngOnInit() {
    this.imagesSub = this.imageGalleryService.imagesChanged.subscribe(images => {
      this.loadedImages = images;
      this.images = this.loadedImages;
    });

    this.breakpointObserver.observe([Breakpoints.Handset, '(max-width: 768px)']).subscribe(result => {
      this.isMobile = result.matches;
    });
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadImageDialogComponent);
    dialogRef.afterClosed().subscribe(newImage => {
      if (newImage) this.imageGalleryService.addImage(newImage);
    });
  }

  openTagDialog(image: Image) {
    if (this.isMobile) {
      const bottomSheetRef = this.bottomSheet.open(TagDialogComponent, {
        data: image,
      });
      bottomSheetRef.afterDismissed().subscribe(updatedTags => {
        if (updatedTags) {
          image.tags = updatedTags;
          this.imageGalleryService.updateimage(image.id, image);
        }
      });
    } else {
      const dialogRef = this.dialog.open(TagDialogComponent, { data: image });
      dialogRef.afterClosed().subscribe(updatedTags => {
        if (updatedTags) {
          image.tags = updatedTags;
          this.imageGalleryService.updateimage(image.id, image);
        }
      });
    }
  }

  search() {
    if (this.searchTag) {
      this.images = this.images.filter(image => image.tags.includes(this.searchTag));
    }
  }

  resetSearch() {
    this.searchTag = '';
  }

  sortImages() {
    this.images.slice().sort((a, b) => {
      if (this.sortOption === 'name') return a.name.localeCompare(b.name);
      if (this.sortOption === 'date') return +new Date(a.uploadDate) - +new Date(b.uploadDate);
      return a.size - b.size;
    });
  }

  ngOnDestroy(): void {
    this.imagesSub.unsubscribe();
  }
}
