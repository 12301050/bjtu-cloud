'use strict';

var UserGist = React.createClass({
  displayName: 'UserGist',

  getInitialState: function getInitialState() {
    return {
      username: '',
      lastGistUrl: ''
    };
  },

  componentDidMount: function componentDidMount() {
    $.get(this.props.source, function (result) {
      //log(result);
      alert(result.data[0].operateTime);
      var lastGist = result[0];
      if (this.isMounted()) {
        this.setState({
          username: lastGist.owner.login,
          lastGistUrl: lastGist.html_url
        });
      }
    }.bind(this));
  },

  render: function render() {
    return React.createElement(
        'div',
        null,
        this.state.username,
        '\'s last gist is',
        React.createElement(
            'a',
            { href: this.state.lastGistUrl },
            'here'
        ),
        '.'
    );
  }
});

ReactDOM.render(React.createElement(UserGist, { source: 'http://localhost:8080/api/log/getAllTaskRecord' }), document.body);