package com.test.controller;
import org.springframework.stereotype.Controller;  
import org.springframework.ui.ModelMap;  
import org.springframework.web.bind.annotation.RequestMapping;  
  
@Controller    
public class FreemarkerController {    
        
    @RequestMapping("/hi")    
    public String sayHello(ModelMap map){    
        System.out.println("say hi ……");    
    
        map.put("name", "kimi");    
    
        return "/hi.ftl";    
    }    
    
}    