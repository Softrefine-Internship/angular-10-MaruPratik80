import { Component, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.scss'],
})
export class TagDialogComponent {
  tags: string[];
  isBottomSheet: boolean = false;

  constructor(
    @Optional() public bottomSheetRef: MatBottomSheetRef<TagDialogComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) public bottomSheetData: any,
    @Optional() public dialogRef: MatDialogRef<TagDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {
    this.isBottomSheet = !!this.bottomSheetData;
    if (this.isBottomSheet) this.tags = [...bottomSheetData.tags];
    else this.tags = [...dialogData.tags];
  }

  addTag(tag: string) {
    if (tag && !this.tags.includes(tag)) {
      this.tags.push(tag);
    }
  }

  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }

  saveTags() {
    if (this.isBottomSheet) this.bottomSheetRef.dismiss(this.tags);
    else this.dialogRef.close(this.tags);
  }
}
