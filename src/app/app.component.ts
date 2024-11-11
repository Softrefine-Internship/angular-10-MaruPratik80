import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ImageGalleryService } from './image-gallery.service';
import { UploadImageDialogComponent } from './upload-image-dialog/upload-image-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private imageGalleryService: ImageGalleryService,
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet
  ) {}

  get isMobile() {
    return window.innerWidth < 768;
  }

  ngOnInit(): void {
    this.imageGalleryService.fetchImages();
  }

  openUploadDialog() {
    if (this.isMobile) this.bottomSheet.open(UploadImageDialogComponent);
    else this.dialog.open(UploadImageDialogComponent);
  }
}
