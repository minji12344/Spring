package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dao.PostDAO;
import com.example.dao.UserDAO;

@SpringBootTest
public class MysqlTest {
	@Autowired
	UserDAO dao;
	
	@Test
	public void read() {
		dao.read("blue");
	}
}