package com.example.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class MysqlDAOImpl implements MysqlDAO{
	@Autowired
	SqlSession session; // mysqlcofig에 있는 sqlsession을 들고와서 세션에 디비연결정보가 들어있음
	String namespace="com.example.mapper.MysqlMapper";
	
	@Override
	public String now() {
		return session.selectOne(namespace +".now");
	}
	
}
