import {ResponseOptions, URLSearchParams} from '@angular/http';
import {  InMemoryDbService, createErrorResponse, createObservableResponse, HttpMethodInterceptorArgs, STATUS} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
      let downloaditems = {
        sumItemCount : 10,
        sumPageCount : 100,
        curPageIndex : 0,
        items : [
          {id:1, branch:'1.8', status:'成功', time:'2016-11-11 10:38', downloadLink:'http://www.baidu.com/s?wd=a', isDebug : true},
          {id:2, branch:'1.8', status:'成功', time:'2016-11-11 10:38', downloadLink:'http://www.baidu.com/s?wd=b', isDebug : false},
          {id:3, branch:'1.8', status:'成功', time:'2016-11-11 10:38', downloadLink:'http://www.baidu.com/s?wd=c', isDebug : true},
          {id:4, branch:'1.8', status:'成功', time:'2016-11-11 10:38', downloadLink:'http://www.baidu.com/s?wd=d', isDebug : true},
          {id:5, branch:'1.8', status:'成功', time:'2016-11-11 10:38', downloadLink:'http://www.baidu.com/s?wd=e', isDebug : true},
          {id:6, branch:'1.8', status:'成功', time:'2016-11-11 10:38', downloadLink:'http://www.baidu.com/s?wd=f', isDebug : true}
        ]
      }
      return {downloaditems};
  }


  /**override parseUrl to ignore app/**/
  protected parseUrl(url) {
    try {
      var loc = document.createElement('a');
      loc.href = url;
      var drop = 1;
      var urlRoot = '';
      var path = loc.pathname.substring(drop);
      var _a = path.split('/'), base = '', collectionName = _a[0], id = _a[1];
      var resourceUrl = urlRoot + base + '/' + collectionName + '/';
      collectionName = collectionName.split('.')[0]; // ignore anything after the '.', e.g., '.json'
      var query = loc.search && new URLSearchParams(loc.search.substr(1));
      return { base: base, collectionName: collectionName, id: id, query: query, resourceUrl: resourceUrl };
    }
    catch (err) {
      var msg = "unable to parse url '" + url + "'; original error: " + err.message;
      throw new Error(msg);
    }
  }

  /*override post method to get data similar to get*/
  protected post(interceptorArgs: HttpMethodInterceptorArgs) {
    console.log('HTTP Post override');
    let resp: ResponseOptions;

    const {id, query, collection, collectionName, headers} = interceptorArgs.requestInfo;
    let data = collection;

    if (id) {
      data = this.findById(collection, id);
    } else if (query) {
      data = this.applyQuery(collection, query);
    }

    if (data) {
      resp = new ResponseOptions({
        body : this.clone(data),
        headers: headers,
        status: STATUS.OK
      });
    } else {
      resp = createErrorResponse(STATUS.NOT_FOUND,
        `'${collectionName}' with id='${id}' not found`);
    }

    return createObservableResponse(resp);
  }

  /////////// private ///////////////
  private applyQuery(collection: any[], query: URLSearchParams) {
    // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
    const conditions: {name: string, rx: RegExp}[] = [];
    const caseSensitive = 'i';
    query.paramsMap.forEach((value: string[], name: string) => {
      value.forEach(v => conditions.push({name, rx: new RegExp(decodeURI(v), caseSensitive)}));
    });

    const len = conditions.length;
    if (!len) { return collection; }

    // AND the RegExp conditions
    return collection.filter(row => {
      let ok = true;
      let i = len;
      while (ok && i) {
        i -= 1;
        const cond = conditions[i];
        ok = cond.rx.test(row[cond.name]);
      }
      return ok;
    });
  }

  private clone(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  private findById(collection: any[], id: number | string) {
    return collection.find((item: any) => item.id === id);
  }  
}