package com.baitian.pjfun.devsite.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

/**
 * Created by chenxing on 2016/11/26.
 */
abstract public class BasicServlet extends HttpServlet{
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
    }

    protected static String getRequestStr(HttpServletRequest req) throws IOException{
        StringBuilder sb = new StringBuilder();
        BufferedReader br = req.getReader();
        String line;
        while((line = br.readLine()) != null) {
            sb.append(line);
        }
        return sb.toString();
    }
}
