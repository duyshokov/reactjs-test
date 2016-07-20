var React = require('react');
var TableHeader = require('./TableHeader.react');

var Table = React.createClass({
  render: function() {
    //console.log('Table:render()', this.props);
    var rows = this.props.items.map(function(row, i) {
      var items = [];
      for (var j in this.props.fields) {
        var field = this.props.fields[j].field;
        if(field == 'id'){
          continue;
        }

        items.push(<td key={j}>{row[field]}</td>);
      }
      return (
        <tr key={i}>
          {items}
        </tr>
      );
    }.bind(this));

    return (
      <table className="table">
        <TableHeader fields = {this.props.fields} sortField={this.props.sortField} sortOrder={this.props.sortOrder} onColClick={this.props.handleSorterClick} />
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

module.exports = Table;
