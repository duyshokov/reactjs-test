var React = require('react');

var TableHeader = React.createClass({
  render: function() {
    //console.log('TableHeader: render', this.props);

    var items = this.props.fields.map(function(item, i) {
      var sortClass = "fa fa-fw fa-sort";
      var order = '';
      if(this.props.sortField == item.field && this.props.sortOrder) {
        sortClass += '-' + this.props.sortOrder;
        order = this.props.sortOrder;
      }

      return (<th key={i} data-field={item.field} data-sort-order={order} onClick={this.props.onColClick}> <b>{item.label}</b> <i className={sortClass}></i></th>);
    }.bind(this));

    return (
      <thead>
        <tr>
          {items}
        </tr>
      </thead>
    );
  }
});

module.exports = TableHeader;