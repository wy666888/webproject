<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<%@ page import="com.easy.util.Constants"%>
<%@ page import="com.easy.pojo.Meeting"%>
<%@ page import="com.easy.util.PlugInComponents"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="easy.com/easyui" prefix="ES"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<%
	String path = request.getContextPath();
	String actionType = (String) request.getAttribute("actionType");
	actionType = Constants.formatStrNull(actionType);
	Meeting meeting = (Meeting) request.getAttribute("meeting");
%>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>会议表</title>
<script type="text/javascript" src="<%=path%>/script/main.js"></script>
</head>
<body>
	<!-- 主表数据字典窗口区域 -->
	<div id="add_main_data_meeting" class="easyui-window" title="数据筛选"
		data-options="modal:true,closed:true,iconCls:'icon-save'"
		style="height: 60%; width: 60%; padding: 2px;"></div>

	<form id="add_meeting_form"
		action="<%=path%>/index/meeting/meeting/save_data.do" method="post">
		<div class="easyui-panel" style="padding: 0px; width: 100%">

			<div class="easyui-panel"
				style="width: 100%; padding: 2px; text-align: right;">
				<a href="#" class="easyui-linkbutton" id="submitData"
					data-options="iconCls:'icon-save',plain:true"
					onclick="save_data_detail_meeting('<%=actionType%>')">保存</a>
			</div>
			<div
				style="width: 100%; font-size: x-large; text-align: center; background: rgb(45, 62, 80); color: white;">
				会议表基本信息</div>
			<div id="div_detail" class="easyui-panel" title="基本资料"
				style="width: 100%; padding: 0px;">
				<table class="table_1" width="100%">
					<div style="display: none">
						<input class="easyui-textbox" data-options="hidden:'true'" id="id"
							name="id" value="${meeting.id }" label="id" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="status" name="status"
							value="${meeting.status }" label="状态" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="orderindex" name="orderindex"
							value="${meeting.orderindex }" label="顺序号" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="createdate" name="createdate"
							value="${meeting.createdate }" label="创建时间" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="updatedate" name="updatedate"
							value="${meeting.updatedate }" label="更新时间" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="createuser" name="createuser"
							value="${meeting.createuser }" label="创建人" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="updateuser" name="updateuser"
							value="${meeting.updateuser }" label="更新人" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="extend1" name="extend1"
							value="${meeting.extend1 }" label="扩展字段1" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="extend2" name="extend2"
							value="${meeting.extend2 }" label="扩展字段2" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="extend3" name="extend3"
							value="${meeting.extend3 }" label="扩展字段3" labelPosition="left"
							style="width: 200px;"><input class="easyui-textbox"
							data-options="hidden:'true'" id="extend4" name="extend4"
							value="${meeting.extend4 }" label="扩展字段4" labelPosition="left"
							style="width: 200px;">
					</div>
					<tr class="tr1">
						<td class="td1"><ES:MainTag fieldName="contactposition"
								value="${meeting.contactposition }" /></td>
						<td class="td1"><ES:MainTag fieldName="subsystemid"
								value="${meeting.subsystemid }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="contactperson"
								value="${meeting.contactperson }" /></td>
						<td class="td1"><ES:MainTag fieldName="contactdetails"
								value="${meeting.contactdetails }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="name"
								value="${meeting.name }" /></td>
						<td class="td1"><ES:MainTag fieldName="address"
								value="${meeting.address }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="content"
								value="${meeting.content }" /></td>
						<td class="td1"><ES:MainTag fieldName="remark"
								value="${meeting.remark }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="starttime"
								value="${meeting.starttime }" /></td>
						<td class="td1"><ES:MainTag fieldName="persons"
								value="${meeting.persons }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="summary"
								value="${meeting.summary }" /></td>
						<td class="td1"><ES:MainTag fieldName="extend6"
								value="${meeting.extend6 }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="extend7"
								value="${meeting.extend7 }" /></td>
						<td class="td1"><ES:MainTag fieldName="extend8"
								value="${meeting.extend8 }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="extend9"
								value="${meeting.extend9 }" /></td>
						<td class="td1"><ES:MainTag fieldName="extend10"
								value="${meeting.extend10 }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="extend11"
								value="${meeting.extend11 }" /></td>
						<td class="td1"><ES:MainTag fieldName="extend12"
								value="${meeting.extend12 }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="extend13"
								value="${meeting.extend13 }" /></td>
						<td class="td1"><ES:MainTag fieldName="extend14"
								value="${meeting.extend14 }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="extend15"
								value="${meeting.extend15 }" /></td>
						<td class="td1"><ES:MainTag fieldName="extend16"
								value="${meeting.extend16 }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="extend17"
								value="${meeting.extend17 }" /></td>
						<td class="td1"><ES:MainTag fieldName="extend18"
								value="${meeting.extend18 }" /></td>
					</tr>
					<tr>
						<td class="td1"><ES:MainTag fieldName="extend19"
								value="${meeting.extend19 }" /></td>
						<td class="td1"><ES:MainTag fieldName="extend20"
								value="${meeting.extend20 }" /></td>
					</tr>
					<tr></tr>
				</table>
			</div>
			<!-- 子表==== 
			<input type="hidden" name="sub_data_str" id="sub_data_str" />-->
			<ES:hiddenBox />
		</div>
	</form>
	<script type="text/javascript"
		src="<%=path%>/index/meeting/meeting/add_meeting_detail.js"></script>
</body>
</html>