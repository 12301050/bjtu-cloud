var myDate = new Date();
//alert(myDate);
var date=myDate.toLocaleDateString();    //获取当前日期
var nowdate = date.replace("/","-");
nowdate = nowdate.replace("/","-");
//alert(nowdate);
var start = "2016-10-1";
var startTime = getDate(start);
var endTime = getDate(nowdate);//当前时间
var datearray=new Array();
var shortdatearray;
countTheDate();//初始化展示全部日期
function countTheDate() {
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
        var year = startTime.getFullYear();
        var month = startTime.getMonth().toString().length == 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth();
        var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
        //alert(year+"-"+month+"-"+day);
        datearray.push(year + "-" + month + "-" + day);
        startTime.setDate(startTime.getDate() + 1);
        //alert(endTime.getTime()+"###"+startTime.getTime());
    }
}
function countTheShortDate(startTime,endTime) {
    shortdatearray=new Array();
    while ((endTime.getTime() - startTime.getTime()) >= 0) {
        var year = startTime.getFullYear();
        var month = startTime.getMonth().toString().length == 1 ? "0" + startTime.getMonth().toString() : startTime.getMonth();
        var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
        //alert(year+"-"+month+"-"+day);
        shortdatearray.push(year + "-" + month + "-" + day);
        startTime.setDate(startTime.getDate() + 1);
        //alert(endTime.getTime()+"###"+startTime.getTime());
    }
}
function getDate(datestr){
    var temp = datestr.split("-");
    var date = new Date(temp[0],temp[1],temp[2]);
    return date;
}
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    function AutoCheckLang() { //检查缓存中之前所设置的语言
        if (localStorage.langclose == 1) {
            change_ch();
        }
        else if (localStorage.langclose == 2) {
            change_en();
        }
        else {
            localStorage.langclose = 1;
        }
    }
}
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

    $("#Dashboard_h3").html("LOG MANAGEMENT");
    $("#Skins_id").html("skins");
    $("#langli").html("language");
    $("#logout_id").html("log out");
    $("#CPCEP_id").html("log list");
    $("#user_mangid").html("USER MANAGEMENT");
    $("#task_mangid").html("TASK MANAGEMENT");
    $("#log_mangid").html("LOG MANAGEMENT");
    $("#home_id").html("Home");
    $("#number_id").html("number");
    $("#log_text").html("log list");
    $("#Sure_id").html("Sure");
    // $("#delCancel_id").html("Cancel");
    $("#date_id").html("date");
    $("#details_id").html("details");
    $("#datatableForLog").dataTable().fnDestroy();
    $("#datatableforloglist").dataTable().fnDestroy();
    //$("#datatableForTask").dataTable().fnDestroy();

    var table=$('#datatableForLog').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ "copy",  "csv", "pdf" ],
            sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        }

    });
    $('#datatableforloglist').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ "copy",  "csv", "pdf" ],
            sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        }

    });
