package com.example.Controller;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.dao.PostDAO;
import com.example.domain.PostVO;

@RestController
@RequestMapping("/posts")
public class PostRESTController {
	@Autowired
	PostDAO dao;
	
	@GetMapping("/list.json")
	public List<HashMap<String, Object>> list(){
		return dao.list();
	}
	
	@GetMapping("/total")
	public int total(String key, String query){
		return dao.total(key,query);
	}
	
	@GetMapping("/list1.json") //http://localhost:8080/posts/list1.json?page=1&size=5
	public List<HashMap<String, Object>> list1(int page, int size, String key, String query){
		return dao.list1(page,size,key,query);
	}
	
	@GetMapping("/read.json") //localhost:8080/posts/read.json?pid=3
	public HashMap<String, Object> read(int pid){
		return dao.read(pid);
	}
	
	@PostMapping("/insert")
	public void insert(@RequestBody PostVO vo) {
		System.out.println(vo.toString());
		dao.insert(vo);
	}
	
	@PostMapping("/delete")
	public void delete(@RequestBody int pid) {
		dao.delete(pid);
	}
	
	@PostMapping("/update")
	public void update(@RequestBody PostVO vo) {
		dao.update(vo);
	}
}
