/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.47
 * Generated at: 2018-02-08 12:48:16 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.view.users;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class users_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("     \r\n");
      out.write("    \r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("/js/jquery.min.js\"></script>\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("/easyui/themes/default/easyui.css\">\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("/easyui/themes/icon.css\">\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("/easyui/jquery.easyui.min.js\"></script>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("/easyui/themes/locale/easyui-lang-zh_CN.js\"></script>\r\n");
      out.write("\r\n");
      out.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("/chcss/users/users.css\"/>\r\n");
      out.write("<script type=\"text/javascript\" src=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("/chjs/users/users.js\"></script>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\r\n");
      out.write("<title>USERS_MANAGE</title>\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("<input id=\"addurl\" type=\"hidden\" value=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${pageContext.request.contextPath}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("\">\r\n");
      out.write("<div class=\"doc\">\r\n");
      out.write("\t<div class=\"box_1\">\r\n");
      out.write("\t\t<div id=\"view_1\" style=\"background-color: slategray;\">用户信息</div>\r\n");
      out.write("\t\t<div id=\"view_2\">待续</div>\r\n");
      out.write("\t\t<div id=\"view_3\">待续</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<div class=\"box_2\">\r\n");
      out.write("\t<input id=\"box_type\" type=\"hidden\" value=\"0\">\r\n");
      out.write("\t\t<div class=\"search\" >\r\n");
      out.write("\t\t\t<div style=\"float: left; margin-right: 10px\"><input id=\"search_data\" class=\"easyui-textbox\" style=\"width:200px\" prompt=\"请输入登录名\"></div>\r\n");
      out.write("\t\t\t<a id=\"box_search_button\" href=\"#\" class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-search'\">查询</a>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div id=\"box_db\" style=\"margin-top: 10px\"></div>\r\n");
      out.write("\t\t<div id=\"box_button\">\r\n");
      out.write("\t\t\t<a href=\"javascript:void(0)\" id=\"add_\" class=\"easyui-linkbutton\" iconCls=\"icon-add\" plain=\"true\" >Add</a>\r\n");
      out.write("\t\t\t<a href=\"javascript:void(0)\" id=\"del_\" class=\"easyui-linkbutton\" iconCls=\"icon-remove\" plain=\"true\">delete</a>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("</div>\r\n");
      out.write("<div id=\"box_1_dialog\">\r\n");
      out.write("\t<input id=\"dialogtype\" type=\"hidden\" value=\"0\">\r\n");
      out.write("\t<!-- 文本框 -->\r\n");
      out.write("\t<form id=\"users_form\">\r\n");
      out.write("\t<input id=\"userid\" name=\"userid\" type=\"hidden\" value=\"\">\r\n");
      out.write("\t<div style=\"margin-bottom:20px; text-align: center; padding-top:10px;\">\r\n");
      out.write("\t\t<table cellspacing=\"10\">\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<div >登录名: </div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<input id=\"loginname\" name=\"loginname\" class=\"easyui-textbox\" required=\"true\" validType=\"length[1,100]\" style=\"width:300px;height:32px;\">\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<div>用户名 : </div>\r\n");
      out.write("\t\t\t\t</td >\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t \t<input id=\"username\" name=\"username\" class=\"easyui-textbox\" multiline=\"true\" required=\"true\" validType=\"length[1,100]\" style=\"width:300px;height:32px;\">\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<div>密码 : </div>\r\n");
      out.write("\t\t\t\t</td >\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t \t<input id=\"password\" name=\"password\" class=\"easyui-textbox\" multiline=\"true\" required=\"true\" validType=\"length[1,100]\" style=\"width:300px;height:32px;\">\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<div >selenium浏览器本地路径 : </div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<input id=\"browserpath\" name=\"browserpath\" class=\"easyui-textbox\" validType=\"length[1,100]\" style=\"width:300px;height:32px;\">\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<div >pa审查地址 : </div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<input id=\"pa_screen\" name=\"pa_screen\" class=\"easyui-textbox\" validType=\"length[1,100]\" style=\"width:300px;height:32px;\">\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<div >pa-win审查地址 : </div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<input id=\"pa_screen_win\" name=\"pa_screen_win\" class=\"easyui-textbox\" validType=\"length[1,100]\" style=\"width:300px;height:32px;\">\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<div >备注 : </div>\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t\t<tr>\r\n");
      out.write("\t\t\t\t<td style=\"text-align: left;\">\r\n");
      out.write("\t\t\t\t\t<input id=\"remark\" name=\"remark\" class=\"easyui-textbox\" multiline=\"true\" validType=\"length[1,10000]\" style=\"width:350px;height:100px;\">\r\n");
      out.write("\t\t\t\t</td>\r\n");
      out.write("\t\t\t</tr>\r\n");
      out.write("\t\t</table>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t</form>\r\n");
      out.write("</div>\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}