//    $('#datatableForTask').dataTable({
//        "sPaginationType": "bs_full",
//        "sPaginate": false,
//        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
//        select:true,
//        oTableTools: {
//            aButtons: [ "copy",  "csv", "pdf" ],
//            sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
//        }
//
//    });
    App.setPage("index");  //Set current page
}
function change_ch(){//变为中文
    $("#Dashboard_h3").html("日志管理");
    $("#Skins_id").html("皮肤");
    $("#logout_id").html("注销");
    $("#langli").html("更换语言");
    $("#CPCEP_id").html("日志列表");
    $("#user_mangid").html("用户管理");
    $("#task_mangid").html("任务管理");
    $("#log_mangid").html("日志管理");
    $("#home_id").html("主页");
    $("#number_id").html("编号");
    $("#log_text").html("日志列表");
    $("#Sure_id").html("确定");
    $("#date_id").html("日期");
    $("#details_id").html("详情");
    $("#datatableForLog").dataTable().fnDestroy();
    $("#datatableforloglist").dataTable().fnDestroy();
    //$("#datatableforloglist").dataTable().fnDestroy();
    var table=$('#datatableForLog').dataTable({
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
    $('#datatableforloglist').dataTable({
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
function showTheNodeLog(obj){
    var operateTime=obj.id;
    $('#table-modal-showlog').modal('show');
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/log/getNodeRecordByDate",//接口名字，获取节点log信息
        dataType: "json",
        data:{operateTime:operateTime},
        //contentType: "application/json; charset=utf-8",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog=i+1;
                var mode = (data.data[i].mode=="0")?"即时任务":"定时任务";

                var stringfortr ="<tr class=\"gradeA\"><td class=\"center\">"+ data.data[i].operateTime+"</td><td class=\"center\">"+ data.data[i].operateName+"</td> <td class=\"center\">"+data.data[i].nodeId+"</td> </tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }


            $("#datatableforloglist").dataTable().fnDestroy();

            $('#tbodyforloglist').html(stringfortrlist);
            AutoCheckLang();
            //$("#datatableForNode").dataTable().fnDestroy();
            //$("#datatableForTask").dataTable().fnDestroy();
            //$('#tbodyforHisTask').html(stringfortrlist);
            //AutoCheckLang();
            $("#datatableforloglist").css("width","100%");
        }
    });
}
function showTheTaskLog(obj){
    var selectDate=obj.id;
    $('#table-modal-showlog').modal('show');
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/log/getTaskRecordByDate",//接口名字，获取任务log信息
        dataType: "json",
        data:operateTime=selectDate,
        //contentType: "application/json; charset=utf-8",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog=i+1;
                var mode = (data.data[i].mode=="0")?"即时任务":"定时任务";
                var stringfortr ="<tr class=\"gradeA\"><td class=\"center\">"+ data.data[i].operateTime+"</td><td class=\"center\">"+ data.data[i].operateName+"</td> <td class=\"center\">"+data.data[i].nodeId+"</td> </tr>";

                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatableforloglist").dataTable().fnDestroy();

            $('#tbodyforloglist').html(stringfortrlist);
            AutoCheckLang();
            //$("#datatableForNode").dataTable().fnDestroy();
            //$("#datatableForTask").dataTable().fnDestroy();
            //$('#tbodyforHisTask').html(stringfortrlist);
            //AutoCheckLang();
            $("#datatableforloglist").css("width","100%");
        }
    });
}
function changeTimeForStart(){//当用户同时选择开始和结束时间后方可向后台请求数据
    if($('#timeForEnd').val()!=""){
        //alert($('#timeForEnd').val());
        //alert($('#timeForStart').val());
        if($('#timeForEnd').val()<$('#timeForStart').val()){
            alert("您选择的开始时间大于结束时间，请重新选择！");
            $('#timeForStart').val("");
            return false;
        }
        var enddate = $('#timeForEnd').val().replace("/","-");
        enddate = enddate.replace("/","-");
        enddate = enddate.replace("/","-");//双过滤
        var strsend = enddate.split("-");
        var year = strsend[2];
        enddate=year+"-"+strsend[0]+"-"+strsend[1];
        var startdate = $('#timeForStart').val().replace("/","-");
        var startdate = startdate.replace("/","-");
        startdate = startdate.replace("/","-");//双过滤
        var strsstart = startdate.split("-");
        year = strsstart[2];
        startdate=year+"-"+strsstart[0]+"-"+strsstart[1];

        var startTime = getDate(startdate);
        var endTime = getDate(enddate);//当前时间
        countTheShortDate(startTime,endTime);//改变全局变量，然后构造日期表格
        var stringfortrlistforshort = "";
        for(var i=shortdatearray.length-1;i>=0;i--){
            var idforlog=shortdatearray.length-i;//逻辑编号
            //var max = (data.data[i].status==1)?"开启":"关闭";
            //console.log(max);
            var stringfortr="<tr class=\"gradeX\">"+
                "<td class=\"center\">"+idforlog+"</td>"+
                "<td class=\"center\">"+shortdatearray[i]+"</td>"+
                "<td class=\"center\"><a onclick='showTheTaskLog(this)' id='"+shortdatearray[i]+"'  class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
                "<td class=\"center\"><a onclick='showTheNodeLog(this)' id='"+shortdatearray[i]+"' class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
                "</tr>";
            stringfortrlistforshort = stringfortrlistforshort + stringfortr;

        }
        $("#datatableForLog").dataTable().fnDestroy();
        $('#tbodyfordatatableLog').html(stringfortrlistforshort);
        AutoCheckLang();
        // alert("开始调用后台");
    }
}
function changeTimeForEnd(){//当用户同时选择开始和结束时间后方可向后台请求数据
    if($('#timeForStart').val()!=""){
        //alert($('#timeForEnd').val());
        //alert($('#timeForStart').val());
        if($('#timeForEnd').val()<$('#timeForStart').val()){
            alert("您选择的结束时间小于开始时间，请重新选择！");
            $('#timeForStart').val("");
            return false;
        }
        var enddate = $('#timeForEnd').val().replace("/","-");
        enddate = enddate.replace("/","-");
        enddate = enddate.replace("/","-");//双过滤
        var strsend = enddate.split("-");
        var year = strsend[2];
        enddate=year+"-"+strsend[0]+"-"+strsend[1];
        var startdate = $('#timeForStart').val().replace("/","-");
        var startdate = startdate.replace("/","-");
        startdate = startdate.replace("/","-");//双过滤
        var strsstart = startdate.split("-");
        year = strsstart[2];
        startdate=year+"-"+strsstart[0]+"-"+strsstart[1];

        var startTime = getDate(startdate);
        var endTime = getDate(enddate);//当前时间
        countTheShortDate(startTime,endTime);//改变全局变量，然后构造日期表格
        var stringfortrlistforshort = "";
        for(var i=shortdatearray.length-1;i>=0;i--){
            var idforlog=shortdatearray.length-i;//逻辑编号
            //var max = (data.data[i].status==1)?"开启":"关闭";
            //console.log(max);
            var stringfortr="<tr class=\"gradeX\">"+
                "<td class=\"center\">"+idforlog+"</td>"+
                "<td class=\"center\">"+shortdatearray[i]+"</td>"+
                "<td class=\"center\"><a onclick='showTheTaskLog(this)' id='"+shortdatearray[i]+"'  class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
                "<td class=\"center\"><a onclick='showTheNodeLog(this)' id='"+shortdatearray[i]+"' class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
                "</tr>";
            stringfortrlistforshort = stringfortrlistforshort + stringfortr;

        }
        $("#datatableForLog").dataTable().fnDestroy();
        $('#tbodyfordatatableLog').html(stringfortrlistforshort);
        AutoCheckLang();
    }
}
jQuery(document).ready(function() {	//首先渲染

    var stringfortrlist = "";
    for(var i=datearray.length-1;i>=0;i--){
        var idforlog=datearray.length-i;//逻辑编号
        //var max = (data.data[i].status==1)?"开启":"关闭";
        //console.log(max);
        var stringfortr="<tr class=\"gradeX\">"+
            "<td class=\"center\">"+idforlog+"</td>"+
            "<td class=\"center\">"+datearray[i]+"</td>"+
            "<td class=\"center\"><a onclick='showTheTaskLog(this)' id='"+datearray[i]+"'  class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
            "<td class=\"center\"><a onclick='showTheNodeLog(this)' id='"+datearray[i]+"'  class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">查看</a></td>"+
            "</tr>";
        stringfortrlist = stringfortrlist + stringfortr;

    }
    $("#datatableForLog").dataTable().fnDestroy();
    $('#tbodyfordatatableLog').html(stringfortrlist);
    AutoCheckLang();

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
    App.setPage("index");  //Set current page，这俩破玩意竟然和换肤有关
    App.init(); //Initialise plugins and elements

    // $.ajax({
    //    type: "GET",
    //    url: "http://localhost:8080/api/log/getAllTaskRecord",//接口名字
    //    dataType: "json",
    //    success: function (data) {
    //        var stringfortrlist = "";
    //        for (var i = 0; i < data.data.length; i++) {
    //            var idforlog=i+1;
    //            var stringfortr ="<tr class=\"gradeX\">"+
    //                "<td ><input type=\"checkbox\" name=\"checkList\"></td>"+
    //                "<td>"+idforlog+"</td>"+
    //                "<td>"+data.data[i].nodeId+"</td>"+
    //                "<td class=\"center\">"+data.data[i].type+"</td>"+
    //                "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
    //                "<td class=\"center\">"+data.data[i].nodeName+"</td>"+
    //                "<td class=\"center hidden-xs\">"+data.data[i].status+"</td>"+
    //                "<td class=\"hidden-xs\"><a onclick=\"changeToTaskView()\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].taskAmount+"</a></td>"+
    //                "<td class=\"center\"><a href=\"#table-modal-his\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">"+data.data[i].historyTaskAmount+"</a></td>"+
    //                "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">38%</a></td>"+
    //                "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">56%</a></td>"+
    //                "<td class=\"center hidden-xs\"><a href=\"#table-modal-showVelocity\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">28%</a></td>"+
    //                "<td class=\"center hidden-xs\"><a href=\"#table-modal-closeNode\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">关闭</a></td>"+
    //                "</tr>";
    //            stringfortrlist = stringfortrlist + stringfortr;
    //        }
    //        //$("#datatableForLog").dataTable().fnDestroy();
    //        //$('#tbodyfornodelist').html(stringfortrlist);
    //        AutoCheckLang();
    //    }
    //});

});