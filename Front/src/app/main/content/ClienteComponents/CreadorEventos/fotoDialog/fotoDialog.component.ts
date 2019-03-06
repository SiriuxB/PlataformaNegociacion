import { Component, AfterViewChecked, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { Router } from '@angular/router';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'fotoDialog',
    templateUrl: './fotoDialog.component.html',
    styleUrls: ['./fotoDialog.component.scss']
})
export class fotoDialogComponent implements OnInit {
    file2Send: any;
    fileName: any;
    showerrorFile: boolean;
    descEnable: any;
    camera: number = 1
    CapturedPhoto: boolean;
    dataURL: any;
    form: FormGroup;

    @ViewChild('fileInput') fileInput: ElementRef;
    constructor(
        private fb: FormBuilder,
        public dialogRef: MatDialogRef<fotoDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private NavigationInfoService: NavigationInfoService
        , private Router: Router) {
        this.form = this.fb.group({
            file: null
        });
    }
    ngOnInit(): void {
        console.log(this.data)

  //      PhotoTool.plauvideo()

    }
    onNoClick(): void {
        this.dialogRef.close();
    }

    changeCamera() {
        this.camera = this.camera == 1 ? this.camera = 2 : this.camera = 1
        PhotoTool.plauvideoWithCameraSelection(this.camera)
    }


    CreateEvent() {
        this.NavigationInfoService.storage = this.data


        this.dialogRef.close();
    }
    RegisterPhoto() {

        var canvas: any = document.getElementById('canvas');
        var context = canvas.getContext('2d');
        var video: any = document.getElementById('video');
        var cw = Math.floor(canvas.clientWidth / 100);
        var ch = Math.floor(canvas.clientHeight / 100);


        //  context.drawImage(video, 0, 0, cw, ch);

        context.drawImage(video, 0, 0, 640, 480);
        this.dataURL = canvas.toDataURL('image/jpeg', 0.5);
        this.CapturedPhoto = true
    }
    CancelFoto() {
        this.CapturedPhoto = false
    }
    EnviarFoto() {
        this.dialogRef.close(this.file2Send);
    }

    fileChange($event) {
        const fileBrowser = this.fileInput.nativeElement;
        this.showerrorFile = false
        const newFile: any = {};
        if (fileBrowser.files && fileBrowser.files[0]) {
            this.fileName = fileBrowser.files[0].name;
            const file = fileBrowser.files[0];
            if (file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/jpg") {
                this.file2Send = file
                this.showerrorFile = false
            }
            else {
                this.showerrorFile = true
                this.fileInput.nativeElement.value = ""
                this.file2Send = undefined
            }

        }
        else {
            this.showerrorFile = true
            this.fileInput.nativeElement.value = ""
            this.file2Send = undefined
        }

    }

}