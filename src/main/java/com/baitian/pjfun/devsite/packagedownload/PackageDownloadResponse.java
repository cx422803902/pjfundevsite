package com.baitian.pjfun.devsite.packagedownload;

/**
 * Created by chenxing on 2016/11/27.
 */
public class PackageDownloadResponse {
    private int sumItemCount;
    private int sumPageCount;
    private int curPageIndex;
    private PackageDownloadBean[] items;

    public int getSumItemCount() {
        return sumItemCount;
    }

    public void setSumItemCount(int sumItemCount) {
        this.sumItemCount = sumItemCount;
    }

    public int getSumPageCount() {
        return sumPageCount;
    }

    public void setSumPageCount(int sumPageCount) {
        this.sumPageCount = sumPageCount;
    }

    public int getCurPageIndex() {
        return curPageIndex;
    }

    public void setCurPageIndex(int curPageIndex) {
        this.curPageIndex = curPageIndex;
    }

    public PackageDownloadBean[] getItems() {
        return items;
    }

    public void setItems(PackageDownloadBean[] items) {
        this.items = items;
    }
}
