package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.example.dao.ProDAO;
import com.example.domain.QueryVO;

@SpringBootTest
class Web03ApplicationTests {
	@Autowired
	ProDAO dao;
	
	@Test
	void contextLoads() {
		QueryVO vo = new QueryVO();
		vo.setPage(1);
		vo.setSize(2);
		dao.list(vo);
		
		dao.total();
	}

}
