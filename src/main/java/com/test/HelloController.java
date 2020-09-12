package com.test;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSON;
import com.test.pojo.TreeNode;

@Controller
@RequestMapping("/index/hello")
public class HelloController {
	@RequestMapping("/hello")
	public String printHello(ModelMap model) {
		model.addAttribute("message","Hello SpringMVC Framework!");
		return "hello";
	}
	@RequestMapping("/list_tree")
	public void listOrganizationAndUser(HttpServletRequest request,
			HttpServletResponse response, Model model) throws Exception {
		String pid = request.getParameter("pId") + "";
		String sid = "";
//		List<TreeNode> treeNodeList = this.orgService
//				.getOrganizationAndUserStr(pid);
		List<TreeNode> treeNodeList = new ArrayList<TreeNode>();
		TreeNode node = new TreeNode();
		node.setId("0");
		node.setText("000");
		node.setPid("-1");;
		treeNodeList.add(node);
		
		node = new TreeNode();
		node.setId("1");
		node.setText("111");
		node.setPid("0");;
		treeNodeList.add(node);
		
		node = new TreeNode();
		node.setId("2");
		node.setText("222");
		node.setPid("0");;
		treeNodeList.add(node);
		
		String jsonStr = JSON.toJSONString(treeNodeList);
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(jsonStr);
		response.getWriter().close();
	}
	
}
