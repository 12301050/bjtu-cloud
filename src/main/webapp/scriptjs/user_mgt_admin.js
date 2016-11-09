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
    $("#datatable2").dataTable().fnDestroy();
    var table=$('#datatable2').dataTable({
        "sPaginationType": "bs_full",
        "sPaginate": false,
        sDom: "<'row'<'dataTables_header clearfix'<'col-md-4'l><'col-md-8'Tf>r>>t<'row'<'dataTables_footer clearfix'<'col-md-6'i><'col-md-6'p>>>",
        select:true,
        oTableTools: {
            aButtons: [ "copy",  "csv", "pdf" ],
            sSwfPath: "js/datatables/extras/TableTools/media/swf/copy_csv_xls_pdf.swf"
        }

    }             );
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
    $("#datatable2").dataTable().fnDestroy();
    var table=$('#datatable2').dataTable({
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
function changethedropdownbutton(obj){//更新下拉按钮名字以示选中状态
    $("#type_id").text(obj.text);
}
function showtheaddnodemodal(obj){//给用户添加节点时给模态框传值
    $('#table-modal-addOneNodeForUser').modal('show');
    var test=$(this);
    $('#idForUsernameWhenAddOneNode').val(obj.id);
}
function showtheDeletenodemodal(obj){//删除节点时首先获取当前时间该用户名下的所有节点信息
    var username=obj.id;
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
                var max = (status==1)?"关闭":"开启";
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
function deleteUserByUsername(username){//当用户名下没有正在运行的任务时，删除该用户
    $.ajax({
        type: "POST",
        data:{username:username},
        url: "http://localhost:8080/api/user/deleteUser",//接口名字
        dataType: "json",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog=i+1;
                var idforNodeAmount=data.data[i].userName+"nodeAmount";//设置表示节点个数的id号
                var stringfortr = "<tr class=\"gradeX\">" +
                    "<td class=\"center\">" + idforlog + "</td><td class=\"center\">" + data.data[i].id + "</td>" +
                    "<td class=\"center\">" + data.data[i].userName+"</td>"+
                    "<td class=\"center\"><a id=\""+idforNodeAmount+"\" href=\"task_mgt_admin.html\"class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">" + data.data[i].nodeAmount+"</a></td>" +
                    "<td class=\"center\"><i class=\"fa fa-plus-square\" id=\""+data.data[i].userName+"\" style=\"color: #70afc4;\" href=\"#table-modal-addOneNodeForUser\" onclick=\"showtheaddnodemodal(this)\">"+
                    "</i>&nbsp&nbsp&nbsp<i href=\"#table-modal-deleteOneOrMoreNodeForUser\" style=\"color: #70afc4;\" data-toggle=\"modal\"class=\"fa fa-minus-square\"></i>"+
                    "</td><td class=\"center\"><a id=\""+data.data[i].userName+"\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\" onclick=\"showthedeleteusermodal(this)\">删除</a></td>" +
                    " </tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatable2").dataTable().fnDestroy();
            $('#tableforusernode').html(stringfortrlist);
            AutoCheckLang();
        }
    });
    App.init(); //Initialise plugins and elements
}
function showthedeleteusermodal(obj){//删除某个用户时给模态框传值，同时向后台请求该用户名下的用户状态
    var username=obj.id;
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/user/queryTaskStatusByUser",//接口名字
        dataType: "json",
        //contentType: "application/json; charset=utf-8",
        data:{username:username},
        success: function (data) {
            console.log(data.data);
            if(data.data=="1"){//该用户名下有正在运行的任务，给出相关提示
                $('#hiddenforusername').val(username);//以备用户点击“确定删除”时使用
                $('#table-modal-deleteUser').modal('show');
            }else{//调用删除用户接口，完成删除任务
                deleteUserByUsername(username);
                //alert("删除成功");//重新请求数据
            }
        }
    });
}
function deleteWhenConfirm(){
    var readytodelete=$('#hiddenforusername').val();//获取提前准备好的数据
    deleteUserByUsername(readytodelete);
}
function eventForidforReload(){//刷新按钮重新加载数据
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/user/getAllUserInfo",//接口名字
        dataType: "json",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog=i+1;
                var idforNodeAmount=data.data[i].userName+"nodeAmount";//设置表示节点个数的id号
                var stringfortr = "<tr class=\"gradeX\">" +
                    "<td class=\"center\">" + idforlog + "</td><td class=\"center\">" + data.data[i].id + "</td>" +
                    "<td class=\"center\">" + data.data[i].userName+"</td>"+
                    "<td class=\"center\"><a id=\""+idforNodeAmount+"\" href=\"task_mgt_admin.html?username="+data.data[i].userName+" \"class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">" + data.data[i].nodeAmount+"</a></td>" +
                    "<td class=\"center\"><i class=\"fa fa-plus-square\" id=\""+data.data[i].userName+"\" style=\"color: #70afc4;\" href=\"#table-modal-addOneNodeForUser\" onclick=\"showtheaddnodemodal(this)\">"+
                    "</i>&nbsp&nbsp&nbsp<i href=\"#table-modal-deleteOneOrMoreNodeForUser\" style=\"color: #70afc4;\" data-toggle=\"modal\"class=\"fa fa-minus-square\"></i>"+
                    "</td><td class=\"center\"><a id=\""+data.data[i].userName+"\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\" onclick=\"showthedeleteusermodal(this)\">删除</a></td>" +
                    " </tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatable2").dataTable().fnDestroy();
            $('#tableforusernode').html(stringfortrlist);
            AutoCheckLang();
        }
    });
    App.init(); //Initialise plugins and elements
}
function submitTheAddNodeReq(){//提交创建一个节点的请求
    var dataforUserAndNode= JSON.stringify({
        username:$("#idForUsernameWhenAddOneNode").val(),
        nodetype:$("#type_id").text()
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/user/addNode",//接口名字
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data:dataforUserAndNode,
        success: function (data) {
            //alert(data.data);
            var newnodeAmount=data.data;
            if(newnodeAmount=="null"||newnodeAmount==""||newnodeAmount==null)
                alert("不知道为什么服务器炸掉了，不过你不要着急，给王文博打电话！");
            else
                $('#wangyunodeAmount').text(data.data);//给节点数加1
        }
    });
}
jQuery(document).ready(function() {	//首先渲染
    $('#table-modal-addOneNodeForUser').on('shown.bs.modal', function () {//获取modal显示时的动作
        //alert("shown");
    });
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/user/getAllUserInfo",//接口名字
        dataType: "json",
        success: function (data) {
            var stringfortrlist = "";
            for (var i = 0; i < data.data.length; i++) {
                var idforlog = i + 1;
                var idforNodeAmount = data.data[i].userName + "nodeAmount";//设置表示节点个数的id号
                var stringfortr = "<tr class=\"gradeX\">" +
                    "<td class=\"center\">" + idforlog + "</td><td class=\"center\">" + data.data[i].id + "</td>" +
                    "<td class=\"center\">" + data.data[i].userName + "</td>" +
                    "<td class=\"center\"><a id=\"" + idforNodeAmount + "\" href=\"task_mgt_admin.html?username=" + data.data[i].userName + " \"class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\">" + data.data[i].nodeAmount + "</a></td>" +
                    "<td class=\"center\"><i class=\"fa fa-plus-square\" id=\"" + data.data[i].userName + "\" style=\"color: #70afc4;\" href=\"#table-modal-addOneNodeForUser\" onclick=\"showtheaddnodemodal(this)\">" +
                    "</i>&nbsp&nbsp&nbsp<i href=\"#table-modal-deleteOneOrMoreNodeForUser\" id=\"" + data.data[i].userName + "\" style=\"color: #70afc4;\" data-toggle=\"modal\"class=\"fa fa-minus-square\" onclick=\"showtheDeletenodemodal(this)\"></i>" +
                    "</td><td class=\"center\"><a id=\"" + data.data[i].userName + "\" data-toggle=\"modal\" class=\"btn btn-info\" style=\"font-size:4px;padding:0px 8px;\" onclick=\"showthedeleteusermodal(this)\">删除</a></td>" +
                    " </tr>";
                stringfortrlist = stringfortrlist + stringfortr;
            }
            $("#datatable2").dataTable().fnDestroy();
            $('#tableforusernode').html(stringfortrlist);
            AutoCheckLang();
        }
    });

    App.setPage("index");  //Set current page，这俩破玩意竟然和换肤有关
    App.init(); //Initialise plugins and elements

    $("#langli").click(function () {//点击选择更换语言
        if (localStorage.lang) { //缓存 1代表中文，2代表英文
            if (localStorage.lang == 1) {
                localStorage.lang = 2;
                localStorage.langclose = 2;
                change_en();
            }
            else if (localStorage.lang == 2) {
                localStorage.lang = 1;
                localStorage.langclose = 1;
                change_ch();
            }
        }
        else {
            localStorage.lang = 2;
            localStorage.langclose = 2;
            change_en();

        }
    });
    $('#datatableForDeleteNode tbody').on('click', 'tr input[name="checkList"]', function () {//删除选中行
        var $tr = $(this).parents('tr');
        $tr.toggleClass('selected');
        var $tmp = $('[name=checkList]:checkbox');
        $('#checkAll').prop('checked', $tmp.length == $tmp.filter(':checked').length);

    });
    $("#delNodeBut_id").on("click", function () {//点击删除按钮时，删除选中的行
        // table.row('.selected').remove().draw(false);
        var nodeIds="";
        var indexfordelete=new Array();

        $("input[name='checkList']:checked").each(function () { // 遍历选中的checkbox
            n = $(this).parents("tr").index();  // 获取checkbox所在行的顺序
            var nodeId=$(this).parents("tr").find("td:eq(2)")[0].innerText;//获取将要删除的行中的节点ID
            nodeIds=nodeIds+nodeId+",";
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
                console.log(data.data);
                $('#wangyunodeAmount').text(data.data);//给节点数减1
            }
        });
    });
});