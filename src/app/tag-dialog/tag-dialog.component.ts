import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { Image } from '../image.model';
import { ImageGalleryService } from '../image-gallery.service';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss'],
})
export class TagDialogComponent implements OnInit {
  image!: Image;
  tags: string[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  get isMobile() {
    return window.innerWidth < 768;
  }

  constructor(
    @Optional() private bottomSheetRef: MatBottomSheetRef<TagDialogComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) private bottomSheetData: Image,
    @Optional() private dialogRef: MatDialogRef<TagDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: Image,
    private imageGalleryService: ImageGalleryService
  ) {}

  ngOnInit(): void {
    this.image = this.isMobile ? this.bottomSheetData : this.dialogData;
    this.tags = this.image.tags.slice();
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && !this.tags.includes(value)) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  close() {
    if (this.isMobile) this.bottomSheetRef.dismiss();
    else this.dialogRef.close();
  }

  saveTags() {
    this.image.tags = this.tags;
    this.image.modifiedDate = new Date();
    this.imageGalleryService.updateImage(this.image.id, this.image);
    this.close();
  }
}
