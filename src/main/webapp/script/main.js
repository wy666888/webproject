var resourcePath = '/webproject/index/';
(function() { // 加载
	var location = (window.location + '').split('/');
	var basePath = location[0] + '//' + location[2] + '/' + location[3];

	var jsList = [
			basePath + "/script/jquery-easyui-1.8.1/jquery.min.js",
			basePath + "/script/jquery-easyui-1.8.1/jquery.easyui.min.js",
			basePath + "/script/jquery-easyui-1.8.1/locale/easyui-lang-zh_CN.js"//,
			//basePath + "/script/load_data.js",
			//basePath + "/script/echarts-4.1.0/echarts.min.js",
			//basePath + "/index/plugin/datagrid.js",
			//basePath + "/index/excel/excel_import.js",
			//basePath + "/script/gojs/go.js",
			//basePath + "/index/upload/upload_file.js",
			//basePath + "/script/wangEditor-3.1.1/release/wangEditor.min.js"
			];
	for ( var i = 0; i < jsList.length; i++) {
		document.write('<script  type="text/javascript" src="' + jsList[i]
				+ '"><\/script>');
	}
	var cssList = [
			basePath
					+ "/script/jquery-easyui-1.8.1/themes/material-teal/easyui.css",
			basePath + "/script/jquery-easyui-1.8.1/themes/icon.css",
			basePath + "/resource/css/main.css" ];
	for ( var i = 0; i < cssList.length; i++) {
		document.write('<link rel="stylesheet" type="text/css" href="'
				+ cssList[i] + '"/>');
	}
})();
var ajax_post = function(urlStr, para, options) {
	para.timespan = new Date().getTime();
	$.ajax({
		url : urlStr,
		data : para,
		type : "POST",
		dataType : "json",
		error : function() {
			options.fail && options.fail();
		},
		success : function(response) {
			options.success && options.success(response);
		}
	});
};
var ajax_post_sync = function(urlStr, para, options) {
	para.timespan = new Date().getTime();
	$.ajax({
		url : urlStr,
		data : para,
		cache : false,
		async : false,
		type : "POST",
		dataType : "json",
		error : function() {
			options.fail && options.fail();
		},
		success : function(response) {
			options.success && options.success(response);
		}
	});
};
var message_show = function(title, msg) {
	$.messager.show({
		title : title,
		msg : msg,
		timeout : 2000,
		showType : 'fade',
		style : {
			right : '',
			// top : document.body.scrollTop +
			// document.documentElement.scrollTop,
			bottom : ''
		}
	});
};
var message_confirm = function(title, msg, success_function) {
	$.messager.confirm(title, msg, function(r) {
		if (r) {
			success_function();
			return true;
		} else {
			return false;
		}
	});
};
// 后获取系统有规则编码。如：销售订单 等
var doGetSeriNo = function(serinoType) {
	url = 'data_dictionary/get_seri_no.do?date=' + new Date();
	var para = {
		'serinoType' : serinoType
	};
	ajax_post(url, para, {
		success : function(seriNo) {
			doGetSeriNoSuccess(seriNo);
		}
	});
};

var set_read_only = function(formName, allcolumns) {
	for ( var i = 0; i < allcolumns.length; i++) {
		var columnid = allcolumns[i];
		console.log("========" + columnid);
		var cssClass = $("#" + columnid).attr("class");
		if (cssClass != undefined) {
			// 如果是日期控件
			if (cssClass.indexOf("datebox-f") >= 0) {
				$('#' + formName + ' input[id=' + columnid + ']').datebox(
						'readonly', true);
				continue;
			} else if (cssClass.indexOf("combobox-f") >= 0) {
				// 如果是select控件
				$('#' + formName + ' select[id=' + columnid + ']').combobox(
						'readonly', true);
				continue;
			} else if (cssClass.indexOf("easyui-linkbutton") >= 0) {
				// 如果是select控件
				$('#' + columnid).hide();
				continue;
			} else {
				// 如果是其它控件
				$('#' + formName + ' input[id=' + columnid + ']').textbox(
						'readonly', true);
				continue;
			}
		}
	}
};
// ==================工作流相关按钮
/**
 * 刷新出国团组待办任务表格
 */
