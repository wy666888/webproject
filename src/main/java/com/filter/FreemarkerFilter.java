package com.filter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.util.FreemarkerUtil;



public class FreemarkerFilter implements Filter {

	public FreemarkerFilter() {
		// TODO Auto-generated constructor stub
	}

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest requ, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {
		// TODO Auto-generated method stub
		HttpServletRequest request=(HttpServletRequest) requ;
        HttpServletResponse response=(HttpServletResponse) resp;
        String pathQ = request.getQueryString();
        if (pathQ == null) {
            Map<String, String> map = new HashMap<String, String>();
            Enumeration headerNames = ((HttpServletRequest) request).getHeaderNames();
            while (headerNames.hasMoreElements()) {//循环遍历Header中的参数，把遍历出来的参数放入Map中
                String key = (String) headerNames.nextElement();
                String value = ((HttpServletRequest) request).getHeader(key);
                map.put(key, value);
            }
            System.out.println(map.toString());
            pathQ = map.toString();
        }
        resp.setContentType("text/html;charset=utf-8");
        PrintWriter pw = resp.getWriter();
		FreemarkerUtil fu = new FreemarkerUtil();
		String path=request.getRequestURI();
		String resourceName = path.substring(path.lastIndexOf("/")+1);
		try {
			fu.initConfig(0, "/", request);
			Map<String, Object> rootMap = new HashMap<String, Object>();
			// 填充数据  
	        rootMap.put("username", "51gjie");
	        rootMap.put("cars", "<select>"+
	        		"<option value =\"volvo\">Volvo</option>"+
	        		"<option value =\"saab\">Saab</option>"+
	        		"<option value=\"opel\">Opel</option>"+
	        		"<option value=\"audi\">Audi</option>"+
	        		"</select>");
			//fu.printFile(resourceName, rootMap, "F:\\"+resourceName);
			String destStr = fu.printString(resourceName, rootMap);
			//destStr = destStr.substring(destStr.indexOf("<body>")+6,destStr.indexOf("</body>"));
			destStr = destStr.substring(destStr.indexOf("<!DOCTYPE"));
			pw.println(destStr);
			pw.close();
			chain.doFilter(requ, resp);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

}
