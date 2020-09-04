<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%-- <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%> --%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
	String path = request.getContextPath();
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>团体标准项目建议书</title>
<script type="text/javascript" src="<%=path%>/script/main.js"></script>
</head>
<body>
	<!-- 详情页窗口区域 -->
	<div id="add_data_groupstandardproject" class="easyui-window"
		title="标准项目建议书基本信息"
		data-options="modal:true,closed:true,iconCls:'icon-save'"
		style="height: 80%; width: 80%; padding: 2px;"></div>

	<form id="groupstandardproject_list_form" action="">
		<input type="hidden" id="formid" value="10" /> 
		<div class="easyui-panel"
			style=" width: 100%; padding: 2px;">
			<!-- 查询条件区域 -->
			<div class="easyui-panel" title="查询条件"
				style="height: 120px; width: 100%; padding: 10px;"
				data-options="collapsible:true">
				<table style="width: 100%">
					<tr>
						<td width="70%">
							<input type="hidden" id="id" value="" />
							<input class="easyui-textbox" id="projectnamecn" value=""
							label="建议项目名称（中文）:" labelPosition="left" style="width: 280px"><input
							class="easyui-textbox" id="leadunit" value="" label="牵头单位:"
							labelPosition="left" style="width: 250px"><input
							class="easyui-textbox" id="participatoryunit" value=""
							label="参与单位:" labelPosition="left"
							style="width: 200px;>
						</td>
						<td width="30%"></td>
					</tr>
					<tr>
						<td width="70%">
						<select
							id="projecttype" class="easyui-combobox"
							data-options="editable:false" label="标准分类:" name="projecttype"
							style="width: 280px;">
							<option value=''></option>
							<option value='3'>团体标准</option>
							<option value='1'>国家标准</option>
							<option value='2'>行业标准</option>
							</select>
						<select
							id="status" class="easyui-combobox"
							data-options="editable:false" label="报表状态:" name="status"
							style="width: 280px;">
							<option value=''></option>
							<option value='3'>预审通过</option>
							<option value='6'>不通过</option>
							</select>
						
						</td>
						<td width="30%"><a id="btnSearch" href="#"
							onclick="doSearch_groupstandardproject()" class="easyui-linkbutton"
							data-options="iconCls:'icon-search'">查询</a>
							<a href="javascript:void(0)"
							onclick="resetForm('groupstandardproject_list_form')"
							class="easyui-linkbutton" data-options="iconCls:'icon-reload'">重置</a></td>
					</tr>
				</table>
			</div>
			<ul id="tt" class="easyui-tree">   
		    <li>   
		        <span>Folder</span>   
		        <ul>   
		            <li>   
		                <span>Sub Folder 1</span>   
		                <ul>   
		                    <li>   
		                        <span><a href="#">File 11</a></span>   
		                    </li>   
		                    <li>   
		                        <span>File 12</span>   
		                    </li>   
		                    <li>   
		                        <span>File 13</span>   
		                    </li>   
		                </ul>   
		            </li>   
		            <li>   
		                <span>File 2</span>   
		            </li>   
		            <li>   
		                <span>File 3</span>   
		            </li>   
		        </ul>   
		    </li>   
		    <li>   
		        <span>File21</span>   
		    </li>   
		</ul>  

			<!-- 查询结果区域 -->
			<div class="easyui-panel" title="数据列表"
				style="height: 480px; width: 100%;" data-options="collapsible:true">
				<table id="groupstandardproject_list" style="height: 100%; width: 100%;">

				</table>
			</div>
			<ul id="tt2"></ul> 
		</div>
		<script type="text/javascript"
			src="<%=path%>/index/easyui/treedemo.js"></script>

	</form>
</body>
</html>