var reload_approval_pending_list_data = function() {
	// 获得激活的tab下的approvalPendingForm

	var finaTab = $('#mainTabs').tabs('getSelected');
	var tbId = finaTab.attr("id");
	var approvalPendingTaskType = $("#" + tbId + " input[id=tasktype]").val();
	if (approvalPendingTaskType != undefined) {
		var url = 'icw/approval_pending_list.do?tasktype='
				+ approvalPendingTaskType + '&date=' + new Date();
		$('#' + approvalPendingTaskType + '_approval_pending_list_data')
				.datagrid('options').url = url;
		$('#' + approvalPendingTaskType + '_approval_pending_list_data')
				.datagrid('reload'); // 刷新
	}
	// 首页待办由于IE的问题,datagrid不刷新,需要重写URL并跟随时间戳
	$('#protal_approval_pending_list_data').datagrid('reload');
};
// 打开任务详情页:参数:taskid,流程id,节点id
var open_task = function(id, bindid, wfid, wfsid, owner, opentype) {
	var url = "icw/target_abroad_approval_detail.do?id=" + id + "&bindid="
			+ bindid + "&wfid=" + wfid + "&wfsid=" + wfsid + "&owner=" + owner
			+ "&opentype=" + opentype;
	$('#task_window').window('open');
	$('#task_window').window('refresh', url);
};
// 打开流程图详情页:参数:taskid,流程id,节点id
var open_work_flow_chart = function(id, bindid, wfid, wfsid, owner, opentype) {
	var url = "icw/target_workflow_chart.do?taskid=" + id + "&bindid=" + bindid
			+ "&wfid=" + wfid + "&wfsid=" + wfsid + "&owner=" + owner
			+ "&opentype=" + opentype;
	$('#work_flow_chart_window').window('open');
	$('#work_flow_chart_window').window('refresh', url);
};
// 打印
var process_print = function(bindid, taskType) {
	location.href = "icw/export_doc_detail_data.do?id=" + bindid + "&taskType="
			+ taskType;
	return;
};
// 暂存
var process_save = function() {
	$("#approvalDataForm").submit();
};
// 办理
var process_transact = function(processFormName) {
	$("#approvalDataForm").submit();
	var audit = $("input[name='audit']:checked").val();
	$('#select_person').window('open');
	$('#select_person').window('refresh',
			'icw/get_transactor.do?audit=' + audit);
};
// 发送
var process_transactSendMsg = function() {
	var urlStr = 'icw/process_transact.do';
	// 办理任务时候,需要将taskid\target\wfsid传到后台,并且根据taskid更新target以及wfsid
	var taskid = $("#taskid").val();
	// 流程id
	var wfid = $("#wfid").val();
	// 从哪个节点流转过来,即当前节点编号
	var beginwfsid = $("#wfsid").val();

	var audit = $("input[name='audit']:checked").val();
	// 流程下一个节点id
	var wfsid = audit.split("_")[0];
	// 流转规则
	var rule = audit.split("_")[1];
	// 流程流转完毕,节点变更为
	if (rule == '4' && wfsid == 'null') {
		var formWfsid = $("#approvalDataForm input[id=wfsid]").val();
		wfsid = formWfsid;
	}
	// 下一个节点办理人
	var target = $("input[name='audituser']:checked").val();
	var para = {
		"taskid" : taskid,
		"wfid" : wfid,
		"beginwfsid" : beginwfsid,
		"wfsid" : wfsid,
		"rule" : rule,
		"target" : target
	};
	ajax_post(urlStr, para, {
		success : function(data) {
			transact_success(data);
		}
	});
};
var transact_success = function(data) {
	// 办理成功
	if (data.status == 1) {
		message_show('提示', data.msg);
		$('#select_person').window('close');
		$('#task_window').window('close');
		reload_approval_pending_list_data();
	}
};
// ====================工作流相关按钮结束


// ==================工作流相关按钮
/**
 * 刷新出国团组待办任务表格
 */
