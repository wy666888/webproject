//@ sourceURL=meeting_list.js
//获取会议表列表数据
var search_meeting = function() {
	$('#meeting_list').datagrid({
		url : resourcePath + 'meeting/meeting/list.do',
		toolbar : [ {
			text : '增加',
			iconCls : 'icon-add',
			handler : function() {
				doAction_meeting('add');
			}
		}, '-', {
			text : '修改',
			iconCls : 'icon-cut',
			handler : function() {
				doAction_meeting('update');
			}
		}, '-', {
			text : '删除',
			iconCls : 'icon-save',
			handler : function() {
				doAction_meeting('delete');
			}
		} ],
		// fitColumns:true,//自动适应宽度
		autoRowHeight : true,// 自动行高度
		loadMsg : '正在加载数据请稍后...',
		nowrap : true,// 设置为true 有利于提高性能
		idField : 'id',// 字段标识
		rownumbers : true,// 显示行号
		singleSelect : true,// 单行选择
		pagination : true,// 分页显示
		pageNumber : 1,// 初始化页面数量
		pageSize : 10,// 初始化显示条数
		pageList : [ 10, 20, 30 ],// 分页列表
		columns : [ [ {
			field : 'contactposition',
			title : '职务',
			width : '50'
		}, {
			field : 'id',
			title : 'id',
			width : '50',
			hidden : true
		}, {
			field : 'subsystemid',
			title : '所属子系统id',
			width : '175',
			hidden : true
		}, {
			field : 'contactperson',
			title : '联系人',
			width : '75'
		}, {
			field : 'contactdetails',
			title : '联系方式',
			width : '100'
		}, {
			field : 'status',
			title : '状态',
			width : '50',
			hidden : true
		}, {
			field : 'orderindex',
			title : '顺序号',
			width : '75',
			hidden : true
		}, {
			field : 'createdate',
			title : '创建时间',
			width : '100',
			hidden : true,
			formatter : formatDatebox
		}, {
			field : 'updatedate',
			title : '更新时间',
			width : '100',
			hidden : true,
			formatter : formatDatebox
		}, {
			field : 'createuser',
			title : '创建人',
			width : '75',
			hidden : true
		}, {
			field : 'updateuser',
			title : '更新人',
			width : '75',
			hidden : true
		}, {
			field : 'extend1',
			title : '扩展字段1',
			width : '125',
			hidden : true
		}, {
			field : 'extend2',
			title : '扩展字段2',
			width : '125',
			hidden : true
		}, {
			field : 'extend3',
			title : '扩展字段3',
			width : '125',
			hidden : true
		}, {
			field : 'extend4',
			title : '扩展字段4',
			width : '125',
			hidden : true
		}, {
			field : 'name',
			title : '名称',
			width : '50'
		}, {
			field : 'address',
			title : '地点',
			width : '50'
		}, {
			field : 'content',
			title : '内容',
			width : '50'
		}, {
			field : 'remark',
			title : '备注',
			width : '50'
		}, {
			field : 'starttime',
			title : '会议开始时间',
			width : '150',
			formatter : formatDatebox
		}, {
			field : 'persons',
			title : '主持人',
			width : '75'
		}, {
			field : 'summary',
			title : '会议纪要',
			width : '100'
		}, {
			field : 'extend5',
			title : '扩展字段5',
			width : '125',
			hidden : true
		}, {
			field : 'extend6',
			title : '扩展字段6',
			width : '125',
			hidden : true
		}, {
			field : 'extend7',
			title : '扩展字段7',
			width : '125',
			hidden : true
		}, {
			field : 'extend8',
			title : '扩展字段8',
			width : '125',
			hidden : true
		}, {
			field : 'extend9',
			title : '扩展字段9',
			width : '125',
			hidden : true
		}, {
			field : 'extend10',
			title : '扩展字段10',
			width : '150',
			hidden : true
		}, {
			field : 'extend11',
			title : '扩展字段11',
			width : '150',
			hidden : true
		}, {
			field : 'extend12',
			title : '扩展字段12',
			width : '150',
			hidden : true
		}, {
			field : 'extend13',
			title : '扩展字段13',
			width : '150',
			hidden : true
		}, {
			field : 'extend14',
			title : '扩展字段14',
			width : '150',
			hidden : true
		}, {
			field : 'extend15',
			title : '扩展字段15',
			width : '150',
			hidden : true
		}, {
			field : 'extend16',
			title : '扩展字段16',
			width : '150',
			hidden : true
		}, {
			field : 'extend17',
			title : '扩展字段17',
			width : '150',
			hidden : true
		}, {
			field : 'extend18',
			title : '扩展字段18',
			width : '150',
			hidden : true
		}, {
			field : 'extend19',
			title : '扩展字段19',
			width : '150',
			hidden : true
		}, {
			field : 'extend20',
			title : '扩展字段20',
			width : '150',
			hidden : true
		} ] ],
		queryParams : {
			name : $("#meeting_list_form input[id=name]").val()
		}
	});

};
// 查询按钮
var doSearch_meeting = function() {
	search_meeting();
};
// 增加、修改、删除事件
var doAction_meeting = function(editType) {
	var url = "";
	if (editType == 'add') {
		url = resourcePath + 'meeting/meeting/add_data.do';
		$('#add_data_meeting').window('open');
		$('#add_data_meeting').window('refresh', url);
	} else if (editType == 'update') {
		var row = $('#meeting_list').datagrid('getSelected');
		var id = row.id;
		url = resourcePath + 'meeting/meeting/detail_data.do?id=' + id;
		$('#add_data_meeting').window('open');
		$('#add_data_meeting').window('refresh', url);
	} else if (editType == 'delete') {
		message_confirm('提示', '确定删除?', function() {
			var tableId = "meeting_list";
			var row = $('#' + tableId).datagrid('getSelected');
			var id = row.id;
			url = resourcePath + 'meeting/meeting/delete_data.do?date='
					+ new Date();
			var para = {
				'id' : id
			};
			doDelete_meeting(url, para, tableId);
		});
	}
};
// 删除数据方法
var doDelete_meeting = function(url, para, tableId) {
	ajax_post(url, para, {
		success : function(od) {
			if (od.status == '1') {
				message_show('提示', od.msg);
				// 刷新列表
				$('#' + tableId).datagrid('reload'); // 刷新
			}
		}
	});
};

$(document).ready(function() {
	doSearch_meeting();
	$('#add_data_meeting').window({
		onBeforeClose : function() {
			$('#meeting_list').datagrid('reload'); // 刷新
		}
	});
});
