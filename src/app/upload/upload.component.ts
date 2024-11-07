import { Component } from '@angular/core';
import { ImageGalleryService } from '../image-gallery.service';
import { Image } from '../image.model';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  tags: string[] = [];
  image: Image | null = null;

  constructor(private imageGalleryService: ImageGalleryService) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.image = {
          url: reader.result as string,
          name: file.name,
          size: file.size,
          date: new Date(),
          tags: this.tags,
        };
      };
      reader.readAsDataURL(file);
    }
  }

  addTag(tag: string) {
    this.tags.push(tag);
  }

  uploadImage() {
    if (this.image) {
      this.imageGalleryService.addImage(this.image);
      this.image = null;
      this.tags = [];
    }
  }
}
