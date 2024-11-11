import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { Image } from './image.model';

@Injectable({
  providedIn: 'root',
})
export class ImageGalleryService {
  imagesChanged = new Subject<Image[]>();
  private images: Image[] = [];

  constructor(private http: HttpClient) {}

  addImage(image: Image) {
    console.log(this.images);
    if (!this.images) this.images = [];
    this.images.push(image);
    this.imagesChanged.next(this.images.slice());
    this.uploadImages();
  }

  updateImage(id: number, updatedImage: Image) {
    const index = this.images.findIndex(image => image.id === id);
    this.images[index] = updatedImage;
    this.imagesChanged.next(this.images.slice());
    this.uploadImages();
  }

  deleteImage(id: number) {
    this.images = this.images.filter(image => image.id !== id);
    this.imagesChanged.next(this.images.slice());
    this.uploadImages();
  }

  fetchImages() {
    this.http.get<Image[]>(environment.API_URL + 'images.json').subscribe(images => {
      this.images = images;
      this.imagesChanged.next(this.images.slice());
    });
  }

  private uploadImages() {
    this.http.put(environment.API_URL + 'images.json', this.images).subscribe(res => {
      console.log(res);
    });
  }
}
