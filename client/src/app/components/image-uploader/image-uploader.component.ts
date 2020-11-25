import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent implements OnInit {

  imageChangedEvent = '';
  croppedImage = '';
  uploadButtonButtonDisabled = true;
  payload;

  constructor(
    public dialogRef: MatDialogRef<ImageUploaderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.croppedImage = this.data.photo;
  }

  ngOnInit(): void {
    // let element: HTMLElement = document.getElementById("browseImage") as HTMLElement;
    // element.click();
  }

  async cancel() {
    this.dialogRef.close();
  }

  async setDefault() {
    this.dialogRef.close('DEFAULT');
  }

  async upload() {
    this.dialogRef.close(this.croppedImage);
  }

  async fileChangeEvent(event: any) {
    this.imageChangedEvent = event;
    this.uploadButtonButtonDisabled = false;
    // console.log('fileChangeEvent::' + JSON.stringify(this.imageChangedEvent));
    // alert('fileChangeEvent::' + JSON.stringify(this.imageChangedEvent));
  }

  async imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.uploadButtonButtonDisabled = false;
    // console.log('imageCropped:: ' + JSON.stringify(this.croppedImage));
    // alert('imageCropped:: ' + JSON.stringify(this.croppedImage));
  }

  async imageLoaded() {
    this.uploadButtonButtonDisabled = true;
    // show cropper
    // alert('imageLoaded:: ');
  }

  async cropperReady() {
    // cropper ready
    // alert('cropperReady:: ');
  }

  async loadImageFailed() {
    // show message
    // alert('loadImageFailed:: ');
  }

}
