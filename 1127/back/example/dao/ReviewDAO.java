package com.example.dao;

import com.example.domain.ReviewVO;
import java.util.*;

public interface ReviewDAO {
	public void insert(ReviewVO vo);
	public List<HashMap<String, Object>> list(int pid, int page, int size);
	public int total(int pid);
}
