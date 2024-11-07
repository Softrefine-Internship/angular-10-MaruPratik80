import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageDialogComponent } from '../upload-image-dialog/upload-image-dialog.component';
import { TagDialogComponent } from '../tag-dialog/tag-dialog.component';
import { ImageGalleryService } from '../image-gallery.service';

interface Image {
  id: string;
  name: string;
  url: string;
  tags: string[];
  date: Date;
  size: number;
}

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss'],
})
export class ImageGalleryComponent implements OnInit {
  images: Image[] = [];
  searchTag: string = '';
  sortOption: string = 'name';

  constructor(
    private dialog: MatDialog,
    private imageGalleryService: ImageGalleryService
  ) {}

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    this.imageGalleryService.imagesUpdate.subscribe((images: any) => {
      this.images = images;
    });
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(UploadImageDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadImages();
    });
  }

  openTagDialog(image: Image) {
    const dialogRef = this.dialog.open(TagDialogComponent, { data: image });
    dialogRef.afterClosed().subscribe((updatedTags) => {
      if (updatedTags) image.tags = updatedTags;
    });
  }

  search() {
    if (this.searchTag) {
      this.images = this.images.filter((image) =>
        image.tags.includes(this.searchTag)
      );
    }
  }

  resetSearch() {
    this.searchTag = '';
    this.loadImages();
  }

  sortImages() {
    this.images.sort((a, b) => {
      if (this.sortOption === 'name') return a.name.localeCompare(b.name);
      if (this.sortOption === 'date')
        return +new Date(a.date) - +new Date(b.date);
      return a.size - b.size;
    });
  }
}
