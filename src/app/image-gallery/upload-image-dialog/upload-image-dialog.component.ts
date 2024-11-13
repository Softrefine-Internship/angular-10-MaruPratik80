import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Image } from '../image.model';
import { ImageGalleryService } from '../image-gallery.service';
import { FormControl, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.scss'],
})
export class UploadImageDialogComponent implements OnInit {
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  image!: Image | null;
  nameInput!: FormControl;
  size!: number;
  url!: any;
  tags: string[] = [];
  error: string = '';

  get isMobile() {
    return window.innerWidth < 768;
  }

  constructor(
    @Optional() public bottomSheetRef: MatBottomSheetRef<UploadImageDialogComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) private bottomSheetData: Image | null,
    @Optional() public dialogRef: MatDialogRef<UploadImageDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: Image | null,
    private imageGalleryService: ImageGalleryService
  ) {}

  ngOnInit() {
    this.image = this.isMobile ? this.bottomSheetData : this.dialogData;

    let name = '';

    if (this.image) {
      name = this.image.name;
      this.url = this.image.url;
      this.tags = this.image.tags.slice();
    }
    this.nameInput = new FormControl(name, Validators.required);
  }

  onFileSelected(files: any) {
    this.error = files[0].type.includes('image') ? '' : 'Plese upload valid image file';
    this.size = files[0].size;

    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = e => {
      this.url = reader.result;
    };
    reader.onerror = function () {
      console.error(reader.error);
    };
  }

  addTag(event: MatChipInputEvent) {
    const value = event.value.trim();

    if (value) {
      this.tags.push(value);
    }
    event.chipInput.clear();
  }

  removeTag(tag: string) {
    const index = this.tags.indexOf(tag);
    if (index >= 0) this.tags.splice(index, 1);
  }

  editTag(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.removeTag(tag);
      return;
    }
    const index = this.tags.indexOf(tag);
    if (index >= 0) this.tags[index] = value;
  }

  close() {
    if (this.isMobile) this.bottomSheetRef.dismiss();
    else this.dialogRef.close();
  }

  saveImage() {
    if (this.nameInput.invalid || !this.url || this.error) return;

    if (this.image) {
      this.image.name = this.nameInput.value;
      this.image.url = this.url;
      this.image.tags = this.tags;
      this.image.modifiedDate = new Date();

      this.imageGalleryService.updateImage(this.image.id, this.image);
    } else {
      const newImage: Image = {
        id: Date.now(),
        name: this.nameInput.value,
        url: this.url,
        tags: this.tags,
        uploadDate: new Date(),
        modifiedDate: new Date(),
        size: this.size,
      };
      this.imageGalleryService.addImage(newImage);
      console.log(newImage);
    }
    this.close();
  }
}
