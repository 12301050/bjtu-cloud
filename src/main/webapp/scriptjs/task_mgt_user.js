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
    $("#logout_id").html("logout");
    $("#CPCEP_id").html("task list");
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
    $("#create_button").html("create");
    $("#datatableTaskUser").dataTable().fnDestroy();
    var table=$('#datatableTaskUser').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [
                {
                    "sExtends": "select",
                    "sButtonText": "删除" ,
                    //"id":"deletebutton",
                },
                "copy",  "csv", "pdf" ],
            sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        }

    });

    App.setPage("index");  //Set current page
}
function change_ch(){//变为中文
    $("#Dtask").html("任务管理");
    $("#Skins_id").html("皮肤");
    $("#logout_id").html("注销");
    $("#langli").html("更换语言");
    $("#CPCEP_id").html("任务列表");
    $("#node_mgt_id").html("节点管理");
    $("#task_mgt_id").html("任务管理");
    $("#his_mgt_id").html("历史任务");
    $("#home_id").html("主页");
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
    $("#create_button").html("创建");
    $("#datatableTaskUser").dataTable().fnDestroy();
    var table=$('#datatableTaskUser').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ {
                "sExtends": "select",
                "sButtonText": "删除" ,
                //"id":"deletebutton",
            }
                // ,{
                //     "sExtends": "select",
                //     "sButtonText": "创建" ,
                //     //"id":"deletebutton",
                // }
                ,"copy",  "csv", "pdf" ],
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
function showTheInputForTimerTask(){
    var tasktype=$("#tasktype").val();
    if(tasktype=="1"){
        $('#displayForTimerMode').css("display","block")
        $('#displayForTimerStartTime').css("display","block")
        $('#displayForTimerTimes').css("display","block")
    }else{
        $('#displayForTimerMode').css("display","none")
        $('#displayForTimerStartTime').css("display","none")
        $('#displayForTimerTimes').css("display","none")
    }
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
            var mydate = new Date();

            for (var i = 0; i < data.data.length; i++) {
                var starttime=data.data[i].startTime;
                var nowtime= getnowtime(); //获取当前时间
                // if(endtime==null){
                //     endtime="运行中";
                // }

                var stringfortr ="<tr class=\"gradeX\">"+
                        "<td>"+starttimeText+"</td>"+
                        "<td>"+starttime+"</td>"+
                        "</tr>"
                        // +
                        // "<tr class=\"gradeX\">"+
                        // "<td>"+endtimeText+"</td>"+
                        // "<td>"+endtime+"</td>"+
                        // "</tr>"
                    ;
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
                        "</tr>";
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


function creatTask(){ //新建任务
    if(checkRequiredField()){
        alert("创建成功");
        location.reload();
        $("#task_form").submit();}
}

function chooseNode(){ //新建任务
    //var nodename=$("#nodename").val();
    // var objname=document.getElementById("nodename").value;
    // alert(objname);
    var objindex=document.getElementById("nodename").selectedIndex;
    document.getElementById("chooseNodeId").selectedIndex=objindex;
    // alert(objindex);
    var objid=document.getElementById("chooseNodeId").options[objindex].value;
    // alert(objid);


}

function checkRequiredField(){  //必填项控制

    var taskName=$("#inputTaskName").val();
    $("#inputTaskName").css("border-color","#cccccc");
    $("#chooseTime").css("border-color","#cccccc");
    $("#timeForTaskStart").css("border-color","#cccccc");
    $("#hour").css("border-color","#cccccc");
    $("#Minute").css("border-color","#cccccc");
    $("#inputTwiatter").css("border-color","#cccccc");
    $("#file").css("border-color","#cccccc");

    if(taskName==""){
        $("#inputTaskName").css("border-color","red");
        return false;
    }
    var nodeName=$("#nodename").val();

    var taskMode=$("#tasktype").val();
    if(taskMode=="1"){
        var chooseTime=$("#chooseTime").val();
        alert(chooseTime);
        if(chooseTime==""){
            $("#chooseTime").css("border-color","red");
            return false;
        }
        var timeForTaskStart=$("#timeForTaskStart").val();
        alert(timeForTaskStart);
        if(timeForTaskStart==""){
            $("#timeForTaskStart").css("border-color","red");
            return false;
        }
        var hour=$("#hour").val();
        if(hour==""){
            $("#hour").css("border-color","red");
            return false;
        }
        var Minute=$("#Minute").val();
        if(Minute==""){
            $("#Minute").css("border-color","red");
            return false;
        }
        var times=$("#inputTwiatter").val();
        if(times==""){
            $("#inputTwiatter").css("border-color","red");
            return false;
        }
    }
    var file=$("#file").val();
    if(taskName==""){
        $("#file").css("border-color","red");
        return false;
    }
    return true;
}
function showNodeByUser(){ //动态显示下拉框
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
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/node/getNodeByUser",//根据用户查节点
        dataType: "json",
        data:{"userName":username},
        success: function (data) {
            var stringforoplist = "";
            var stringforhidelist = "";
            for (var i = 0; i < data.data.length; i++) {
                var str=data.data[i].nodeName;//+"   nodeId"+data.data[i].nodeId;
                var stringforop="<option>"+str+"</option>";
                var strforhide="<option>"+data.data[i].nodeId+"</option>";
                stringforoplist = stringforoplist + stringforop;
                stringforhidelist=stringforhidelist+strforhide;
            }

            $('#nodename').html(stringforoplist);
            $('#chooseNodeId').html(stringforhidelist);

            AutoCheckLang();
        }
    });
}
function changeTaskName(obj){
    var newtaskName=$(obj).val();
    var taskId=obj.id;
    alert(newtaskName);
    alert(taskId);
    $.ajax({   //修改节点名
        type:"POST",
        url:"http://localhost:8080/api/task/rename",
        data:{"taskName":newtaskName,"id":taskId},
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

    var status = 1;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/task/getTaskByUserName",//接口名字
        dataType: "json",
        data:{"userName":username,"status":status},
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog=i+1;
                var status="";
                var taskstatus=(data.data[i].status==-1)?"等待":((data.data[i].status==0)?"结束":"运行");
                var tasktype=(data.data[i].type==0)?"Binary":((data.data[i].type==1)?"Java":"Python");
                var taskmode=(data.data[i].mode==0)?"即时":"定时";
                var stringfortr ="<tr class=\"gradeX\">"+
                    "<td ><input type=\"checkbox\" name=\"checkList\"></td>"+
                    "<td>"+idforlog+"</td>"+
                    "<td class=\"center\"><textarea id='"+data.data[i].id+"' style='resize: none;background:transparent;border-style:none;' onchange='changeTaskName(this)'>"+data.data[i].taskName+"</textarea></td>"+
                    "<td>"+data.data[i].taskName+"</td>"+
                    "<td class=\"center\">"+taskmode+"</td>"+
                    "<td class=\"center\">"+tasktype+"</td>"+
                    "<td class=\"center\">"+data.data[i].nodeId+"</td>"+
                    "<td class=\"center hidden-xs\">"+taskstatus+"</td>"+
                    "<td class=\"center hidden-xs\"><a href=\"#table-modal-showTaskSchedual\" data-toggle=\"modal\" class=\"btn btn-info\" onclick=\"showTimeInfoByTask("+data.data[i].id+")\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
                    "<td class=\"center hidden-xs\"><a onclick=\"showThreeChartsWhenViewTask()\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
                    "</tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatableTaskUser").dataTable().fnDestroy();

            $('#datatableForTaskUser').html(stringfortrlist);
            AutoCheckLang();

        }
    });
    App.setPage("index");  //Set current page，这俩破玩意竟然和换肤有关
    App.init(); //Initialise plugins and elements

    $("#create_task_button").click(function(){  //填充下拉框
        showNodeByUser();
    });
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

    // $("#create_button").click(function () {
    //    // alert("dssd");
    //     if(checkRequiredField()){
    //         alert("嘿嘿嘿");
    //     }
    //     else alert("输入啦啦啦");
    // });
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