var reload_approval_pending_list_data2 = function() {
	// 获得激活的tab下的approvalPendingForm
	
	var finaTab = $('#mainTabs').tabs('getSelected');
	var tbId = finaTab.attr("id");
	var approvalPendingTaskType = $("#" + tbId + " input[id=tasktype]").val();
	if (approvalPendingTaskType != undefined) {
		var url = 'informationform1/information/approval_pending_list.do?tasktype='
			+ approvalPendingTaskType + '&date=' + new Date();
		$('#' + approvalPendingTaskType + '_approval_pending_list_data')
		.datagrid('options').url = url;
		$('#' + approvalPendingTaskType + '_approval_pending_list_data')
		.datagrid('reload'); // 刷新
	}
	// 首页待办由于IE的问题,datagrid不刷新,需要重写URL并跟随时间戳
	$('#protal_approval_pending_list_data').datagrid('reload');
};
// 打开任务详情页:参数:taskid,流程id,节点id
var open_task2 = function(id, bindid, wfid, wfsid, owner, opentype) {
	var url = "informationform1/information/target_abroad_approval_detail.do?id=" + id + "&bindid="
	+ bindid + "&wfid=" + wfid + "&wfsid=" + wfsid + "&owner=" + owner
	+ "&opentype=" + opentype;
	$('#task_window').window('open');
	$('#task_window').window('refresh', url);
};
// 打开流程图详情页:参数:taskid,流程id,节点id
var open_work_flow_chart2 = function(id, bindid, wfid, wfsid, owner, opentype) {
	var url = "informationform1/information/target_workflow_chart.do?taskid=" + id + "&bindid=" + bindid
	+ "&wfid=" + wfid + "&wfsid=" + wfsid + "&owner=" + owner
	+ "&opentype=" + opentype;
	$('#work_flow_chart_window').window('open');
	$('#work_flow_chart_window').window('refresh', url);
};
// 打印
var process_print2 = function(bindid, taskType,actionType,dataid) {
	location.href = "informationform1/information/export_doc_detail_data.do?id=" + bindid + "&taskType="
	+ taskType+ "&dataid=" + dataid;
	return;
};
// 暂存
var process_save2 = function() {
	$("#approvalDataForm").submit();
};
// 办理
var process_transact2 = function(processFormName) {
	$("#approvalDataForm").submit();
	var audit = $("input[name='audit']:checked").val();
	$('#select_person').window('open');
	$('#select_person').window('refresh',
			'informationform1/information/get_transactor.do?audit=' + audit);
};
// 发送
var process_transactSendMsg2 = function() {
	var urlStr = 'informationform1/information/process_transact.do';
	// 办理任务时候,需要将taskid\target\wfsid传到后台,并且根据taskid更新target以及wfsid
	var taskid = $("#taskid").val();
	// 流程id
	var wfid = $("#wfid").val();
	// 从哪个节点流转过来,即当前节点编号
	var beginwfsid = $("#wfsid").val();
	
	var audit = $("input[name='audit']:checked").val();
	// 流程下一个节点id
	var wfsid = audit.split("_")[0];
	// 流转规则
	var rule = audit.split("_")[1];
	// 流程流转完毕,节点变更为
	if (rule == '4' && wfsid == 'null') {
		var formWfsid = $("#approvalDataForm input[id=wfsid]").val();
		wfsid = formWfsid;
	}
	// 下一个节点办理人
	var target = $("input[name='audituser']:checked").val();
	var para = {
			"taskid" : taskid,
			"wfid" : wfid,
			"beginwfsid" : beginwfsid,
			"wfsid" : wfsid,
			"rule" : rule,
			"target" : target
	};
	ajax_post(urlStr, para, {
		success : function(data) {
			transact_success2(data);
		}
	});
};
var transact_success2 = function(data) {
	// 办理成功
	if (data.status == 1) {
		message_show('提示', data.msg);
		$('#select_person').window('close');
		$('#task_window').window('close');
		reload_approval_pending_list_data2();
	}
};
//直接按照角色进行流转，不用选择人
// 办理
var process_transact3 = function(processFormName) {
	$("#approvalDataForm").submit();
	var audit = $("input[name='audit']:checked").val();
	
	var urlStr = 'informationform1/information/process_transact2.do';
	// 办理任务时候,需要将taskid\target\wfsid传到后台,并且根据taskid更新target以及wfsid
	var taskid = $("#taskid").val();
	// 流程id
	var wfid = $("#wfid").val();
	// 从哪个节点流转过来,即当前节点编号
	var beginwfsid = $("#wfsid").val();
	
	//var audit = $("input[name='audit']:checked").val();
	// 流程下一个节点id
	var wfsid = audit.split("_")[0];
	// 流转规则
	var rule = audit.split("_")[1];
	// 流程流转完毕,节点变更为
	if (rule == '4' && wfsid == 'null') {
		var formWfsid = $("#approvalDataForm input[id=wfsid]").val();
		wfsid = formWfsid;
	}
	// 下一个节点办理人
	//var target = $("input[name='audituser']:checked").val();
	var para = {
			"taskid" : taskid,
			"wfid" : wfid,
			"beginwfsid" : beginwfsid,
			"wfsid" : wfsid,
			"rule" : rule,
			"target" : audit
	};
	ajax_post(urlStr, para, {
		success : function(data) {
			transact_success2(data);
		}
	});
};
// 发送
var process_transactSendMsg3 = function() {
	var urlStr = 'informationform1/information/process_transact.do';
	// 办理任务时候,需要将taskid\target\wfsid传到后台,并且根据taskid更新target以及wfsid
	var taskid = $("#taskid").val();
	// 流程id
	var wfid = $("#wfid").val();
	// 从哪个节点流转过来,即当前节点编号
	var beginwfsid = $("#wfsid").val();
	
	var audit = $("input[name='audit']:checked").val();
	// 流程下一个节点id
	var wfsid = audit.split("_")[0];
	// 流转规则
	var rule = audit.split("_")[1];
	// 流程流转完毕,节点变更为
	if (rule == '4' && wfsid == 'null') {
		var formWfsid = $("#approvalDataForm input[id=wfsid]").val();
		wfsid = formWfsid;
	}
	// 下一个节点办理人
	var target = $("input[name='audituser']:checked").val();
	var para = {
			"taskid" : taskid,
			"wfid" : wfid,
			"beginwfsid" : beginwfsid,
			"wfsid" : wfsid,
			"rule" : rule,
			"target" : target
	};
	ajax_post(urlStr, para, {
		success : function(data) {
			transact_success2(data);
		}
	});
};
var transact_success3 = function(data) {
	// 办理成功
	if (data.status == 1) {
		message_show('提示', data.msg);
		$('#select_person').window('close');
		$('#task_window').window('close');
		reload_approval_pending_list_data2();
	}
};
// 发送
var process_permit = function() {
	var urlStr = 'publication2/publication/process_transact.do';
	var dataid = $("#add_publication2_publication_form input[id=id]").val();
	if($("input[type=checkbox][name=auditrole]:checked").length<=0){
		message_show('提示', "请选择角色！");
		return;
	}
	var roleIds = "";
	$("input[type=checkbox][name=auditrole]:checked").each(function() {
		roleIds += $(this).val() + ",";
		
	});
	if(roleIds.length>1){
		roleIds = roleIds.substring(0,roleIds.length-1);
	}
	
	var para = {
			"id" : dataid,
			"roleauthorization" : roleIds
	};
	ajax_post(urlStr, para, {
		success : function(data) {
			transact_success4(data);
		}
	});
};
var transact_success4 = function(data) {
	// 办理成功
	if (data.status == 1) {
		message_show('提示', data.msg);
		$('#select_role').window('close');
	}
};
// ====================工作流相关按钮结束

