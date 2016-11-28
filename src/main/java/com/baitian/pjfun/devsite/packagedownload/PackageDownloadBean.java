package com.baitian.pjfun.devsite.packagedownload;

/**
 * Created by chenxing on 2016/11/26.
 */
public class PackageDownloadBean {
    private int id;
    private String branch;
    private String status;
    private String time;
    private String downloadLink;
    private boolean debug;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getBranch() {
        return branch;
    }
    public void setBranch(String branch) {
        this.branch = branch;
    }
    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public String getTime() {
        return time;
    }
    public void setTime(String time) {
        this.time = time;
    }
    public String getDownloadLink() {
        return downloadLink;
    }
    public void setDownloadLink(String downloadLink) {
        this.downloadLink = downloadLink;
    }
    public boolean isDebug() {
        return debug;
    }
    public void setDebug(boolean debug) {
        this.debug = debug;
    }
}
