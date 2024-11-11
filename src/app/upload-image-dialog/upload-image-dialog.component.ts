import { Component, Optional } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Image } from '../image.model';
import { ImageGalleryService } from '../image-gallery.service';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss'],
})
export class UploadImageDialogComponent {
  imageName = '';
  imageFile: File | null = null;
  url!: any;
  tags: string[] = [];

  constructor(
    @Optional() public bottomSheetRef: MatBottomSheetRef<UploadImageDialogComponent>,
    @Optional() public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    private imageGalleryService: ImageGalleryService
  ) {}

  get isMobile() {
    return window.innerWidth < 768;
  }

  onFileSelected(files: any) {
    this.imageFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.url = reader.result;
    };
    reader.onerror = function () {
      console.error(reader.error);
    };
  }

  addTag(event: any) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  close() {
    if (this.isMobile) this.bottomSheetRef.dismiss();
    else this.dialogRef.close();
  }

  saveImage() {
    if (this.imageFile) {
      const newImage: Image = {
        id: Date.now(),
        name: this.imageName,
        url: this.url,
        tags: this.tags,
        uploadDate: new Date(),
        modifiedDate: new Date(),
        size: this.imageFile?.size || 0,
      };
      console.log(newImage);
      this.imageGalleryService.addImage(newImage);
      this.close();
    }
  }
}