// datagrid分页使用
function pagerFilter(data) {
	if (typeof data.length == 'number' && typeof data.splice == 'function') { // 判断数据是否是数组
		data = {
			total : data.length,
			rows : data
		};
	}
	var dg = $(this);
	var opts = dg.datagrid('options');
	var pager = dg.datagrid('getPager');
	pager.pagination({
		onSelectPage : function(pageNum, pageSize) {
			opts.pageNumber = pageNum;
			opts.pageSize = pageSize;
			pager.pagination('refresh', {
				pageNumber : pageNum,
				pageSize : pageSize
			});
			dg.datagrid('loadData', data);
		}
	});
	if (!data.originalRows) {
		data.originalRows = (data.rows);
	}
	var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
	var end = start + parseInt(opts.pageSize);
	data.rows = (data.originalRows.slice(start, end));
	return data;
}
function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
function myparser(s) {
	if (!s)
		return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d);
	} else {
		return new Date();
	}
}
// 采用jquery easyui loading css效果
function ajaxLoading() {
	$("<div class=\"datagrid-mask\"></div>").css({
		display : "block",
		width : "100%",
		height : $(window).height()
	}).appendTo("body");
	$("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo(
			"body").css({
		display : "block",
		left : ($(document.body).outerWidth(true) - 190) / 2,
		top : ($(window).height() - 45) / 2
	});
}
function ajaxLoadEnd() {
	$(".datagrid-mask").remove();
	$(".datagrid-mask-msg").remove();
}

