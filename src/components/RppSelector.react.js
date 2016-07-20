var React = require('react');

var RppSelector = React.createClass({
  render: function() {
    //console.log('RppSelector: render()', this.props);
    if(!this.props.count) {
      return false;
    }

    var items = [10, 25, 50, 100].map(function(v, i){

      var selected = this.props.rpp == v;
      return (

        <li key={i} className={selected? 'active': ''}><a href="javascript://" onClick={this.props.onItemClick} data-val={v}>{v}</a></li>
      );
    }.bind(this));

    return (
      <ul className="rpp pagination">
        {items}
      </ul>
    )
  }
});

module.exports = RppSelector;
