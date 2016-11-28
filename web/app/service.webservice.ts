import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';

import 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import {DownloadItemResponse, DownloadItem} from './nav.download';


@Injectable()
export class DownloadWebService {
    private static GET_DOWNLOAD_ITME_URL : string = "/downloaditems.post";

    constructor(private http:Http) {
    }

    public getDownloadItems(pageIndex : number, net ?: number, platform ?: string) : Promise<DownloadItemResponse> {
        return this.postJson<DownloadItemResponse>(DownloadWebService.GET_DOWNLOAD_ITME_URL, {
            pageIndex : pageIndex,
            net : net,
            platform : platform
            },
            response => {
            /**return a array of object*/
            let data = response.json();
            let sumItemCount = data.sumItemCount;
            let sumPageCount = data.sumPageCount;
            let curPageIndex = data.curPageIndex;
            let items : Array<any> = data.items;
            let downloadItems : DownloadItem[] = new Array<DownloadItem>(items.length);
            for(var i = 0; i < items.length; i++) {
                let item = items[i];
                let id : number = parseInt(item.id);
                let branch : string = item.branch;
                let status : string = item.status;
                let time : string = item.time;
                let downloadLink : string = item.downloadLink;
                let isDebug : boolean = item.isDebug;
                downloadItems[i] = new DownloadItem(id, branch, status, time, downloadLink, isDebug);
            }
            return new DownloadItemResponse(sumItemCount, sumPageCount, curPageIndex, downloadItems);
        }).catch(this.handleError);
    }

    private postJson<T>(url : string, body : any, parser : ((response : any) => T)) : Promise<T> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return new Promise<T>((resolve, reject) => {
            this.http.post(url, body, options).toPromise()
            .then((response) => {
                resolve(parser(response));
            })
            .catch((error: Response | any) => {
                reject(error);
            });
        });
    }

    private handleError (error: Response | any) {
      let errMsg: string;
      if (error instanceof Response) {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      } else {
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Promise.reject(errMsg);
    }
}