import { Component, OnInit } from '@angular/core';

import { ImageGalleryService } from '../image-gallery.service';
import { Image } from '../image.model';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { ViewImageComponent } from '../view-image/view-image.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  images: Image[] = [];
  filteredImages: Image[] = [];
  searchTerm: string = '';
  sortBy: string = '';
  isMobile: boolean = false;

  constructor(
    private dialog: MatDialog,
    private bottomSheet: MatBottomSheet,
    private breakpointObserver: BreakpointObserver,
    private imageGalleryService: ImageGalleryService
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Handset, '(max-width: 768px)'])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });

    this.fetchImages();
  }

  onSearch() {
    this.filteredImages = this.images.filter((image) =>
      image.tags.some((tag) => tag.includes(this.searchTerm))
    );
  }

  onSort() {
    this.filteredImages.sort((a, b) => {
      if (this.sortBy === 'name') return a.name.localeCompare(b.name);
      if (this.sortBy === 'date') return +new Date(b.uploadDate) - +new Date(a.uploadDate);
      if (this.sortBy === 'size') return b.size - a.size;
      return 0;
    });
  }

  resetSearch() {
    this.searchTerm = '';
    this.filteredImages = [...this.images];
  }

  openViewImageDialog(image: Image) {
    if (this.isMobile) {
      this.bottomSheet.open(ViewImageComponent, { data: { image } });
    } else {
      this.dialog.open(ViewImageComponent, {
        width: '600px',
        data: { image },
      });
    }
  }

  openEditImageDialog(image: Image) {
    //   if (this.isMobile) {
    //     this.bottomSheet.open(EditImageComponent, { data: { image } });
    //   } else {
    //     this.dialog.open(EditImageComponent, {
    //       width: '600px',
    //       data: { image },
    //     });
    //   }
  }

  openDeleteDialog(imageId: string) {
    let dialogRef;

    if (this.isMobile) {
      dialogRef = this.bottomSheet.open(DeleteDialogComponent, {
        data: { imageId },
      });
      dialogRef.afterDismissed().subscribe(() => {
        this.fetchImages();
      });
    } else {
      dialogRef = this.dialog.open(DeleteDialogComponent, {
        width: '400px',
        data: { imageId },
      });
      dialogRef.afterClosed().subscribe(() => {
        this.fetchImages();
      });
    }
  }

  private fetchImages() {
    // const sub = this.imageGalleryService.getImages().subscribe((imgs) => {
    //   this.images = imgs;
    //   this.filteredImages = [...this.images];
    // });
    // sub.unsubscribe();
  }
}
