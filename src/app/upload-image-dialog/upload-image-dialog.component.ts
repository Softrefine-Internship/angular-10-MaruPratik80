import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Image } from '../image.model';

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
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
  ) {}

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
      this.dialogRef.close(newImage);
    }
  }
}
