package com.test.tag;

import java.io.IOException;
import java.io.Writer;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.htmlparser.Node;
import org.htmlparser.NodeFilter;
import org.htmlparser.Parser;
import org.htmlparser.filters.HasAttributeFilter;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.alibaba.fastjson.JSON;
import com.test.pojo.CtrlInfo;
import com.test.pojo.MenuInfo;
import com.test.pojo.UserInfo;
import com.test.service.MenuInfoService;

import freemarker.core.Environment;
import freemarker.template.SimpleScalar;
import freemarker.template.TemplateDirectiveBody;
import freemarker.template.TemplateDirectiveModel;
import freemarker.template.TemplateException;
import freemarker.template.TemplateModel;

/**
 * Description: TODO {页面控件授权标签}<br/>
 * 
 * @author Administrator
 * @date: 2015年3月11日 上午9:34:38
 * @version 1.0
 * @since JDK 1.7
 */
public class AuthDirective implements TemplateDirectiveModel {
 Logger logger = Logger.getLogger(AuthDirective.class);


 private MenuInfoService menuInfoServiceImpl;


 public void execute(Environment env, @SuppressWarnings("rawtypes") Map params, TemplateModel[] loopVars,
   TemplateDirectiveBody body) throws TemplateException, IOException {
  String spacetext = "";
  if (params.get("paddingtext") != null) {
   spacetext = ((SimpleScalar) params.get("paddingtext")).getAsString();
  }
  HttpServletRequest request = this.getRequest();
  String url = request.getServletPath();
  // 获取用户登录信息
  UserInfo userInfo = this.getLoginUserInfo(request);
  if (userInfo != null) {
   // 获取用户菜单页面
   MenuInfo menuInfo = this.menuInfoServiceImpl.getMenuInfo(url, userInfo.getRoleList());
   if (menuInfo != null) {
    logger.info(JSON.toJSONString(menuInfo));
    // 输出授权后html内容到页面
    body.render(new authFilterWriter(env.getOut(), menuInfo, spacetext));
   } else {
    env.getOut().write("");
   }
  } else {
   env.getOut().write("");
  }
 }


 private HttpServletRequest getRequest() {
  ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
  HttpServletRequest request = attr.getRequest();
  return request;
 }


 private UserInfo getLoginUserInfo(HttpServletRequest request) {
  if (request != null && request.getAttribute("userInfo") != null) {
   UserInfo userInfo = (UserInfo) request.getAttribute("userInfo");
   return userInfo;
  } else {
   return null;
  }
 }


 private String parseHtml(String html, MenuInfo menuInfo, String spacetext) {
  StringBuilder sBuilder = new StringBuilder();
  List<CtrlInfo> ctrlInfos = menuInfo.getCtrlInfos();
  for (CtrlInfo ctrlInfo : ctrlInfos) {
   String autHtml = this.getAutHtml(ctrlInfo.getSelector(), html);
   sBuilder.append(autHtml.toLowerCase());
   sBuilder.append(spacetext);
  }
  return sBuilder.toString();
 }


 private String getAutHtml(String ctrlId, String html) {
  Parser parser = Parser.createParser(html, "UTF-8");
  NodeFilter filter = new HasAttributeFilter("id", ctrlId.toUpperCase());
  try {
   NodeList nodes = parser.extractAllNodesThatMatch(filter);
   if (nodes.size() > 0) {
    Node node = nodes.elementAt(0);
    return node.toHtml();
   } else {
    return "";
   }
  } catch (ParserException e) {
   e.printStackTrace();
   return "";
  }
 }


 public MenuInfoService getMenuInfoServiceImpl() {
  return menuInfoServiceImpl;
 }


 public void setMenuInfoServiceImpl(MenuInfoService menuInfoServiceImpl) {
  this.menuInfoServiceImpl = menuInfoServiceImpl;
 }


 /**
  * 输出流的包装器(转换大写字母)
  */
 private class authFilterWriter extends Writer {
  private final Writer out;
  private MenuInfo menuInfo;
  private String spacetext;


  authFilterWriter(Writer out, MenuInfo menuInfo, String spacetext) {
   this.out = out;
   this.menuInfo = menuInfo;
   this.spacetext = spacetext;
  }


  public void write(char[] cbuf, int off, int len) throws IOException {
   char[] transformedCbuf = new char[len];
   for (int i = 0; i < len; i++) {
    transformedCbuf[i] = Character.toUpperCase(cbuf[i + off]);
   }
   String noAuthHtml = new String(transformedCbuf);
   logger.info("授权前的html------ >" + noAuthHtml);
   // 通过解析标签中html内容，接口后台的权限配置数据过滤出授权后台html内容
   String rtnHtml = parseHtml(noAuthHtml, menuInfo, spacetext);
   logger.info("授权后的html------ >" + rtnHtml);
   out.write(rtnHtml.toCharArray());
  }


  public void flush() throws IOException {
   out.flush();
  }


  public void close() throws IOException {
   out.close();
  }
 }


}
