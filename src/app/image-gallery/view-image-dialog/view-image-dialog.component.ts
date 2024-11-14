import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';
import { Image } from '../image.model';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image-dialog.component.html',
  styleUrls: ['./view-image-dialog.component.scss'],
})
export class ViewImageDialogComponent implements OnInit {
  image!: Image;

  get isMobile() {
    return window.innerWidth < 768;
  }

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    @Optional() private bottomSheetRef: MatBottomSheetRef<ViewImageDialogComponent>,
    @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) private bottomSheetData: Image,
    @Optional() private dialogRef: MatDialogRef<ViewImageDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: Image
  ) {}

  ngOnInit(): void {
    this.image = this.isMobile ? this.bottomSheetData : this.dialogData;
  }

  openTagDialog() {
    if (this.isMobile) this.bottomSheet.open(TagDialogComponent, { data: this.image, disableClose: true });
    else this.dialog.open(TagDialogComponent, { data: this.image, disableClose: true });
  }

  close() {
    if (this.isMobile) this.bottomSheetRef.dismiss();
    else this.dialogRef.close();
  }
}
