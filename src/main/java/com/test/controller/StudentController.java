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
public class StudentController {
	
	@RequestMapping("/student")
	public ModelAndView student() {
		return new ModelAndView("student","command",new Student());
		
		//1.从数据库拿到表对应的控件列表
		//2.从数据库拿到实体bean数据
		//3.走filter使用freemarker进行控件渲染和数据填充
		
	}
	@RequestMapping("/addStudent")
	public String addStudent(@ModelAttribute("SpringWeb")Student student,ModelMap model) {
		model.addAttribute("id",student.getId());
		model.addAttribute("name",student.getName());
		model.addAttribute("age",student.getAge());
		return "result";
	}
}
