package com.baitian.pjfun.devsite.servlet;

import javax.servlet.GenericServlet;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

/**
 * Created by chenxing on 2016/11/26.
 */
@WebServlet(loadOnStartup = 1)
public class StartupServlet extends GenericServlet{

    @Override
    public void init() throws ServletException {
        super.init();

    }

    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        throw new UnsupportedOperationException("this servlet is only to init!!!");
    }
}
