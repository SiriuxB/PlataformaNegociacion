import { Component, OnInit, ElementRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';

import { Router } from '@angular/router';
import * as GoldenLayout from 'golden-layout';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { GridMercadoComponent } from '../GridMercado/GridMercado.component';
import { RealtimeService } from 'app/ApiServices/realtime.service';
import { LoginService } from 'app/ApiServices/login.service';
import { CompraVentaComponent } from '../CompraVenta/CompraVenta.component';

@Component({
    selector: 'LayoutMercado',
    templateUrl: './LayoutMercado.component.html',
    styleUrls: ['./LayoutMercado.component.scss']
})
export class LayoutMercadoComponent implements OnInit {

    registerFormErrors: any; myLayout: GoldenLayout;
    title = 'popout-ex';

    config = {
        dimensions: {
            headerHeight: 40,

        },
        content: [{
            type: 'row',
            content: [{
                type: 'component',
                componentName: 'MARKET',

            }, {
                type: 'column',
                content: [{
                    type: 'component',
                    componentName: 'COMPRA VENTA'

                }, {
                    type: 'component',
                    componentName: 'testComponent',
                    componentState: { label: 'C' },

                }]
            }]
        }]
    };
    constructor(private NavigationData: NavigationInfoService,
        private Router: Router, public el: ElementRef,
        private CommunicationService: CommunicationService,
        public componentFactoryResolver: ComponentFactoryResolver,
        public viewContainer: ViewContainerRef,
        public RealTimeService: RealtimeService,
        private LoginService: LoginService

    ) {

    }




    ngOnInit(): void {
        this.myLayout = new GoldenLayout(this.config, $(this.el.nativeElement).find("#layout"));

        this.myLayout.registerComponent('testComponent', function (container, componentState) {
            container.getElement().html('<button (click)="jaja()">boton jojojo</button><h2> jojojoj' + componentState.label + '</h2>');
        });
        this.RegisterLayoutComponent('MARKET', GridMercadoComponent)
        this.RegisterLayoutComponent('COMPRA VENTA', CompraVentaComponent)
        
        this.myLayout.init();
        this.RealTimeService.start(this.LoginService.getLoginSession())
        debugger
        var LayoutContainer = this.myLayout as any    
        var tab1 = LayoutContainer.root.contentItems[0].contentItems[0].header.tabs[0].element
        tab1.css("font-size", "33px")
        tab1.css("height", "33px")
        //header.tabs[0].element.css("font-size", "40px")
        // this.myLayout.updateSize()
        this.CommunicationService.obs_changeSizeWindow.subscribe(() => {
            var x: any = document.querySelector("#layout>div")
            x.style.height = "100%"
            x.style.width = "100%"
            setTimeout(() => {
                this.myLayout.updateSize()
            }, 200);
        })

    }

    public RegisterLayoutComponent(componentName: string, component: any) {
        this.myLayout.registerComponent(componentName, (container, componentState) => {
            const factory = this.componentFactoryResolver.resolveComponentFactory(component);
            const compRef = this.viewContainer.createComponent(factory);
            container.getElement().append($(compRef.location.nativeElement));
        });
    }

    

}
