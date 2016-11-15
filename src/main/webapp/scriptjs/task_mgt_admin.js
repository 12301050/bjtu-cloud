var i=0;
var stringarray={};//定义一个全局变量，也是没办法的办法
setTimeout("modify()",1);
function modify(){

    $("datatableForTask").removeAttr("style");
}
var url = location.search; //获取url中"?"符后的字串，只用来控制显示
//function modify(){
//    alert("过来了！");

//var url = location.search; //获取url中"?"符后的字串，只用来控制显示
////alert($("#datatableForNode_filter").innerHTML);
//if (url.indexOf("?") != -1) {//链接中有值
//    var str = url.substr(1);
//    strs = str.split("&");
//
//    if(strs[0].split("=")[0]=="username"){//检查是否是
//        var userName=strs[0].split("=")[1];
//        $.ajax({
//            type: "POST",
//            url: "http://localhost:8080/api/node/getNodeByUser",//接口名字
//            dataType: "json",
//            //contentType: "application/json; charset=utf-8",
//            data:{userName:userName},
//            success: function (data) {
//                var stringfortrlist = "";
//                for (var i = 0; i < data.data.length; i++) {
//                    var idforlog=i+1;
//                    var stringfortr ="<tr class=\"gradeX\">"+
//                        "<td ><input type=\"checkbox\" name=\"checkList\"></td>"+
//                        "<td>"+idforlog+"</td>"+
//                        "<td>"+data.data[i].nodeId+"</td>"+
//                        "<td class=\"center\">"+data.data[i].type+"</td>"+
//                        "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
//                        "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
//                        "<td class=\"center hidden-xs\">"+data.data[i].status+"</td>"+
//                        "<td class=\"hidden-xs\"><a onclick=\"changeToTaskView("+data.data[i].nodeId+")\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].taskAmount+"</a></td>"+
//                        "<td class=\"center\"><a href=\"#table-modal-his\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].historyTaskAmount+"</a></td>"+
//                        "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">38%</a></td>"+
//                        "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">56%</a></td>"+
//                        "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">28%</a></td>"+
//                        "<td class=\"center hidden-xs\"><a href=\"#table-modal-closeNode\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">关闭</a></td>"+
//                        "</tr>";
//                    stringfortrlist = stringfortrlist + stringfortr;
//                }
//                $("#datatableForNode").dataTable().fnDestroy();
//                $("#datatableForTask").dataTable().fnDestroy();
//                $('#tbodyfornodelist').html(stringfortrlist);
//                AutoCheckLang();
//                $("#datatableForTask").css("width","100%");
//                $("#CPCEP_id").text(userName+"的节点列表信息");
//            }
//        });
//
//        App.setPage("index");  //Set current page，这俩破玩意竟然和换肤有关
//        App.init(); //Initialise plugins and elements
//    }
//}
//}
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

    $("#Dtask").html("TASK MANAGEMENT");
    $("#Skins_id").html("skins");
    $("#langli").html("language");
    $("#logout_id").html("log out");
    $("#CPCEP_id").html("node list");
    $("#user_mangid").html("USER MANAGEMENT");
    $("#task_mangid").html("TASK MANAGEMENT");
    $("#log_mangid").html("LOG MANAGEMENT");
    $("#home_id").html("Home");
    $("#number_id").html("number");
    $("#node_id").html("nodeID");
    $("#node_state").html("node state");
    $("#node_type").html("node type");
    $("#node_name").html("node name");
    $("#user_name").html("user name");
    $("#task_number").html("Number of tasks being performed");
    $("#his_task").html("Historical task number");
    $("#cpu").html("Cup occupancy rate");
    $("#ram").html("Memory usage");
    $("#net").html("Bandwidth occupancy rate");
    $("#operate").html("operate");
    $("#his_number").html("number");
    $("#task_name").html("task name");
    $("#task_type").html("task type");
    $("#time_info").html("time information");
    $("#close_button").html("close");
    $("#task_number1").html("number");
    $("#task_name1").html("task name");
    $("#task_type1").html("task type");
    $("#time_info1").html("time information");
    $("#resource_info").html("resource information");
    $("#button_close_id").html("close");
    $("#his_text").html("history task");
    $("#sureText_id").html("6 tasks are being performed to determine the closure of the node？");
    $("#sure").html("sure");
    $("#cancel").html("cancel");
    $("#back").html("back");
    $("#node_list").html("node list");
    $("#execute_time").html("execute time");
    $("#start_time").html("start time");
    $("#end_time").html("end time");
    $("#sure_time").html("sure");
    $("#time_text").html("time information");
    $("#tips").html("tips");
    $("#cpu_info").html("cpu information");
    $("#cpu_sure").html("sure");
    $("#datatableForNode").dataTable().fnDestroy();
    $("#datatableForTask").dataTable().fnDestroy();
    $("#datatableForHisTask").dataTable().fnDestroy();
    var table=$('#datatableForNode').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ {
                "sExtends": "select",
                "sButtonText": "删除" ,
                "fnClick": function (nButton, oConfig, oFlash) {
                    //delete stuff comes here
                    //alert('我要删除节点了');
                    var nodeIds="";
                    var indexfordelete=new Array();
                    $("input[name='checkList']:checked").each(function () { // 遍历选中的checkbox
                        //n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
                        var nodeId=$(this).parents("tr").find("td:eq(2)")[0].innerText;//获取将要删除的行中的节点ID
                        nodeIds=nodeIds+nodeId+",";//以，分割
                        //indexfordelete.push(n);
                        //$("table#datatableForDeleteNode tbody").find("tr:eq(" + n + ")").remove();
                    });
                    var dataforUserDeleteNode= JSON.stringify({
                        username:$('#idForUsernameWhenDeleteNodes').val(),
                        nodeIds:nodeIds
                    });
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/api/user/deleteNode",//接口名字
                        dataType: "json",
                        data:dataforUserDeleteNode,
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {//删除成功
                            alert("删除成功了！");
                            $("input[name='checkList']:checked").each(function () { // 遍历选中的checkbox
                                var n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
                                //var nodeId=$(this).parents("tr").find("td:eq(2)")[0].innerText;//获取将要删除的行中的节点ID
                                //nodeIds=nodeIds+nodeId+",";//以，分割
                                //indexfordelete.push(n);
                                $("table#datatableForNode tbody").find("tr:eq(" + n + ")").remove();
                            });
                        }
                    });
                }
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
    $('#datatableForHisTask').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ "copy",  "csv", "pdf" ],
            sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        }
    });
    $("#datatableForTask").css("width","100%");
    $("#datatableForHisTask_wrapper").css({"width":"90%","margin-left":"5%"});
    $("#datatableForHisTask").css("width","100%");
    App.setPage("index");  //Set current page
}
function change_ch(){//变为中文
    $("#Dtask").html("任务管理");
    $("#Skins_id").html("皮肤");
    $("#logout_id").html("注销");
    $("#langli").html("更换语言");
    $("#CPCEP_id").html("节点列表");
    $("#user_mangid").html("用户管理");
    $("#task_mangid").html("任务管理");
    $("#log_mangid").html("日志管理");

    $("#home_id").html("主页");
    $("#number_id").html("编号");
    $("#node_id").html("节点ID");
    $("#node_state").html("节点状态");
    $("#node_type").html("节点类型");
    $("#node_name").html("节点名称");
    $("#user_name").html("用户名");
    $("#task_number").html("正在执行的任务数");
    $("#his_task").html("历史执行任务数");
    $("#cpu").html("CPU占用率");
    $("#ram").html("内存使用率");
    $("#net").html("带宽占用率");
    $("#operate").html("操作");
    $("#his_number").html("编号");
    $("#task_name").html("任务名称");
    $("#task_type").html("任务类型");
    $("#time_info").html("时间信息");
    $("#close_button").html("关闭");
    $("#task_number1").html("编号");
    $("#task_name1").html("任务名称");
    $("#task_type1").html("任务类型");
    $("#time_info1").html("时间信息");
    $("#resource_info").html("资源信息");
    $("#button_close_id").html("关闭");
    $("#his_text").html("历史任务");
    //$("#sureText_id").html("正在执行6个任务，确定关闭该节点？");
    $("#sure").html("确定");
    $("#cancel").html("取消");
    $("#back").html("返回");
    $("#node_list").html("任务列表");
    $("#sure_time").html("确认");
    $("#time_text").html("时间信息");
    $("#tips").html("提示");
    $("#cpu_info").html("cpu 动态信息");
    $("#cpu_sure").html("确定");
    $("#datatableForNode").dataTable().fnDestroy();
    $("#datatableForTask").dataTable().fnDestroy();
    $("#datatableForHisTask").dataTable().fnDestroy();
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
                "fnClick": function (nButton, oConfig, oFlash) {
                    //delete stuff comes here
                    //alert('我要删除节点了');
                    var nodeIds="";
                    var indexfordelete=new Array();
                    $("input[name='checkList']:checked").each(function () { // 遍历选中的checkbox
                        //n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
                        var nodeId=$(this).parents("tr").find("td:eq(2)")[0].innerText;//获取将要删除的行中的节点ID
                        nodeIds=nodeIds+nodeId+",";//以，分割
                        //indexfordelete.push(n);
                        //$("table#datatableForDeleteNode tbody").find("tr:eq(" + n + ")").remove();
                    });
                    var dataforUserDeleteNode= JSON.stringify({
                        username:$('#idForUsernameWhenDeleteNodes').val(),
                        nodeIds:nodeIds
                    });
                    $.ajax({
                        type: "POST",
                        url: "http://localhost:8080/api/user/deleteNode",//接口名字
                        dataType: "json",
                        data:dataforUserDeleteNode,
                        contentType: "application/json; charset=utf-8",
                        success: function (data) {//删除成功
                            alert("删除成功了！");
                            $("input[name='checkList']:checked").each(function () { // 遍历选中的checkbox
                                var n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
                                //var nodeId=$(this).parents("tr").find("td:eq(2)")[0].innerText;//获取将要删除的行中的节点ID
                                //nodeIds=nodeIds+nodeId+",";//以，分割
                                //indexfordelete.push(n);
                                $("table#datatableForNode tbody").find("tr:eq(" + n + ")").remove();
                            });

                        }
                    });
                }
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
    $('#datatableForTask').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: ["copy",  "csv", "pdf" ],
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
    $('#datatableForHisTask').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: ["copy",  "csv", "pdf" ],
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
    $("#datatableForTask").css("width","100%");
    $("#datatableForHisTask_wrapper").css({"width":"90%","margin-left":"5%"});
    $("#datatableForHisTask").css("width","100%");

    App.setPage("index");
}
function showtheHisTask(id){//展示历史任务
    //alert(id);
    var nodeidAndStatus=JSON.stringify({nodeId:id,status:"2"});
    $('#table-modal-his').modal('show');
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/getTaskByNode",//接口名字
        dataType: "json",
        data:nodeidAndStatus,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog=i+1;
                var mode = (data.data[i].mode=="0")?"即时任务":"定时任务";

                var stringfortr ="<td>"+idforlog+"</td>"+
                    "<td>"+data.data[i].taskName+"</td>"+
                    "<td>"+mode+"</td>"+
                    "<td class='center hidden-xs'><a href='#table-modal-showtime' data-toggle='modal' class='btn btn-info' style='font-size:4px;padding:0px 8px;'>查看</a></td>";
                stringfortrlist = stringfortrlist + stringfortr;
            }


            $("#datatableForTask").dataTable().fnDestroy();

            $('#tbodyforHisTask').html(stringfortrlist);
            AutoCheckLang();
            //$("#datatableForNode").dataTable().fnDestroy();
            //$("#datatableForTask").dataTable().fnDestroy();
            //$('#tbodyforHisTask').html(stringfortrlist);
            //AutoCheckLang();
            //$("#datatableForTask").css("width","100%");
        }
    });
}
function showTheWarnModal(obj) {//关闭节点时先提检查节点上的任务运行情况
    var stringingret = obj.id;
    strs = stringingret.split("&");
    var nodeId = strs[0];
    var amount = strs[1];
    var index = strs[2];
    var operate=strs[3];//关闭和和开启
    if(operate=="关闭"){//我要关闭节点啦！！
        alert("我要关闭节点啦！！");
        $("#spanForActiveTask").text(amount);//显示正在执行的任务数
        $("#hiddenforCloseOneNode").val(nodeId);//把nodeId暂存，用于后期删除
        $("#hiddenforCloseIndex").val(index);//用于ajax局部刷新
        $("#hiddenforCloseOperateButton").val(stringingret);//用于ajax局部刷新

        $("#table-modal-closeNode").modal('show');

    }else{
        alert("我要开启节点啦！！");
        $("#hiddenforStartOneNode").val(nodeId);//把nodeId暂存，用于后期开启节点
        $("#hiddenforStartIndex").val(index);//用于ajax局部刷新
        $("#hiddenforStartOperateButton").val(stringingret);//用于ajax局部刷新

        $("#table-modal-ReActiveNode").modal('show');
    }
    //if(strs[0].split("=")[0]=="username")
}
function StartTheNode(){//开启关闭中的节点，只能单个开启
    var index=$("#hiddenforStartIndex").val();
    index=index-1;

    var nodeIds=$("#hiddenforStartOneNode").val();
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/startNode",//接口名字
        dataType: "json",
        data:{nodeId:nodeIds},
        success: function (data) {//删除成功node/closeNode
            if(data.data!=null){//开启成功了
                alert("开启节点成功！");//更新按钮和状态信息

                $("table#datatableForNode tbody").find("tr:eq("+index+")").find("td:eq(6)").text("空闲");
                $("table#datatableForNode tbody").find("tr:eq("+index+")").find("td:eq(12)").find("a:eq(0)").text("关闭");

                var modifyid=$("#hiddenforStartOperateButton").val();
                //$("#"+modifyid+"").text("关闭");
            }else{
                alert("服务器发生了不可言状的错误！找王阿星都不好使");
            }
        }
    });
}
function closeTheNode(){//节点列表页面关闭某个节点，只能单个关闭
    var index=$("#hiddenforCloseIndex").val();
    index=index-1;

    var nodeIds=$("#hiddenforCloseOneNode").val();
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/closeNode",//接口名字
        dataType: "json",
        data:{nodeId:nodeIds},
        success: function (data) {//删除成功node/closeNode
            if(data.data!=null){//关闭成功了
                alert("关闭节点成功！");//更新按钮和状态信息
                var modifyid=$("#hiddenforCloseOperateButton").val();
                $("table#datatableForNode tbody").find("tr:eq("+index+")").find("td:eq(6)").text("关闭");
                $("table#datatableForNode tbody").find("tr:eq("+index+")").find("td:eq(12)").find("a:eq(0)").text("开启");
                //$("#"+modifyid+"").text("开启");
            }else{
                alert("服务器发生了不可言状的错误！找王阿星都不好使");
            }
        }
    });
}
function showTheTimeInfo(obj){//删除节点时首先获取当前时间该用户名下的所有节点信息
    var username=obj.id;
    console.log(obj.text);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/getNodeByUser",//接口名字
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        data:{username:username},
        success: function (data) {
            console.log(data.data);
            var stringfortrlist = "";
            for(var i=0;i<data.data.length;i++){
                var idforlog=i+1;//逻辑编号
                var max = (data.data[i].status==1)?"开启":"关闭";
                console.log(max);
                var stringfortr="<tr class=\"gradeA\">"+
                    "<td style=\"text-align:center;\"><input type=\"checkbox\" name=\"checkList\"></td>"+
                    "<td>"+idforlog+"</td>"+
                    "<td class=\"hidden-xs\">"+data.data[i].nodeId+"</td>"+
                    "<td >"+data.data[i].nodeName+"</td>"+
                    "<td >"+max+"</td>"+
                    "</tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $('#showNodeListWhenDeleteNode').html(stringfortrlist);
            $('#idForUsernameWhenDeleteNodes').val(username);
        }
    });

}
function changeToTaskView(nodeid){//用户点击”正在执行的任务“时显示任务列表
    //alert("!!");
    //alert(nodeid);
    var nodeidAndStatus=JSON.stringify({nodeId:nodeid,status:"1"});
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/getTaskByNode",//接口名字，根据状态和节点id获取任务列表
        dataType: "json",
        data:nodeidAndStatus,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog=i+1;
                var mode = (data.data[i].mode=="0")?"即时任务":"定时任务";

                var stringfortr ="<tr class=\"gradeX\">"+
                    "<td>"+idforlog+"</td>"+
                    "<td>"+data.data[i].taskName+"</td>"+
                    "<td class=\"hidden-xs\">"+mode+"</td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-showTaskSchedual\" data-toggle=\"modal\" class=\"btn btn-info\" onclick=\"showTheTimeInfo("+data.data[i].taskName+")\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
                    "<td class=\"center hidden-xs\"><a onclick=\"showThreeChartsWhenViewTask()\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
                    "+</tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatableForTask").dataTable().fnDestroy();
            $('#tbodyforTaskList').html(stringfortrlist);
            AutoCheckLang();
        }
    });
    $("#nodeView").css("display","none");
    $("#taskView").css("display","block");
    $("#datatableForTask").css("width","100%");
}
function showThreeChartsWhenViewTask(){
    $("#threeCharts").css("display","block");
}
jQuery(document).ready(function() {	//首先渲染

//alert($("#datatableForNode_filter").innerHTML);
    if (url.indexOf("?") != -1) {//链接中有值
        var str = url.substr(1);
        strs = str.split("&");

        if(strs[0].split("=")[0]=="username"){//检查是否是用户界面传过来的请求
            var userName=strs[0].split("=")[1];
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/node/getNodeByUser",//接口名字
                dataType: "json",
                //contentType: "application/json; charset=utf-8",
                data:{userName:userName},
                success: function (data) {
                    var stringfortrlist = "";
                    for (var i = 0; i < data.data.length; i++) {
                        var idforlog=i+1;//加了1的，要减去
                        var textforOperateButton = (data.data[i].status==0)?"开启":"关闭";
                        var nodeStatus;
                        if(data.data[i].status==0){
                            nodeStatus="关闭";
                        }else if(data.data[i].status==1){
                            nodeStatus="活跃";
                        }else{
                            nodeStatus="空闲";
                        }
                        var stringForConvert=data.data[i].nodeId+"&"+data.data[i].taskAmount+"&"+idforlog+"&"+textforOperateButton;
                        var stringfortr ="<tr class=\"gradeX\">"+
                            "<td class=\"center\"><input type=\"checkbox\" name=\"checkList\"></td>"+
                            "<td class=\"center\">"+idforlog+"</td>"+
                            "<td class=\"center\">"+data.data[i].nodeId+"</td>"+
                            "<td class=\"center\">"+data.data[i].type+"</td>"+
                            "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
                            "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
                            "<td class=\"center hidden-xs\"id=\""+data.data[i].nodeId+"\">"+nodeStatus+"</td>"+
                            "<td class=\"hidden-xs\"><a onclick=\"changeToTaskView("+data.data[i].nodeId+")\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].taskAmount+"</a></td>"+
                            "<td class=\"center\"><a href=\"#table-modal-his\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].historyTaskAmount+"</a></td>"+
                            "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">详情</a></td>"+
                            "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">详情</a></td>"+
                            "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">详情</a></td>"+
                            "<td class=\"center hidden-xs\"><a onclick='showTheWarnModal(this)' id="+stringForConvert+" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+textforOperateButton+"</a></td>"+
                            "</tr>";
                        stringfortrlist = stringfortrlist + stringfortr;
                    }
                    $("#datatableForNode").dataTable().fnDestroy();
                    $("#datatableForTask").dataTable().fnDestroy();
                    $('#tbodyfornodelist').html(stringfortrlist);
                    AutoCheckLang();
                    $("#datatableForTask").css("width","100%");
                    $("#CPCEP_id").text(userName+"的节点列表信息");
                }
            });
            //App.setPage("index");  //Set current page，这俩破玩意竟然和换肤有关
            //App.init(); //Initialise plugins and elements
        }
    }else{
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/node/getAllNode",//接口名字，获取所有节点信息
            dataType: "json",
            success: function (data) {
                var stringfortrlist = "";
                for (var i = 0; i < data.data.length; i++) {
                    var idforlog=i+1;
                    var textforOperateButton = (data.data[i].status==0)?"开启":"关闭";
                    var nodeStatus;
                    if(data.data[i].status==0){
                        nodeStatus="关闭";
                    }else if(data.data[i].status==1){
                        nodeStatus="活跃";
                    }else{
                        nodeStatus="空闲";
                    }
                    //stringarray[0]=data.data[i].nodeId;
                    //stringarray[1]=data.data[i].historyTaskAmount;
                    var stringForConvert=data.data[i].nodeId+"&"+data.data[i].taskAmount+"&"+idforlog+"&"+textforOperateButton;
                    var stringfortr ="<tr class=\"gradeX\">"+
                        "<td class=\"center\"><input type=\"checkbox\" name=\"checkList\"></td>"+
                        "<td class=\"center\">"+idforlog+"</td>"+
                        "<td class=\"center\">"+data.data[i].nodeId+"</td>"+
                        "<td class=\"center\">"+data.data[i].type+"</td>"+
                        "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
                        "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
                        "<td class=\"center\" id=\""+data.data[i].nodeId+"\">"+nodeStatus+"</td>"+
                        "<td class=\"hidden-xs\"><a onclick=\"changeToTaskView("+data.data[i].nodeId+")\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].taskAmount+"</a></td>"+
                        "<td class=\"center\"><a onclick='showtheHisTask("+data.data[i].nodeId+")'  class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].historyTaskAmount+"</a></td>"+
                        "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">详情</a></td>"+
                        "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">详情</a></td>"+
                        "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">详情</a></td>"+
                        "<td class=\"center hidden-xs\"><a onclick='showTheWarnModal(this)' id="+stringForConvert+" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+textforOperateButton+"</a></td>"+
                        "</tr>";
                    stringfortrlist = stringfortrlist + stringfortr;
                }
                $("#datatableForNode").dataTable().fnDestroy();
                $("#datatableForTask").dataTable().fnDestroy();
                $('#tbodyfornodelist').html(stringfortrlist);
                AutoCheckLang();
                $("#datatableForTask").css("width","100%");
            }
        });
    }
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
    $("#sureForDeleteOneNode").click(function () {//点击关闭此节点，根据nodeId
        //alert("!!#");
        index=index-1;
        var index=$("#hiddenforIndex").val();
        var nodeIds=$("#hiddenforDeleteOneNode").val();
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/node/closeNode",//接口名字
            dataType: "json",
            data:{nodeId:nodeIds},
            contentType: "application/json; charset=utf-8",
            success: function (data) {//删除成功node/closeNode
                alert("删除成功了！");
                console.log(data.data);
                $('#wangyunodeAmount').text(data.data);//给节点数减1
                $("table#datatableForNode tbody").find("tr:eq("+index+")").remove();

            }
        });
    });
    $('#datatableForNode tbody').on('click', 'tr input[name="checkList"]', function () {//选中行及行的个数
        var $tr = $(this).parents('tr');
        //var nodeId=$(this).parents("tr").find("td:eq(3)")[0].find("a:eq(0)").text();//获取将要删除的行中的节点ID,.find("a:eq(0)").text()
        var index=$("#idForIndexWhenDeleteNodes").val();//取出待修改的id
        index=index-1;
        //var limitAmount=$("table#datatable2 tbody").find("tr:eq("+index+")").find("td:eq(3)").find("a:eq(0)").text();//用于限制用户即将删除的节点的个数
        //alert("这是限制数！！"+limitAmount);
        $tr.toggleClass('selected');
        var $tmp = $('[name=checkList]:checkbox');
        $('#checkAll').prop('checked', $tmp.length == $tmp.filter(':checked').length);
        //alert($tmp.filter(':checked').length);
        //$('#delNodeBut_id').attr("disabled", false);
        //if(limitAmount-$tmp.filter(':checked').length<2){
        //    alert("至少得留俩吧大兄弟！！");
        //    //$tr.toggleClass('selected');
        //    $('#delNodeBut_id').attr("disabled", true);
        //}
    });
    $("#ToolTables_datatableForNode_0").on("click", function (e) {//点击删除按钮时，删除选中的行
        // table.row('.selected').remove().draw(false);
        alert("我要删除节点了！");
        var nodeIds="";
        var indexfordelete=new Array();
        $("input[name='checkList']:checked").each(function () { // 遍历选中的checkbox
            n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
            var nodeId=$(this).parents("tr").find("td:eq(2)")[0].innerText;//获取将要删除的行中的节点ID
            nodeIds=nodeIds+nodeId+",";//以，分割
            indexfordelete.push(n);
            //$("table#datatableForDeleteNode tbody").find("tr:eq(" + n + ")").remove();
        });
        var dataforUserDeleteNode= JSON.stringify({
            username:$('#idForUsernameWhenDeleteNodes').val(),
            nodeIds:nodeIds
        });
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/user/deleteNode",//接口名字
            dataType: "json",
            data:dataforUserDeleteNode,
            contentType: "application/json; charset=utf-8",
            success: function (data) {//删除成功
                alert("删除成功了！");
                var index=$("#idForIndexWhenDeleteNodes").val();//取出待修改的id
                index=index-1;
                $("table#datatable2 tbody").find("tr:eq("+index+")").find("td:eq(3)").find("a:eq(0)").text(data.data);
                //if(data.data<=2){
                //    $("table#datatable2 tbody").find("tr:eq("+index+")").find("td:eq(4)").find("i:eq(1)").css("color","color: #999999;");
                //    $("table#datatable2 tbody").find("tr:eq("+index+")").find("td:eq(4)").find("i:eq(1)").removeAttr("onclick");
                //}
            }
        });
    });

});