import { Component, OnInit } from '@angular/core';
import { ImageGalleryService } from './image-gallery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private imageGalleryService: ImageGalleryService) {}

  ngOnInit(): void {
    this.imageGalleryService.fetchImages();
  }
}
