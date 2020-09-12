package com.generic;

import org.junit.Test;

public class GenericTest {
@Test
public void test1() {
	Generic<Integer> genericInt = new Generic<Integer>(5);
	Generic<String> genericStr = new Generic<String>("abc");
	System.out.println(genericInt.getKey());
	System.out.println(genericStr.getKey());
}
@Test
public void test2() {
	Generic genericInt = new Generic(5);
	Generic genericStr = new Generic("abc");
	Generic genericBoo = new Generic(false);
	System.out.println(genericInt.getKey());
	System.out.println(genericStr.getKey());
	System.out.println(genericBoo.getKey());
}
}
