package com.example.Controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class HomeController {
	@GetMapping("/hello")
	@ResponseBody
	public String hello() {
		return "hello..";
	}
	
	@GetMapping("/") /*이동경로*/
	public String home(Model model) { /*페이지에서 가져오므로 ResponseBody를 안가져와도 됨*/
		model.addAttribute("pageName", "about");
		return "home";
	}
}