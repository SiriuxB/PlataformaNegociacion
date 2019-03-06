import { Component, AfterViewChecked, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MapDialogComponent } from '../Map-Dialog-Options/Map-Dialog-Options.component';
import { E_Imagen } from 'app/Models/E_Imagen';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { Router } from '@angular/router';
import { Platform } from '@angular/cdk/platform';
import { ImageService } from 'app/ApiServices/ImageServices';
import { Observable } from 'rxjs/Observable';



@Component({
    selector: 'Carrousel',
    templateUrl: './Carrousel.component.html',
    styleUrls: ['./Carrousel.component.scss']
})
export class CorrouselComponent implements OnInit, OnDestroy {


    IntervalX: any;
    suscription: any;
    slideIndexMan: number = 1;
    imageSources: Array<E_Imagen> = new Array<E_Imagen>();

    MobileApp: boolean = false
    constructor(public dialog: MatDialog,
        private ImageService: ImageService,
        private platform: Platform,
        private NavigationInfoService: NavigationInfoService,
        private Router: Router) { }
    ngOnInit() {
        this.ImageService.ImagenRandom().subscribe((x: Array<E_Imagen>) => {
            console.log(x)
            this.imageSources = x
            var pivot = 1
            /*  this.imageSources
                  .forEach(element => {
                      pivot += 1
                      if (pivot % 2 == 1) {
                          element.Ruta = "https://i.ytimg.com/vi/2HVA6Gy98PI/hqdefault.jpg"
                      }
                      else {
                          element.Ruta = "https://i.ytimg.com/vi/cRG0M1ouLUk/maxresdefault.jpg"
                      }
  
  
  
                  });*/
            this.showDivs(0)
            /*     if (this.suscription != undefined) {
                     this.suscription.unsubscribe()
                 }
                 this.suscription = Observable.interval(4000); // Call after 10 second.. Please set your time
                 this.suscription.subscribe(x => {
                     this.SetAutoPlay()s
                 }); */
            var that = this
            this.IntervalX = setInterval(function () {
                that.SetAutoPlay()
            }, 4000);


        })
    }


    ngOnDestroy(): void {
        clearInterval(this.IntervalX)

    }
    // First manual slideshow

    setImage(n) {
        this.showDivs(this.slideIndexMan = this.slideIndexMan + n)
    }


    plusDivs(n) {
        this.showDivs(this.slideIndexMan += n);
    }
    IrAmapas() {
        this.Router.navigate(['/Maps'])
    }


    showDivs(n) {
        var i;

        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) { this.slideIndexMan = 1 }
        if (n < 1) { this.slideIndexMan = x.length }
        for (i = 0; i < x.length; i++) {
            x[i].setAttribute("style", "display:none ;position: relative;");
        }
        x[this.slideIndexMan - 1].setAttribute("style", "display:block;position: relative;");
    }
    SetAutoPlay() {
        var i;
        var n = this.slideIndexMan
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) { this.slideIndexMan = 1 }
        if (n < 1) { this.slideIndexMan = x.length }
        for (i = 0; i < x.length; i++) {
            x[i].setAttribute("style", "display:none ;position: relative;");
        }
        x[this.slideIndexMan - 1].setAttribute("style", "display:block;position: relative;");
        this.slideIndexMan += 1

    }

}
