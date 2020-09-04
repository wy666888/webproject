package com.test.pojo;

import java.util.HashMap;
import java.util.List;

public class TreeNode {
	public TreeNode() {
		this.attributes = new HashMap<String, String>();
	}

	/** 节点ID */
	private String id;
	/** 父节点树ID */
	private String pid;
	/** 节点名称 */
	private String text;
	/** 节点的图标 */
	private String iconCls;

	private String dataType;

	private List children;

	public List getChildren() {
		return children;
	}

	public void setChildren(List children) {
		this.children = children;
	}

	public String getDataType() {
		return dataType;
	}

	public void setDataType(String dataType) {
		this.dataType = dataType;
	}

	/** 状态 */
	private String state;
	/** 是否选中:-1-无此属 0-未选中 1-选中 */
	private Integer checked;

	private HashMap<String, String> attributes;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPid() {
		return pid;
	}

	public void setPid(String pid) {
		this.pid = pid;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getIconCls() {
		return iconCls;
	}

	public void setIconCls(String iconCls) {
		this.iconCls = iconCls;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public Integer getChecked() {
		return checked;
	}

	public void setChecked(Integer checked) {
		this.checked = checked;
	}

	public HashMap<String, String> getAttributes() {
		return attributes;
	}

	public void setAttributes(HashMap<String, String> attributes) {
		this.attributes = attributes;
	}
}