// datagrid基本操作

// 上移
function MoveUp(tableId) {
	var row = $("#" + tableId).datagrid('getSelected');
	var index = $("#" + tableId).datagrid('getRowIndex', row);
	mysort(index, 'up', tableId);

}
// 下移
function MoveDown(tableId) {
	var row = $("#" + tableId).datagrid('getSelected');
	var index = $("#" + tableId).datagrid('getRowIndex', row);
	mysort(index, 'down', tableId);

}

function mysort(index, type, gridname) {
	if ("up" == type) {
		if (index != 0) {
			var toup = $('#' + gridname).datagrid('getData').rows[index];
			var todown = $('#' + gridname).datagrid('getData').rows[index - 1];
			$('#' + gridname).datagrid('getData').rows[index] = todown;
			$('#' + gridname).datagrid('getData').rows[index - 1] = toup;
			$('#' + gridname).datagrid('refreshRow', index);
			$('#' + gridname).datagrid('refreshRow', index - 1);
			$('#' + gridname).datagrid('selectRow', index - 1);
		}
	} else if ("down" == type) {
		var rows = $('#' + gridname).datagrid('getRows').length;
		if (index != rows - 1) {
			var todown = $('#' + gridname).datagrid('getData').rows[index];
			var toup = $('#' + gridname).datagrid('getData').rows[index + 1];
			$('#' + gridname).datagrid('getData').rows[index + 1] = todown;
			$('#' + gridname).datagrid('getData').rows[index] = toup;
			$('#' + gridname).datagrid('refreshRow', index);
			$('#' + gridname).datagrid('refreshRow', index + 1);
			$('#' + gridname).datagrid('selectRow', index + 1);
		}
	}
}

