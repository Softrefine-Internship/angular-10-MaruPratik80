import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ImageGalleryService } from '../image-gallery.service';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss'],
})
export class UploadImageDialogComponent {
  imageName = '';
  imageFile: File | null = null;
  dataUrl!: any;
  tags: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    private imageGalleryService: ImageGalleryService
  ) {}

  onFileSelected(event: any) {
    const [file] = event.target.files;
    this.imageFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const image = { url: reader.result };
      console.log(typeof reader.result);
      this.dataUrl = image;
    };
    reader.onerror = function () {
      console.log(reader.error);
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
    this.tags = this.tags.filter((t) => t !== tag);
  }

  saveImage() {
    if (this.imageFile) {
      this.imageGalleryService.uploadImage(this.dataUrl).subscribe((url) => {
        console.log(url);
        this.dialogRef.close({
          name: this.imageName,
          url: url,
          tags: this.tags,
          date: new Date(),
          size: this.imageFile?.size || 0,
        });
      });
    }
  }
}
