<%@ taglib uri = "http://java.sun.com/jsp/jstl/core" prefix = "c" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>JSTL & EL</title>
</head>
<body>
	<c:set var="name" value="철수"/>
	<c:set var="age" value="20"/>
	
	<p> 이름 : ${name}</p>
	<p> 나이 : ${age}</p>
	
	<c:if test="${age >= 20}">
		<p>성인입니다.</p>
	</c:if>
	
	<c:set var="numbers" value="1,2,3,4,5,6,7,8,9"/>
	
	<ul>
		<c:forEach items="${numbers}" var="number">
			<li>${number}</li>
		</c:forEach>
	</ul>
	<%!
		String[] names = {"철수", "영희", "길동"};
		int[] ages = {19,20,21};
	%>	
	<%
		request.setAttribute("names", names);
		request.setAttribute("ages", ages);
	%>
	<c:forEach var="i" begin="0" end="<%= names.length -1 %>">
		<c:if test="${ages[i] >=20}">
			<p> 이름 : ${names[i]}</p>
			<p> 나이 : ${ages[i]}</p>
		</c:if>
	</c:forEach>
	<%@ page import="java.util.HashMap" %>
	<%@ page import="java.util.Map" %>
	<%! 
		Map<String, Integer> people = new HashMap<>();
		{
			people.put("철수", 19);
			people.put("영희", 20);
			people.put("민수", 21);
			people.put("길동", 15);
		}
	%>
	<%
		request.setAttribute("people", people);
	%>
	<c:forEach items="${people.entrySet()}" var="entry">
		<c:if test="${entry.value} >= 20">
			<p>${entry.key}, ${entry.value}</p>
		</c:if>
	</c:forEach>
</body>
</html>