// 日期格式化
function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}
function myparser(s) {
	if (!s)
		return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	var d = parseInt(ss[2], 10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y, m - 1, d);
	} else {
		return new Date();
	}
}
Date.prototype.format = function(format) {
	var o = {
		"M+" : this.getMonth() + 1, // month
		"d+" : this.getDate(), // day
		"h+" : this.getHours(), // hour
		"m+" : this.getMinutes(), // minute
		"s+" : this.getSeconds(), // second
		"q+" : Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" : this.getMilliseconds()
	// millisecond
	};
	if (/(y+)/.test(format))
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(format))
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
	return format;
};
function formatDatebox(value) {
	if (value == null || value == '') {
		return '';
	}
	var dt;
	if (value instanceof Date) {
		dt = value;
	} else {
		dt = new Date(value);
	}

	return dt.format("yyyy-MM-dd"); // 扩展的Date的format方法(上述插件实现)
}
function formatMoney(number, places, symbol, thousand, decimal) {
	number = number || 0;
	places = !isNaN(places = Math.abs(places)) ? places : 2;
	symbol = symbol !== undefined ? symbol : "￥";
	thousand = thousand || ",";
	decimal = decimal || ".";
	var negative = number < 0 ? "-" : "", i = parseInt(number = Math.abs(
			+number || 0).toFixed(places), 10)
			+ "", j = (j = i.length) > 3 ? j % 3 : 0;
	return symbol
			+ negative
			+ (j ? i.substr(0, j) + thousand : "")
			+ i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand)
			+ (places ? decimal + Math.abs(number - i).toFixed(places).slice(2)
					: "");
}
var open_dict_page = function(form_filed_name, metadata_map_id,
		metadata_map_fieldname) {
	var data_cond_obj = $("#add_" + form_filed_name + "_form input[id="
			+ metadata_map_fieldname + "]");
	var main_data_cond = "[";
	if (data_cond_obj != undefined && $(data_cond_obj).val() != undefined
			&& $(data_cond_obj).val() != '') {
		main_data_cond += "{'" + metadata_map_fieldname + "':'"
				+ $(data_cond_obj).val() + "'}";
	}
	main_data_cond += "]";
	url = 'crm/target_main_data_search_page.do?id=' + metadata_map_id
			+ '&main_data_cond=' + main_data_cond;
	$('#add_main_data_' + form_filed_name).window('open');
	$('#add_main_data_' + form_filed_name).window('refresh', url);

};
// 首字母大写
function UpperFirstLetter(str) {
	return str.replace(/\b\w+\b/g, function(word) {
		if (word) {
			return word.substring(0, 1).toUpperCase() + word.substring(1);
		} else {
			return '';
		}
	});
}
// 首字母小写
function LowerFirstLetter(str) {
	return str.replace(/\b\w+\b/g, function(word) {
		if (word) {
			return word.substring(0, 1).toLowerCase() + word.substring(1);
		} else {
			return '';
		}
	});
}
// 首字母大写驼峰命名
function UpperFirstCamelCaseLetter(str) {

	if (str) {
		// 转小写
		str = str.toLowerCase();
		var val = '';
		var values = str.split("_");
		for ( var i = 0; i < values.length; i++) {
			val += UpperFirstLetter(values[i]);
		}
		return UpperFirstLetter(val);
	} else {
		return '';
	}
}
// 首字母小写驼峰命名
function LowerFirstCamelCaseLetter(str) {

	if (str) {
		// 转小写
		str = str.toLowerCase();
		var val = '';
		var values = str.split("_");
		for ( var i = 0; i < values.length; i++) {
			val += UpperFirstLetter(values[i]);
		}
		return LowerFirstLetter(val);
	} else {
		return '';
	}
}
function isEmpty(s){
	return s==""||s==undefined||s==null;
}
var isUndefined = function(value){
	if(value){
		return value;
	}else{
		return "";
	}
};
/*
 * 判断是否选中记录 针对单选
 */
function checkSelect(rows){
	var flag = false;
	if(!isEmpty(rows)){
		flag = true;
	}else{
		message_show("提示", "请选择一条记录");
	}
	return flag;
}
/*
 * 判断是否选中一条记录 针对多选
 */
function checkSingleSelect(rows){
	var flag = false;
	if(!isEmpty(rows)&&rows.length==1){
		flag = true;
	}else{
		message_show("提示", "请选择一条记录");
	}
	return flag;
}
/*
 * js版本hashmap
 */
