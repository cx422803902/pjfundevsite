package com.baitian.pjfun.devsite.servlet;

import com.baitian.pjfun.devsite.packagedownload.PackageDownloadHandler;
import com.baitian.pjfun.devsite.packagedownload.PackageDownloadRequest;
import com.baitian.pjfun.devsite.packagedownload.PackageDownloadResponse;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by chenxing on 2016/11/28.
 */
@WebServlet(urlPatterns = "/downloaditems.post")
public class PackageDownloadServlet extends BasicServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doPost(req, resp);
        System.out.println("Deal with Post Method111111!");
        JSONObject jsonObject = JSONObject.fromObject(getRequestStr(req));
        PackageDownloadRequest reqParam = (PackageDownloadRequest)JSONObject.toBean(jsonObject, PackageDownloadRequest.class);

        PackageDownloadResponse responseParam = PackageDownloadHandler.getInstance().getDownloadResponse(reqParam.getPageIndex(), reqParam.getNet(), reqParam.getPlatform());
        String json = JSONObject.fromObject(responseParam).toString();
        System.out.println("To: " + json);
        try {
            resp.getWriter().write(json);
        }catch (Throwable t) {
            resp.getWriter().write("write to client error! " + t.getMessage());
        }
    }


}
