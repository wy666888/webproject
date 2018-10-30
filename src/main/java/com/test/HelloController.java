package com.test;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping("/hello")
public class HelloController {
	@RequestMapping("/hello")
	public String printHello(ModelMap model) {
		model.addAttribute("message","Hello SpringMVC Framework!");
		return "hello";
	}
}
