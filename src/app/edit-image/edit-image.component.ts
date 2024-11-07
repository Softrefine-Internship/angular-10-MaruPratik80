import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageGalleryService } from '../image-gallery.service';
import { Image } from '../image.model';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.scss'],
})
export class EditImageComponent {
  updatedTags: string[];
  updatedName: string;

  constructor(
    public dialogRef: MatDialogRef<EditImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { image: Image },
    private imageGalleryService: ImageGalleryService
  ) {
    this.updatedTags = [...data.image.tags];
    this.updatedName = data.image.name;
  }

  onTagsChange(tagsStr: string) {
    this.updatedTags = tagsStr.split(',').map((tag) => tag.trim());
  }

  saveChanges() {
    this.imageGalleryService.updateImage(this.data.image.id!, {
      name: this.updatedName,
      tags: this.updatedTags,
    });
    this.dialogRef.close();
  }
}
