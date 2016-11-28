package com.baitian.pjfun.devsite.packagedownload;

/**
 * Created by chenxing on 2016/11/27.
 */
public class PackageDownloadRequest {
    private int pageIndex;
    private int net;
    private String platform;

    public int getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public int getNet() {
        return net;
    }

    public void setNet(int net) {
        this.net = net;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }
}
