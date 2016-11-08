function AutoCheckLang(){ //检查缓存中之前所设置的语言
    if(localStorage.langclose==1){
        change_ch();
    }
    else if(localStorage.langclose==2){
        change_en();
    }
    else{
        localStorage.langclose=1;
    }

}
function change_en(){//变为英文

    $("#Dashboard_h3").html("USER MANAGEMENT");
    $("#Skins_id").html("skins");
    $("#langli").html("language");
    $("#logout_id").html("log out");
    $("#CPCEP_id").html("user list");
    $("#user_mangid").html("USER MANAGEMENT");
    $("#task_mangid").html("TASK MANAGEMENT");
    $("#log_mangid").html("LOG MANAGEMENT");
    $("#home_id").html("Home");
    $("#number_id").html("number");
    $("#user_id").html("user id");
    $("#user_nameid").html("user name");
    $("#nodes_id").html("number of node");
    $("#change_id").html("change the number of node");
    $("#delete_id").html("delete user");
    $("#del_butid").html("delete");
    $("#choose_id").html("Please select the type of node you need ");
    $("#type_id").html("type of node");
    $("#create_id").html("create and distribute");
    $("#deleteTetx_id").html("Delete the node");
    $("#delNumber_id").html("number");
    $("#delNodeName_id").html("name of node");
    $("#delNode_id").html("node ID");
    $("#delNodeBut_id").html("Delete");
    $("#delNodeState_id").html("state");
    $("#delUserText_id").html("Delete the user");
    $("#delSureText_id").html("The user has the task being performed, are you confirm the deletion of the user？");
    $("#delSure_id").html("Sure");
    $("#delCancel_id").html("Cancel");
    $("#datatableForNode").dataTable().fnDestroy();
    $("#datatableForTask").dataTable().fnDestroy();
    var table=$('#datatableForNode').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ {
                "sExtends": "select",
                "sButtonText": "删除" ,
                //"id":"deletebutton",
            },"copy",  "csv", "pdf" ],
            sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        }

    });
    $('#datatableForTask').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ "copy",  "csv", "pdf" ],
            sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        }

    });
    App.setPage("index");  //Set current page
}
function change_ch(){//变为中文
    $("#Dashboard_h3").html("用户管理");
    $("#Skins_id").html("皮肤");
    $("#logout_id").html("注销");
    $("#langli").html("更换语言");
    $("#CPCEP_id").html("用户列表");
    $("#user_mangid").html("用户管理");
    $("#task_mangid").html("任务管理");
    $("#log_mangid").html("日志管理");
    $("#home_id").html("主页");
    $("#number_id").html("编号");
    $("#user_id").html("用户ID");
    $("#user_nameid").html("用户名");
    $("#nodes_id").html("拥有节点数");
    $("#change_id").html("更改节点数");
    $("#delete_id").html("删除用户");
    $("#del_butid").html("删除");
    $("#choose_id").html("请选择您所需要的节点类型");
    $("#type_id").html("节点类型");
    $("#create_id").html("创建并分配");
    $("#deleteTetx_id").html("删除节点");
    $("#delNumber_id").html("编号");
    $("#delNodeName_id").html("节点名称");
    $("#delNode_id").html("节点 ID");
    $("#delNodeBut_id").html("删除");
    $("#delNodeState_id").html("状态");
    $("#delUserText_id").html("删除用户");
    $("#delSureText_id").html("该用户有正在执行的任务,你确认删除该用户？");
    $("#delSure_id").html("确定");
    $("#delCancel_id").html("取消");
    $("#datatableForNode").dataTable().fnDestroy();
    $("#datatableForTask").dataTable().fnDestroy();
    var table=$('#datatableForNode').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ {
                "sExtends": "select",
                "sButtonText": "删除" ,
                //"id":"deletebutton",
            },"copy",  "csv", "pdf" ],
            sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        },
        "oLanguage": {//国际语言转化
            "sLengthMenu": "显示 _MENU_ 记录",
            "sZeroRecords": "对不起，查询不到任何相关数据",
            "sEmptyTable": "未有相关数据",
            "sLoadingRecords": "正在加载数据-请等待...",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录。",
            "sInfoFiltered": "(由 _MAX_ 项结果过滤)",
            "sInfoEmpty":"当前显示 0 到 0 条，共 0 条记录。",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上页",
                "sNext": "下页",
                "sLast": "末页"
            }
        }

    });

    App.setPage("index");
}

jQuery(document).ready(function() {	//首先渲染
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/node/getAllNode",//接口名字
        dataType: "json",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog=i+1;
                var stringfortr ="<tr class=\"gradeX\">"+
                    "<td ><input type=\"checkbox\" name=\"checkList\"></td>"+
                    "<td>"+idforlog+"</td>"+
                    "<td>"+data.data[i].nodeId+"</td>"+
                    "<td class=\"center\">"+data.data[i].type+"</td>"+
                    "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
                    "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
                    "<td class=\"center hidden-xs\">"+data.data[i].status+"</td>"+
                    "<td class=\"hidden-xs\"><a onclick=\"changeToTaskView()\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].taskAmount+"</a></td>"+
                    "<td class=\"center\"><a href=\"#table-modal-his\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].historyTaskAmount+"</a></td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">38%</a></td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">56%</a></td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">28%</a></td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-closeNode\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">关闭</a></td>"+
                    "</tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatableForNode").dataTable().fnDestroy();
            $('#tbodyfornodelist').html(stringfortrlist);
            AutoCheckLang();
        }
    });

    App.setPage("index");  //Set current page，这俩破玩意竟然和换肤有关
    App.init(); //Initialise plugins and elements

    $("#langli").click(function(){//点击选择更换语言
        if(localStorage.lang){ //缓存 1代表中文，2代表英文
            if(localStorage.lang==1){
                localStorage.lang=2;
                localStorage.langclose=2;
                change_en();
            }
            else if(localStorage.lang==2){
                localStorage.lang=1;
                localStorage.langclose=1;
                change_ch();
            }
        }
        else{
            localStorage.lang=2;
            localStorage.langclose=2;
            change_en();

        }
    });
});