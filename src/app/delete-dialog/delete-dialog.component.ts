import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { ImageGalleryService } from '../image-gallery.service';
import { Image } from '../image.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent implements OnInit {
  image!: Image;

  get isMobile() {
    return window.innerWidth < 768;
  }

  constructor(
    @Optional() private bottomSheetRef: MatBottomSheetRef<DeleteDialogComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) private bottomSheetData: Image,
    @Optional() private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: Image,
    private imageGalleryService: ImageGalleryService
  ) {}

  ngOnInit(): void {
    this.image = this.isMobile ? this.bottomSheetData : this.dialogData;
  }

  close() {
    if (this.isMobile) this.bottomSheetRef.dismiss();
    else this.dialogRef.close();
  }

  deleteImage() {
    this.imageGalleryService.deleteImage(this.image.id);
    this.close();
  }
}
