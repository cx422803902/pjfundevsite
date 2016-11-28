package com.baitian.pjfun.devsite.packagedownload;

/**
 * Created by chenxing on 2016/11/26.
 */
public class PackageDownloadHandler {
    private static PackageDownloadHandler _instance;
    public static PackageDownloadHandler getInstance() {
        if(_instance == null) {
            synchronized (PackageDownloadHandler.class) {
                _instance = new PackageDownloadHandler();
            }
        }
        return _instance;
    }

    private PackageDownloadHandler() {
    }

    public PackageDownloadResponse getDownloadResponse(int pageIndex, int net, String platform) {
        PackageDownloadBean[] beans = new PackageDownloadBean[5];
        for(int i = 0; i < beans.length; i++) {
            PackageDownloadBean bean = new PackageDownloadBean();
            bean.setId(i+1);
            bean.setBranch("1.8");
            bean.setStatus("成功");
            bean.setTime("2011-11-12 10:40");
            bean.setDownloadLink("http://www.baidu.com/");
            bean.setDebug(true);
            beans[i] = bean;
        }
        PackageDownloadResponse response = new PackageDownloadResponse();
        response.setCurPageIndex(pageIndex < 0 ? 10 : pageIndex);
        response.setSumItemCount(100);
        response.setSumPageCount(100);
        response.setItems(beans);
        return response;
    }

}
