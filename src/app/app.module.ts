import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

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
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    MatDialogModule,
    MatBottomSheetModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  providers: [
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS,
      useValue: { enterAnimationDuration: 300, exitAnimationDuration: 100 },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
