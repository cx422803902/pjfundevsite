import {Component} from '@angular/core'
import {OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {DownloadWebService} from './service.webservice';


//struct
export class DownloadItemResponse {
    constructor(private sumItemCount : number, private sumPageCount, private curPageIndex : number, private downloadItems : DownloadItem[]) {
    }
    public getSumItemCount() : number {
        return this.sumItemCount;
    }
    public getSumPageCount() : number {
        return this.sumPageCount;
    }
    public getCurPageIndex() : number {
        return this.curPageIndex;
    }
    public getDownloadItems() : DownloadItem[] {
        return this.downloadItems;
    }
}

export class DownloadItem {
    constructor(private id:number, private branch:string, private status:string, private time:string, private downloadLink:string, private debug : boolean) {
    }

    public getId() : number {
        return this.id;
    }
    public getBranch() : string {
        return this.branch;
    }
    public getStatus() : string {
        return this.status;
    }
    public getTime() : string {
        return this.time;
    }
    public getDownloadLink() : string {
        return this.downloadLink;
    }
    public isDebug() : boolean{
        return this.debug;
    }
    public getLinkName() : string{
        return this.isDebug() ? 'debug' : '非debug';
    }
}




//download page component
@Component({
    templateUrl : 'app/nav.download.html',
    providers : [DownloadWebService]
})
export class DownloadComponent implements OnInit{
    private options : any;//bootstrap grip options
    private downloadItems : DownloadItem[];

    private gamePlatform : string;
    private gameNet : number;
    private sumItemCount : number;
    private curPageIndex : number;
    private maxPageIndex : number;
    constructor(private route:ActivatedRoute, private downloadWebservice : DownloadWebService) {
    }

    ngOnInit() {
        this.options = {
            commonOption : {
            },
            downloadOption : {
                columns : [],
            },
            downloadItem : {
                columns : [],
            }
        }
        this.gamePlatform = 'Android';
        this.gameNet = 1;
        this.sumItemCount = 0;
        this.curPageIndex = 0;
        this.maxPageIndex = 0;

        this.route.data.subscribe(
            cfgData => this.initCfgData(cfgData)
        )
        this.downloadWebservice.getDownloadItems(0)
        .then(downloadResponse => this.initServerData(downloadResponse));
    }

    private initCfgData(cfgData : any) {
        let downloadOption = cfgData.downloadOption;
        let downloadItem = cfgData.downloadItem;

        let sumColumnLarge : number = 0;
        let sumColumnMiddle : number = 0;
        for(let i = 0; i < downloadOption.columns.length; i++) {
            let column = downloadOption.columns[i];
            sumColumnLarge += parseInt(column.columnLarge);
            sumColumnMiddle += parseInt(column.columnMiddle);
            this.options.downloadOption.columns.push({
                cls : ['col-lg-'+column.columnLarge, 'col-md-'+column.columnMiddle],
            })
        }
        this.options.downloadOption.leftCls = ['col-lg-'+((12-sumColumnLarge)/2), 'col-md-'+((12-sumColumnMiddle)/2)]
        this.options.downloadOption.sumCls = ['col-lg-'+sumColumnLarge, 'col-md-'+sumColumnMiddle]

        sumColumnLarge = 0;
        sumColumnMiddle = 0;
        for(let i = 0; i < downloadItem.columns.length; i++) {
            let column = downloadItem.columns[i];
            sumColumnLarge += parseInt(column.columnLarge);
            sumColumnMiddle += parseInt(column.columnMiddle);
            this.options.downloadItem.columns.push({
                cls : ['col-lg-' + column.columnLarge, 'col-md-' + column.columnMiddle],
                data : {title : column.title}
            })
        }
        this.options.downloadItem.leftCls = ['col-lg-'+((12-sumColumnLarge)/2), 'col-md-'+((12-sumColumnMiddle)/2)]
        this.options.downloadItem.sumCls = ['col-lg-'+sumColumnLarge, 'col-md-'+sumColumnMiddle]
        this.options.downloadItem.button = cfgData.downloadItem.button;
    }

    private initServerData(responseData : DownloadItemResponse) {
        this.updateServerData(responseData);
    }
    private updateServerData(responseData : DownloadItemResponse) {
        this.downloadItems = responseData.getDownloadItems();
        this.sumItemCount = responseData.getSumItemCount();
        this.curPageIndex = responseData.getCurPageIndex();
        this.maxPageIndex = responseData.getSumPageCount() - 1;
    }
    private clone(data: any) {
        return JSON.parse(JSON.stringify(data));
    }

    public getButtons() : Array<String> {
        let maxShowCount = this.options.downloadItem.button.maxShowCount;
        let minShowIndex = this.curPageIndex - maxShowCount / 2;
        let maxShowIndex = this.curPageIndex + maxShowCount / 2;
        if(minShowIndex < 0) {
            maxShowIndex =  maxShowIndex-minShowIndex;
            minShowIndex = 0;
        }
        if(maxShowIndex > this.maxPageIndex) {
            maxShowIndex = this.maxPageIndex;
        }
        var arr : Array<String> = new Array<String>(maxShowIndex - minShowIndex + 1);
        for(let i = 0; i < arr.length; i++) {
            arr[i] = new String(minShowIndex + i + 1);
        }
        return arr;
    }
    public getBorderClass(oriClass : any, row : number, column : number) : any{
        if(row != 0 && column != 0) {
            return oriClass;
        }
        var newClass = this.clone(oriClass);
        if(row == 0 && column == 0) {
            newClass.push('fr-fc');
        }else if(row == 0) {
            newClass.push('fr');
        }else if(column == 0) {
            newClass.push('fc');
        }
        return newClass;
    }

    public onClickPageBtn(pageIndex : any) {
        let selectedPageIndex = parseInt(pageIndex);
        this.downloadWebservice.getDownloadItems(selectedPageIndex, this.gameNet, this.gamePlatform)
            .then(downloadResponse => this.initServerData(downloadResponse));
    }
    public onSelectGameNet(net : string) {
        //this.gameNet = net;
        this.downloadWebservice.getDownloadItems(0, this.gameNet, this.gamePlatform)
            .then(downloadResponse => this.initServerData(downloadResponse));

    }
    public onSelectGamePlatform(platform : string) {
        //this.gamePlatform = platform;
        this.downloadWebservice.getDownloadItems(0, this.gameNet, this.gamePlatform)
            .then(downloadResponse => this.initServerData(downloadResponse));
    }

}