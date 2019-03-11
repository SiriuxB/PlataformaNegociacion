import { Component, OnInit, ElementRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';

import { Router } from '@angular/router';
import * as GoldenLayout from 'golden-layout';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { GridMercadoComponent } from '../GridMercado/GridMercado.component';
import { RealtimeService } from 'app/ApiServices/realtime.service';
import { LoginService } from 'app/ApiServices/login.service';

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
                componentState: { label: 'A' },

            }, {
                type: 'column',
                content: [{
                    type: 'component',
                    componentName: 'testComponent',
                    componentState: { label: 'B' },

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
            container.getElement().html('<h2>' + componentState.label + '</h2>');
        });
        this.RegisterLayoutComponent('MARKET', GridMercadoComponent)
        this.myLayout.init();
        this.RealTimeService.start(this.LoginService.getLoginSession())

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
