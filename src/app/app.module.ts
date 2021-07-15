import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { LibraryModule } from './library/library.module';
import { HeaderComponent } from './components/header/header.component';
import { ConfigPanelComponent } from './components/config-panel/config-panel.component';
import { ComponentPanelComponent } from './components/component-panel/component-panel.component';
import { BoardComponent } from './components/board/board.component';
import { BoardItemComponent } from './components/board/board-item/board-item.component';
import { WrapperComponent } from './components/wrapper/wrapper.component';
import { LibraryShowcaseComponent } from './components/library-showcase/library-showcase.component';
import { HttpClientModule } from '@angular/common/http';

import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
    declarations: [
        AppComponent,
        BoardComponent,
        BoardItemComponent,
        HeaderComponent,
        WrapperComponent,
        ConfigPanelComponent,
        ComponentPanelComponent,
        LibraryShowcaseComponent,
    ],
    imports: [HttpClientModule, AngularSvgIconModule.forRoot(), LibraryModule, BrowserModule, AppRoutingModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
