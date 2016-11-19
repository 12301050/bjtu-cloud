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

    $("#DHis").html("HISTORY TASK");
    $("#Skins_id").html("skins");
    $("#langli").html("language");
    $("#logout_id").html("logout");
    $("#CPCEP_id").html("task list");
    $("#node_mgt_id").html("NODE MANAGEMENT");
    $("#task_mgt_id").html("TASK MANAGEMENT");
    $("#his_mgt_id").html("HISTORY MANAGEMENT");
    $("#home_id").html("Home");
    $("#task_list").html("task list");
    $("#number_id").html("number");
    $("#node_id").html("nodeID");
    $("#node_state").html("node state");
    $("#node_type").html("node type");
    $("#task_mode").html("node model");
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
    $("#task_state").html("task state");
    $("#node").html("Subordinate node");
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
    $("#time_text").html("task time information");
    $("#tips").html("tips");
    $("#cpu_info").html("cpu information");
    $("#cpu_sure").html("sure");
    $("#cpu_graph").html("CPU line chart");
    $("#ram_graph").html("Memory line chart");
    $("#net_graph").html("Net line chart");
    $("#datatableHisTaskUser").dataTable().fnDestroy();
    var table=$('#datatableHisTaskUser').dataTable({
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
    $("#DHis").html("历史任务");
    $("#Skins_id").html("皮肤");
    $("#logout_id").html("注销");
    $("#langli").html("更换语言");
    $("#CPCEP_id").html("任务列表");
    $("#node_mgt_id").html("节点管理");
    $("#task_mgt_id").html("任务管理");
    $("#his_mgt_id").html("历史任务");
    $("#home_id").html("主页");
    $("#task_list").html("任务列表");
    $("#number_id").html("编号");
    $("#node_id").html("节点ID");
    $("#node_state").html("节点状态");
    $("#node_type").html("节点类型");
    $("#node_name").html("节点名称");
    $("#user_name").html("用户名");
    $("#task_number").html("正在执行的任务数");
    $("#his_task").html("历史执行任务数");
    $("#cpu").html("cup占用率");
    $("#ram").html("内存使用率");
    $("#net").html("带宽占用率");
    $("#operate").html("操作");
    $("#his_number").html("编号");
    $("#task_name").html("任务名称");
    $("#node").html("所在节点");
    $("#task_type").html("任务类型");
    $("#task_mode").html("任务模式");
    $("#time_info").html("时间信息");
    $("#close_button").html("关闭");
    $("#task_number1").html("编号");
    $("#task_name1").html("任务名称");
    $("#task_type1").html("任务类型");
    $("#time_info1").html("时间信息");
    $("#resource_info").html("资源信息");
    $("#button_close_id").html("关闭");
    $("#his_text").html("历史任务");
    $("#sureText_id").html("正在执行6个任务，确定关闭该节点？");
    $("#sure").html("确定");
    $("#cancel").html("取消");
    $("#node_list").html("任务列表");
    $("#sure_time").html("确认");
    $("#time_text").html("任务时间信息");
    $("#tips").html("提示");
    $("#cpu_info").html("cpu 动态信息");
    $("#cpu_sure").html("确定");
    $("#cpu_graph").html("cpu曲线图");
    $("#ram_graph").html("内存曲线图");
    $("#net_graph").html("网络带宽曲线图");
    $("#datatableHisTaskUser").dataTable().fnDestroy();
   // $("#datatableForHisTask").dataTable().fnDestroy();
    var table=$('#datatableHisTaskUser').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ "copy",  "csv", "pdf" ],
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

function showTimeInfoByTask(taskId) {  //根据任务id获取时间信息
    taskid = parseInt(taskId);
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/api/task/queryTimeInfo",//接口名字，根据任务id获取时间信息
        data: {"taskId": taskid},
        success: function (data) {
            var stringfortrlist = "";
            var starttimeText="开始时间";
            var endtimeText="结束时间";
            for (var i = 0; i < data.data.length; i++) {
                var starttime=data.data[i].startTime;
                var endtime=data.data[i].endTime;
                var stringfortr ="<tr class=\"gradeX\">"+
                        "<td>"+starttimeText+"</td>"+
                        "<td>"+starttime+"</td>"+
                        "</tr>"+
                        "<tr class=\"gradeX\">"+
                        "<td>"+endtimeText+"</td>"+
                        "<td>"+endtime+"</td>"+
                        "</tr>"
                    ;
                    starttime = new Date(Date.parse(starttime.replace(/-/g,   "/"))).getTime();
                    endtime = new Date(Date.parse(endtime.replace(/-/g,   "/"))).getTime();
                    var runtime=endtime-starttime;
                    var day = parseInt(runtime/(1000*60*60*24)); //获取相差多少天
                    runtime=runtime -day*(1000*60*60*24);
                    var H = parseInt(runtime/(1000*60*60));
                    runtime=runtime-H*(1000*60*60);
                    var M =parseInt(runtime/(1000*60));
                    runtime=runtime-M*(1000*60);
                    var S = parseInt(runtime/(1000));
                    stringfortr=stringfortr+
                        "<tr class=\"gradeX\">"+
                        "<td>"+"执行时间"+"</td>"+
                        "<td>"+day+" Day "+H+" Hours "+M+" Minutes "+S+" second "+"</td>"+
                        "</tr>"

                if(data.data[i].mode){ //判断任务模式
                    var timemode="";
                    switch (data.data[i].mode){
                        case 1:
                            timemode="按时";
                            break;
                        case 2:
                            timemode="按天";
                            break;
                        case 3:
                            timemode="按周";
                            break;
                        case  4:
                            timemode="按月";
                            break;
                        case 5:
                            timemode="按年";
                            break;
                    }
                    stringfortr+=
                        "<tr class=\"gradeX\">"+
                        "<td>"+"定时模式"+"</td>"+
                        "<td>"+timemode+"</td>"+
                        "</tr>"+
                        "<tr class=\"gradeX\">"+
                        "<td>"+"任务执行次数"+"</td>"+
                        "<td>"+data.data[i].times+"</td>"+
                        "</tr>"+
                        "<tr class=\"gradeX\">"+
                        "<td>"+"已执行次数"+"</td>"+
                        "<td>"+data.data[i].execTimes+"</td>"+
                        "</tr>"
                    ;
                }
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $('#gettimelist').html(stringfortrlist);
            AutoCheckLang();
        }
    });
}
function getTaskByUserName() {
    var username = "";
    $.ajax({   //获取服务器的session,获取当前用户名
        type:"GET",
        url:"api/user/session",
        async: false,
        data:"",
        timeout: 1000,
        error: function(){
            alert('sorry, server is busy now!');
        },
        success:function(data){
            username=data;
        }
    });
    if(username==""){
        alert("请先登录！");
        window.location.href="http://localhost:8080/login_bg.html";
    }
    var status = 2;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/task/getTaskByUserName",//接口名字
        dataType: "json",
        data:{"userName":username,"status":status},
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog=i+1;
                // var taskstatus=data.data[i].status;
                // var tasktype=data.data[i].type;
                // var taskmode=data.data[i].mode;
                var taskstatus=(data.data[i].status==2)?"结束":((data.data[i].status==1)?"运行":"结束");
                var tasktype=(data.data[i].type==0)?"Binary":((data.data[i].type==1)?"Java":"Python");
                var taskmode=(data.data[i].mode==0)?"即时":"定时";
                var stringfortr ="<tr class=\"gradeX\">"+
                    //"<td ><input type=\"checkbox\" name=\"checkList\"></td>"+
                    "<td>"+idforlog+"</td>"+
                    "<td>"+data.data[i].taskName+"</td>"+
                    "<td class=\"center\">"+tasktype+"</td>"+
                    "<td class=\"center\">"+taskmode+"</td>"+
                    "<td class=\"center\">"+data.data[i].nodeId+"</td>"+
                    //  "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
                    "<td class=\"center hidden-xs\">"+taskstatus+"</td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-showTaskSchedual\" data-toggle=\"modal\" class=\"btn btn-info\" onclick=\"showTimeInfoByTask("+data.data[i].id+")\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
                    "</tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            //  $("#datatableTaskUser").dataTable().fnDestroy();
            $('#tbodyforhistasklist').html(stringfortrlist);
            AutoCheckLang();
        }
    });
}
jQuery(document).ready(function() {	//首先渲染
    getTaskByUserName();
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