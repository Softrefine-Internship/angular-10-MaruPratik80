import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { UploadImageDialogComponent } from './upload-image-dialog/upload-image-dialog.component';
import { TagDialogComponent } from './tag-dialog/tag-dialog.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DropZoneDirective } from './drop-zone.directive';
import { TagsPipe } from './tags.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ImageGalleryComponent,
    UploadImageDialogComponent,
    TagDialogComponent,
    GalleryComponent,
    ViewImageComponent,
    DeleteDialogComponent,
    DropZoneDirective,
    TagsPipe,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, MaterialModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
