import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Subscription } from 'rxjs';

import { UploadImageDialogComponent } from '../upload-image-dialog/upload-image-dialog.component';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ImageGalleryService } from '../image-gallery.service';
import { Image } from '../image.model';
import { ViewImageDialogComponent } from '../view-image-dialog/view-image-dialog.component';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit, OnDestroy {
  images: Image[] = [];
  searchTag: string = '';
  searchTags: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  sortBy!: keyof Image;
  imagesSub!: Subscription;

  constructor(
    private imageGalleryService: ImageGalleryService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {}

  announcer = inject(LiveAnnouncer);

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.searchTags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.searchTags.indexOf(tag);
    if (index >= 0) {
      this.searchTags.splice(index, 1);
      this.announcer.announce(`Removed ${tag}`);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    const index = this.searchTags.indexOf(tag);
    if (index >= 0) {
      this.searchTags[index] = value;
    }
  }

  get isMobile() {
    return window.innerWidth < 768;
  }

  get filteredImages() {
    return (
      this.images
        // .filter(image => image.tags.join(', ').toLowerCase().includes(this.searchTag.trim().toLowerCase()))
        .filter(image =>
          this.searchTags.length > 0
            ? image.tags.some(tag => this.searchTags.some(searchTag => searchTag === tag))
            : true
        )
        .sort((a: Image, b: Image) => (b[this.sortBy] > a[this.sortBy] ? -1 : 1))
    );
  }

  ngOnInit() {
    this.imagesSub = this.imageGalleryService.imagesChanged.subscribe(images => {
      this.images = images;
    });
  }

  resetSearch() {
    this.searchTag = '';
    this.searchTags = [];
  }

  openUploadDialog() {
    if (this.isMobile) this.bottomSheet.open(UploadImageDialogComponent);
    else this.dialog.open(UploadImageDialogComponent);
  }

  openViewImageDialog(image: Image) {
    if (this.isMobile) this.bottomSheet.open(ViewImageDialogComponent, { data: image });
    else this.dialog.open(ViewImageDialogComponent, { data: image });
  }

  openTagDialog(image: Image) {
    if (this.isMobile) this.bottomSheet.open(TagDialogComponent, { data: image });
    else this.dialog.open(TagDialogComponent, { data: image });
  }

  openDeleteDialog(image: Image) {
    if (this.isMobile) this.bottomSheet.open(DeleteDialogComponent, { data: image });
    else this.dialog.open(DeleteDialogComponent, { data: image, minWidth: '30rem', width: '33rem' });
  }

  ngOnDestroy(): void {
    this.imagesSub.unsubscribe();
  }
}
