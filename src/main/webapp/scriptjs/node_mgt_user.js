function AutoCheckLang(){ //检查缓存中之前所设置的语言
    $("#datatableForTask").css("width","100%");
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

    $("#Dnode").html("NODE MANAGEMENT");
    $("#Skins_id").html("skins");
    $("#langli").html("language");
    $("#logout_id").html("log out");
    $("#node_list_id").html("node list");
    $("#node_mgt_id").html("NODE MANAGEMENT");
    $("#task_mgt_id").html("TASK MANAGEMENT");
    $("#his_mgt_id").html("HISTORY MANAGEMENT");
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
    $("#task_list").html("task list");
    $("#execute_time").html("execute time");
    $("#start_time").html("start time");
    $("#end_time").html("end time");
    $("#sure_time").html("sure");
    $("#time_text").html("time information");
    $("#tips").html("tips");
    $("#cpu_info").html("cpu information");
    $("#cpu_sure").html("sure");
    $("#datatableNodeUser").dataTable().fnDestroy();
    $("#datatableForTask").dataTable().fnDestroy();
    var table=$('#datatableNodeUser').dataTable({
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
    $("#Dnode").html("节点管理");
    $("#Skins_id").html("皮肤");
    $("#logout_id").html("注销");
    $("#langli").html("更换语言");
    $("#node_mgt_id").html("节点管理");
    $("#task_mgt_id").html("任务管理");
    $("#his_mgt_id").html("历史任务");
    $("#home_id").html("主页");
    $("#node_list_id").html("节点列表");
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
    $("#task_type").html("任务类型");
    $("#time_info").html("时间信息");
    $("#close_button").html("关闭");
    $("#task_list").html("任务列表");
    $("#task_number1").html("编号");
    $("#task_name1").html("任务名称");
    $("#task_type1").html("任务类型");
    $("#time_info1").html("时间信息");
    $("#resource_info").html("资源信息");
    $("#button_close_id").html("关闭");

    $("#datatableNodeUser").dataTable().fnDestroy();
    $("#datatableForTask").dataTable().fnDestroy();
    var table=$('#datatableNodeUser').dataTable({
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
    var table=$('#datatableForTask').dataTable({
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
function getTaskByNode(obj){//获取正在执行的任务
    var nodeid=obj.id;
        var nodeidAndStatus=JSON.stringify({nodeId:nodeid,status:1});
        // var button=(localStorage.lang==1)?"查看":"check";
        var button="查看";
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
                        "<td class=\"center hidden-xs\"><a href=\"#table-modal-showTaskSchedual\" data-toggle=\"modal\" class=\"btn btn-info\" onclick=\"showTimeInfoByTask("+data.data[i].id+")\" style=\"font-size:4px;padding:0px 8px;\">"+button+"</a></td>"+
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
            for (var i = 0; i < data.data.length; i++) {
                var starttime=data.data[i].startTime;
                var nowtime= getnowtime();//获取当前时间
                var stringfortr ="<tr class=\"gradeX\">"+
                        "<td>"+starttimeText+"</td>"+
                        "<td>"+starttime+"</td>"+
                        "</tr>";
                    starttime = new Date(Date.parse(starttime.replace(/-/g,   "/"))).getTime();
                    nowtime = new Date(Date.parse(nowtime.replace(/-/g,   "/"))).getTime();
                    var runtime=nowtime-starttime;
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
                        "<td>"+"执行次数"+"</td>"+
                        "<td>"+data.data[i].execTimes+"/"+data.data[i].times+"</td>"+
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
function changeNodeName(obj) {   //修改节点名
    var newtaskName=$(obj).val();
    var nodeId=obj.id;
    $.ajax({   //修改节点名
        type:"POST",
        url:"http://localhost:8080/api/node/rename",
        data:{"nodeName":newtaskName,"nodeId":nodeId},
        timeout: 1000,
        error: function(){
            alert('sorry');
        },
        success:function(data){
            if(data.data==1){
                alert("修改成功");
                location.reload();
            }
            else
                alert("修改失败");

        }
    });
}
jQuery(document).ready(function() {	//首先渲染
    var username = "";
    $.ajax({   //获取服务器的session,获取当前用户名
        type:"GET",
        url:"http://localhost:8080/api/user/session",
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
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/getNodeByUser",//根据用户查节点
        dataType: "json",
        data:{"userName":username},
        success: function (data) {
            var stringfortrlist = "";
              for (var i = 0; i < data.data.length; i++) {
                  var nodetype=(data.data[i].type==0)?"Binary":((data.data[i].type==1)?"Java":"Python");
                  var nodestatus=(data.data[i].status==1)?"开启":((data.data[i].status==2)?"关闭":"等待");
                  var idforlog=i+1;
                  var stringfortr ="<tr class=\"gradeX\">"+
                 //   "<td ><input type=\"checkbox\" name=\"checkList\"></td>"+
                    "<td>"+idforlog+"</td>"+
                    "<td >"+data.data[i].nodeId+"</td>"+
                    "<td class=\"center\"><textarea id='"+data.data[i].nodeId+"' style='resize: none;background:transparent;border-style:none;' onchange='changeNodeName(this)'>"+data.data[i].nodeName+"</textarea></td>"+
                    "<td class=\"center\">"+nodetype+"</td>"+
                    "<td class=\"center hidden-xs\">"+nodestatus+"</td>"+

                    "<td class=\"center hidden-xs\"><a onclick='getTaskByNode(this)' id='"+data.data[i].nodeId+"' class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].taskAmount+"</a></td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">详情</a></td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">详情</a></td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">详情</a></td>"+
                    "</tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatableNodeUser").dataTable().fnDestroy();
            $("#datatableForTask").dataTable().fnDestroy();
            $("#datatableForTask").css("width","100%");
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
                // location.reload();
            }
            else if(localStorage.lang==2){
                localStorage.lang=1;
                localStorage.langclose=1;
                change_ch();
                // location.reload();
            }
        }
        else{
            localStorage.lang=2;
            localStorage.langclose=2;
            change_en();

        }
    });
});

function getnowtime() {  //获取当前时间
    var nowtime = new Date();
    var year = nowtime.getFullYear();
    var month = padleft0(nowtime.getMonth() + 1);
    var day = padleft0(nowtime.getDate());
    var hour = padleft0(nowtime.getHours());
    var minute = padleft0(nowtime.getMinutes());
    var second = padleft0(nowtime.getSeconds());
    var millisecond = nowtime.getMilliseconds(); millisecond = millisecond.toString().length == 1 ? "00" + millisecond : millisecond.toString().length == 2 ? "0" + millisecond : millisecond;
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}
//补齐两位数
function padleft0(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}