
import { Component, HostBinding, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { ImageService } from 'app/ApiServices/ImageServices';
import { PhotoTool } from 'app/Tools/PhotoTool';
import { UserService } from 'app/ApiServices/UserService';

@Component({
  selector: 'fuse-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.scss']
})

export class FuseSampleComponent implements OnInit {
  constructor(private ImageService: ImageService,
    private UserService: UserService) {

  }
  ngOnInit(): void {
    console.log(this.UserService.GetCurrentCurrentUserNow())
//    PhotoTool.plauvideo()
  }


  SubirImagenNow() {
    var canvas: any = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var video: any = document.getElementById('video');
    var filename = 'Test.png';
    var formdata = new FormData();
    context.drawImage(video, 0, 0, 640, 480);
    var dataURL = canvas.toDataURL('image/jpeg', 0.5);
    var blob = PhotoTool.dataURItoBlob(dataURL);
    var fd = new FormData(document.forms[0]);
    fd.append("canvasImage", blob, btoa(((new Date().getMilliseconds()) * Math.random()).toString()));
    this.ImageService.UploadJsonFile(fd).subscribe((x) => console.log(true))
  }

}