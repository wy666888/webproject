package com.test;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;


import com.test.pojo.User;

public class TestList {
void setList() {
	List<User> list = new ArrayList<>();
	for(int i=0;i<10;i++) {
		User s = new User();
		s.setId(i);
		list.add(s);
	}
	System.out.println(list);
}
}
