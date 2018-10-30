package com.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.test.pojo.Student;

@Controller
//@RequestMapping("/hello")
public class WebController {
	@RequestMapping("/index")
	public String index() {
		return "index";
	}
	@RequestMapping("/redirect")
	public String redirect() {
		return "redirect:final";
	}
	@RequestMapping("/fianl")
	public String fianl() {
		return "final";
	}
	@RequestMapping("/staticPage")
	public String redirect2() {
		return "redirect:/pages/final.html";
	}
}
