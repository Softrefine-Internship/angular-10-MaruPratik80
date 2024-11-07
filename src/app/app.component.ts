import { Component, OnDestroy, OnInit } from '@angular/core';
import { ImageGalleryService } from './image-gallery.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  srcResult?: any;
  imagesSub!: Subscription;
  imagesUrl: any[] = [];

  constructor(private imageGalleryService: ImageGalleryService) {}

  ngOnInit(): void {
    this.imageGalleryService.getImages();
    this.imagesSub = this.imageGalleryService.imagesUpdate.subscribe(
      (images) => (this.imagesUrl = images?.map((img) => img.img))
    );
  }

  onFileSelected(event: any) {
    const [file] = event.target.files;

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      const image = { img: reader.result };
      console.log(typeof reader.result);
      this.srcResult = image.img;
    };
    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  ngOnDestroy(): void {
    this.imagesSub.unsubscribe();
  }
}
