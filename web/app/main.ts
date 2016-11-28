import {Component} from '@angular/core';

import {NgModule} from '@angular/core';
import {OnInit} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {HttpModule} from '@angular/http';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './service.in-memory-web';

import {downloadCfgData} from './config';

import {DownloadWebService} from './service.webservice';
import {DownloadComponent} from './nav.download';

@Component({
    selector : 'main',
    templateUrl : 'app/main.html'
})
class MainComponent implements OnInit{
    constructor() {
    }
    ngOnInit() {
    }
}

@Component({
    template : `
    <h1>Index Html</h1>
    `
})
class IndexComponent {
}


@NgModule({
    imports : [
        BrowserModule,
        HttpModule,
        //InMemoryWebApiModule.forRoot(InMemoryDataService),
        RouterModule.forRoot([
            {path : '', component : IndexComponent}, 
            {path : 'download', component : DownloadComponent, data : downloadCfgData},
        ])
    ],
    declarations : [MainComponent, IndexComponent, DownloadComponent],
    bootstrap : [MainComponent],
})
class AppModule{}


const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);