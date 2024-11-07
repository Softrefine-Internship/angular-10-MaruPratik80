import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { ImageGalleryService } from '../image-gallery.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
})
export class DeleteDialogComponent {
  isBottomSheet: boolean = false;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public bottomSheetData: { imageId: string } | null,
    @Inject(MAT_DIALOG_DATA) public dialogData: { imageId: string } | null,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private bottomSheetRef: MatBottomSheetRef<DeleteDialogComponent>,
    private imageGalleryService: ImageGalleryService
  ) {
    this.isBottomSheet = !!this.bottomSheetData;
  }

  deleteImage() {
    const imageId = this.dialogData?.imageId || this.bottomSheetData?.imageId;
    if (imageId) {
      this.imageGalleryService.deleteImage(imageId);
      if (this.isBottomSheet) {
        this.bottomSheetRef.dismiss();
      } else {
        this.dialogRef.close();
      }
    }
  }
}
