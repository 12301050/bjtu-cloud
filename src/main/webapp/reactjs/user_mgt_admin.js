'use strict';
//var Comment = React.createClass({
//  displayName: "Comment",
//
//  render: function render() {
//    return React.createElement(
//      "tr",
//      { "class": "gradeX" },
//      React.createElement(
//        "td",
//        null,
//        this.props.id
//      ),
//      React.createElement(
//        "td",
//        null,
//        this.props.taskId
//      ),
//      React.createElement(
//        "td",
//        null,
//        this.props.mode
//      ),
//      React.createElement(
//        "td",
//        { "class": "hidden-xs" },
//        this.props.status
//      ),
//      React.createElement(
//        "td",
//        { "class": "center" },
//        React.createElement("i", { "class": "fa fa-plus-square" }),
//        "&nbsp&nbsp&nbsp",
//        React.createElement("i", { "class": "fa fa-minus-square" })
//      ),
//      React.createElement(
//        "td",
//        { "class": "center" },
//        React.createElement(
//          "a",
//          { href: "#table-modal-deleteUser", "data-toggle": "modal", "class": "btn btn-info", style: "font-size:4px;padding:0px 8px;", id: "del_butid" },
//          "删除"
//        )
//      )
//    );
//  }
//});
var UserGist = React.createClass({
  displayName: 'UserGist',

  getInitialState: function getInitialState() {
    return {
//      id: '',
//      taskId: '',
//      mode: '',
//      status: '',
//      operateTime: '',
//      operateName: ''
        data:[]
    };
  },

  componentDidMount: function componentDidMount() {
    $.get(this.props.source, (function (result) {
      var lastGist = result.data[0];
      console.log(result.data);
      //alert(result.data[0].operateTime);
      this.setState({
//        id: lastGist.id,
//        taskId: lastGist.taskId,
//        mode: lastGist.mode,
//        status: lastGist.status,
//        operateTime: lastGist.operateTime,
//        operateName: lastGist.operateName
          data:result.data
      });
    }).bind(this));
  },

  componentWillUnmount: function componentWillUnmount() {
    this.serverRequest.abort();
  },

  render: function render() {
     var rows = this.state.data.map(function (user) {
      return React.createElement(
        "tr",
        { "class": "gradeX" },
        React.createElement(
          "td",
          null,
          user.id
        ),
        React.createElement(
          "td",
          null,
          user.taskId
        ),
        React.createElement(
          "td",
          null,
          user.operateTime
        ),
        React.createElement(
          "td",
          { "class": "hidden-xs" },
          user.o
        ),
        React.createElement(
          "td",
          { "class": "center" },
          React.createElement("i", { "class": "fa fa-plus-square" }),
          "&nbsp&nbsp&nbsp",
          React.createElement("i", { "class": "fa fa-minus-square" })
        ),
        React.createElement(
          "td",
          { "class": "center" },
          React.createElement(
            "a",
            { href: "#table-modal-deleteUser", "data-toggle": "modal", "class": "btn btn-info",id: "del_butid" },
            "删除"
          )
        )
      );
    });
    console.log(rows);
    return React.createElement(
      "tbody",
      null,
      rows
      );
}});

ReactDOM.render(React.createElement(UserGist, { source: 'http://localhost:8080/api/log/getAllTaskRecord' }), document.getElementById('datatable2'));