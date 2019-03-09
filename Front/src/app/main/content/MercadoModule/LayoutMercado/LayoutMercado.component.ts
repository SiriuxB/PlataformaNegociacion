import { Component, OnInit, ElementRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { E_Reunion } from 'app/Models/E_Reunion';
import { NavigationInfoService } from 'app/ApiServices/NavigationInfoService';
import { ImageService } from 'app/ApiServices/ImageServices';
import { E_Imagen } from 'app/Models/E_Imagen';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ReunionService } from 'app/ApiServices/ReunionService';
import { E_Comentarios } from 'app/Models/E_Comentarios';
import { UserService } from 'app/ApiServices/UserService';
import { E_Usuario } from 'app/Models/E_Usuario';
import { Router } from '@angular/router';
import * as GoldenLayout from 'golden-layout';
import { CommunicationService } from 'app/ApiServices/CommunicationService';
import { GoldenLayoutConfiguration } from '@embedded-enterprises/ng6-golden-layout';
import { GridMercadoComponent } from '../GridMercado/GridMercado.component';

@Component({
    selector: 'LayoutMercado',
    templateUrl: './LayoutMercado.component.html',
    styleUrls: ['./LayoutMercado.component.scss']
})
export class LayoutMercadoComponent implements OnInit {

    registerForm: FormGroup;
    imageUrl: string
    dataEvento: E_Reunion = new E_Reunion()
    ImagenGeneral: E_Imagen = new E_Imagen()
    ListComentarios: Array<E_Comentarios> = new Array<E_Comentarios>()
    registerFormErrors: any; myLayout: GoldenLayout;
    title = 'popout-ex';

    config = {
        content: [{
            type: 'row',
            content: [{
                type: 'component',
                componentName: 'Individuo2Component',
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

    ) {

    }




    ngOnInit(): void {
        this.myLayout = new GoldenLayout(this.config, $(this.el.nativeElement).find("#layout"));

        this.myLayout.registerComponent('testComponent', function (container, componentState) {
            container.getElement().html('<h2>' + componentState.label + '</h2>');
        });
        this.RegisterLayoutComponent('Individuo2Component', GridMercadoComponent)
        this.myLayout.init();
        debugger

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
