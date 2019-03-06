import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationTurkish } from './navigation/i18n/tr';
import { Platform } from '@angular/cdk/platform';

@Component({
    selector: 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    FullscreenNow: boolean
    constructor(
        private translate: TranslateService,
        private fuseNavigationService: FuseNavigationService,
        private fuseSplashScreen: FuseSplashScreenService,
        private fuseTranslationLoader: FuseTranslationLoaderService,
        private platform: Platform
    ) {

        // Add languages
        this.translate.addLangs(['es', 'tr']);

        // Set the default language
        this.translate.setDefaultLang('es');

        // Set the navigation translations
        this.fuseTranslationLoader.loadTranslations(navigationEnglish, navigationTurkish);

        // Use a language
        this.translate.use('en');
    }
    showFull() {

        if ((this.platform.ANDROID || this.platform.IOS) && (this.FullscreenNow == false)) {
            var i: any = document.getElementById("BodyNow");

            // go full-screen
            if (i.requestFullscreen) {
                i.requestFullscreen();
            } else if (i.webkitRequestFullscreen) {
                i.webkitRequestFullscreen();
            } else if (i.mozRequestFullScreen) {
                i.mozRequestFullScreen();
            } else if (i.msRequestFullscreen) {
                i.msRequestFullscreen();
            }
            this.FullscreenNow = true
        }


    }
}
