import { Component, OnInit, Inject } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BaseService } from '../../core/services/base.service';

@Component({
  selector: 'app-platform-modifier',
  templateUrl: './platform-modifier.component.html',
  styleUrls: ['./platform-modifier.component.css']
})
export class PlatformModifierComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PlatformModifierComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public baseService: BaseService
    ) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