function HashMap(){  
    // 定义长度
    var length = 0;  
    // 创建一个对象
    var obj = new Object();  
  
    /**
	 * 判断Map是否为空
	 */  
    this.isEmpty = function(){  
        return length == 0;  
    };  
  
    /**
	 * 判断对象中是否包含给定Key
	 */  
    this.containsKey=function(key){  
        return (key in obj);  
    };  
  
    /**
	 * 判断对象中是否包含给定的Value
	 */  
    this.containsValue=function(value){  
        for(var key in obj){  
            if(obj[key] == value){  
                return true;  
            }  
        }  
        return false;  
    };  
  
    /**
	 * 向map中添加数据
	 */  
    this.put=function(key,value){  
        if(!this.containsKey(key)){  
            length++;  
        }  
        obj[key] = value;  
    };  
  
    /**
	 * 根据给定的Key获得Value
	 */  
    this.get=function(key){  
        return this.containsKey(key)?obj[key]:null;  
    };  
  
    /**
	 * 根据给定的Key删除一个值
	 */  
    this.remove=function(key){  
        if(this.containsKey(key)&&(delete obj[key])){  
            length--;  
        }  
    };  
  
    /**
	 * 获得Map中的所有Value
	 */  
    this.values=function(){  
        var _values= new Array();  
        for(var key in obj){  
            _values.push(obj[key]);  
        }  
        return _values;  
    };  
  
    /**
	 * 获得Map中的所有Key
	 */  
    this.keySet=function(){  
        var _keys = new Array();  
        for(var key in obj){  
            _keys.push(key);  
        }  
        return _keys;  
    };  
  
    /**
	 * 获得Map的长度
	 */  
    this.size = function(){  
        return length;  
    };  
  
    /**
	 * 清空Map
	 */  
    this.clear = function(){  
        length = 0;  
        obj = new Object();  
    };  
} 
function ajaxLoading(){   
    $("<div class=\"datagrid-mask\"></div>").css({display:"block",width:"100%",height:$(window).height()}).appendTo("body");   
    $("<div class=\"datagrid-mask-msg\"></div>").html("正在处理，请稍候。。。").appendTo("body").css({display:"block",height:'50px',left:($(document.body).outerWidth(true) - 190) / 2,top:($(window).height() - 20) / 2});
 }   
 function ajaxLoadEnd(){   
     $(".datagrid-mask").remove();   
     $(".datagrid-mask-msg").remove();
} 
//使用wangeditor编辑器
 function createEditor(idVal,bindId){
 	var E = window.wangEditor;
 	var editor = new E('#'+idVal);
 	editor.customConfig.uploadImgServer = resourcePath+'easy/upload_image.do';  // 上传图片到服务器
 	 // 3M
 	 editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
 	 // 限制一次最多上传 5 张图片
 	 editor.customConfig.uploadImgMaxLength = 5;
 	 // 自定义文件名
 	 editor.customConfig.uploadFileName = 'editor_img';
 	 // 将 timeout 时间改为 3s
 	 editor.customConfig.uploadImgTimeout = 500000;

 	//内容修改事件，此处做的是实时展示实际效果
      /*editor.customConfig.onchange = function(html){
          //获取editor的html值
          //var html = editor.$txt.html();
          $(bindId).val(html);
      };*/
 	 editor.customConfig.uploadImgHooks = {
 	     before: function (xhr, editor, files) {
 	         // 图片上传之前触发
 	         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

 	         // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
 	         // return {
 	         //     prevent: true,
 	         //     msg: '放弃上传'
 	         // }
 	         // alert("前奏");
 	     },
 	     success: function (xhr, editor, result) {
 	         // 图片上传并返回结果，图片插入成功之后触发
 	         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
 	         var url = result.data[0];
 	         //alert(JSON.stringify(url));
 	         editor.txt.append(url);
 	         // alert("成功");
 	     },
 	     fail: function (xhr, editor, result) {
 	         // 图片上传并返回结果，但图片插入错误时触发
 	         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
 	         alert("失败");
 	     },
 	     error: function (xhr, editor) {
 	         // 图片上传出错时触发
 	         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
 	         // alert("错误");
 	     },
 	     timeout: function (xhr, editor) {
 	         // 图片上传超时时触发
 	         // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
 	     },
 	     // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
 	     // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
 	     customInsert: function (insertImg, result, editor) {
 	         // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
 	         // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
 	         // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
 	         var url = result.data[0];
 	         insertImg(url);
 	         // result 必须是一个 JSON 格式字符串！！！否则报错
 	     }
 	 }
 	    editor.create();
 	 return editor;
 }
 //获取wangeditor的内容
 function getWangContent(editor,type){
 	 //获取内容
 	 var content;
 	 //if(type==1){
 		content = editor.txt.html();
 	 /*}else if(type==2){
 		content = editor.txt.text();
 	 }*/
 	return content;
 }