//@ sourceURL=groupstandardproject_list.js
//获取团体标准项目建议书列表数据
var search_groupstandardproject= function (){
	 $('#groupstandardproject_list').datagrid({
		    url:resourcePath+'groupstandardproject/PRO/list.do',
		    	toolbar :[/*{
			    	text:'增加',
			    	iconCls:'icon-add',
			    	handler:function(){doAction_groupstandardproject('add');}
			    },'-',{
			    	text:'修改',
			    	iconCls:'icon-cut',
			    	handler:function(){doAction_groupstandardproject('update');}
			    },'-',{
			    	text:'删除',
			    	iconCls:'icon-save',
			    	handler:function(){doAction_groupstandardproject('delete');}
			    },'-',{
			    	text:'发布',
			    	iconCls:'icon-man',
			    	handler:function(){doAction_groupstandardproject('publish');}
			    }*/],
		       //fitColumns:true,//自动适应宽度  
		       autoRowHeight:true,//自动行高度  
		       loadMsg:'正在加载数据请稍后...',  
		       nowrap:true,//设置为true 有利于提高性能  
		       idField:'id',//字段标识  
		       rownumbers:true,//显示行号 
		       singleSelect:true,// 单行选择
		       pagination:true,//分页显示  
		       pageNumber:1,//初始化页面数量  
		       pageSize:10,//初始化显示条数  
		       pageList:[10,20,30],//分页列表  
		    columns:[[
 		        {
							field : 'id',
							title : 'id',
							width : '50',
							hidden : true
						}, {
							field : 'orderindex',
							title : '顺序号',
							width : '75',
							hidden : true
						}, {
							field : 'updatedate',
							title : '更新时间',
							width : '100',
							hidden : true
						}, {
							field : 'updateuser',
							title : '更新人',
							width : '75',
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
							field : 'extend1',
							title : '下发机构',
							width : '100',
							formatter : function(value) {
								for (var i = 0; i < dictMapList.assignment.length; i++) {
									if (dictMapList.assignment[i].key == value) {
										return dictMapList.assignment[i].val;
									}
								}
							}
						}, {
							field : 'createdate',
							title : '创建时间',
							width : '150'/*,
							hidden : true*/
						}/*, {
							field : 'extend1',
							title : '发布时间',
							width : '125',
							hidden : true
						}*/
		    ]],
		    queryParams: {
					    	projectnamecn : $(
							"#groupstandardproject_list_form input[id=projectnamecn]")
							.val()
							

		    }
		});

};
var open_detail = function(id){
	var formid = $('#groupstandardproject_list_form input[id=formid]').val();
	var url=resourcePath+'groupstandardproject/PRO/detail_data.do?formid='+formid+'&id='+id;
	$('#add_data_groupstandardproject').window('open');
	$('#add_data_groupstandardproject').window('refresh', url);
}
// 查询按钮
var doSearch_groupstandardproject = function(){
	search_groupstandardproject();
}; 
//增加、修改、删除事件
var doAction_groupstandardproject= function(editType){
	var url ="";
	var formid = $('#groupstandardproject_list_form input[id=formid]').val();
	if(editType=='add'){
		url=resourcePath+'groupstandardproject/PRO/add_data.do?formid='+formid;
		$('#add_data_groupstandardproject').window('open');
		$('#add_data_groupstandardproject').window('refresh', url);
	}else if(editType=='update'){
		var row = $('#groupstandardproject_list').datagrid('getSelected'); 
		var id = row.id;
		url=resourcePath+'groupstandardproject/PRO/detail_data.do?formid='+formid+'&id='+id;
		$('#add_data_groupstandardproject').window('open');
		$('#add_data_groupstandardproject').window('refresh', url);
	}else if(editType=='delete'){
		message_confirm('提示','确定删除?',function(){
			var tableId = "groupstandardproject_list";
			var row = $('#'+tableId).datagrid('getSelected'); 
			var id = row.id;
			url=resourcePath+'groupstandardproject/PRO/delete_data.do?date=' + new Date();
			var para = {'id':id};
			doDelete_groupstandardproject(url,para,tableId);
		});
	}else if(editType=='publish'){
		var row = $('#groupstandardproject_list').datagrid('getSelected'); 
		if(!checkSelect(row)){
			return;
		}
		message_confirm('提示', '确定发布吗?', function() {
			var id = row.id;
			url=resourcePath+'groupstandardproject/PRO/add_publish.do?id='+id;
			$('#add_data_groupstandardproject').window('open');
			$('#add_data_groupstandardproject').window('refresh', url);
		});
	}
}; 
// 删除数据方法
var doDelete_groupstandardproject = function(url,para,tableId){
	ajax_post(url, para, {success : function(od) {
		if(od.status=='1'){
			message_show('提示',od.msg);
			// 刷新列表
			$('#'+tableId).datagrid('reload'); // 刷新
		}
	}});
};

$(document).ready(function() {
	//doSearch_groupstandardproject();
	$('#add_data_groupstandardproject').window({
		onBeforeClose : function() {
			$('#groupstandardproject_list').datagrid('reload'); // 刷新
		}
	});
	$('#tt2').tree({    
	    //url:'tree_data3.json',
	    url:resourcePath+'hello/list_tree.do',
	    checkbox:true
	}); 
});
