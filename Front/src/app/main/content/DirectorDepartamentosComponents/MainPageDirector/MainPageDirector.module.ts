import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { MainPageDirectorComponent } from './MainPageDirector.component';
import { MatToolbarModule } from '@angular/material/toolbar';
const routes: Routes = [
    {
        path: 'mainpagedirector',
        component: MainPageDirectorComponent
    }
];
 
@NgModule({
    declarations: [

        MainPageDirectorComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        FuseSharedModule,
        TextMaskModule,
        MatToolbarModule
    ], entryComponents: []

})
export class MainPageDirectorModule {
}
