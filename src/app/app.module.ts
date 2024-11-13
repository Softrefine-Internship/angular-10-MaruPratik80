import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { UploadImageDialogComponent } from './image-gallery/upload-image-dialog/upload-image-dialog.component';
import { TagDialogComponent } from './image-gallery/tag-dialog/tag-dialog.component';
import { ViewImageDialogComponent } from './image-gallery/view-image-dialog/view-image-dialog.component';
import { DeleteDialogComponent } from './image-gallery/delete-dialog/delete-dialog.component';
import { DropZoneDirective } from './image-gallery/upload-image-dialog/drop-zone.directive';
import { SizePipe } from './image-gallery/view-image-dialog/size.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ImageGalleryComponent,
    UploadImageDialogComponent,
    TagDialogComponent,
    ViewImageDialogComponent,
    DeleteDialogComponent,
    DropZoneDirective,
    SizePipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
