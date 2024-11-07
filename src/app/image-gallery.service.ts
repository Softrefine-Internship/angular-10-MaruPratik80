import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Image } from './image.model';

@Injectable({
  providedIn: 'root',
})
export class ImageGalleryService {
  imagesUpdate = new Subject<any[]>();
  private images: any = [];
  private imageCollection = [];

  constructor(private http: HttpClient) {}
  uploadImage(image: Image) {
    console.log(image);
    return this.http
      .post(
        'https://image-gallery-ng-default-rtdb.asia-southeast1.firebasedatabase.app/images.json',
        image
      )
      .pipe(
        map((res) =>
          Object.entries(res).map((arr) => {
            return { id: arr[0], ...arr[1] };
          })
        )
      );
  }

  getImages() {
    return this.http
      .get(
        'https://image-gallery-ng-default-rtdb.asia-southeast1.firebasedatabase.app/images.json'
      )
      .pipe(
        map((resData) =>
          resData
            ? Object.entries(resData).map((arr) => {
                return { id: arr[0], ...arr[1] };
              })
            : resData
        )
      );
  }

  addImage(image: Image) {}

  updateImage(id: string, imageData: Partial<Image>) {}

  deleteImage(id: string) {
    this.http.delete(
      'https://image-gallery-ng-default-rtdb.asia-southeast1.firebasedatabase.app/images.json/' +
        id
    );
  }
}
