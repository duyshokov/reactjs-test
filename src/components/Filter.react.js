var React = require('react');

var Filter = React.createClass({
  render: function() {
    //console.log('Filter: render()', this.props);
    var items = this.props.filters.map(function (item, i) {
      var selectedValue = item.value == 0? '': item.value;

      var options = this.props.filterData[item.field].options.map((val, j) => {
        return (<option key={j} value={val}>{val}</option>);
      }, this);

      return (
        <div key={i} className="form-group">
          <label htmlFor={'filter-' + item.field}>{this.props.filterData[item.field].label}</label>
          <select className="form-control" id={'filter-' + item.field} value={selectedValue} onChange={this.props.onItemChange} data-field={item.field}>
            <option value="">Select All</option>
            {options}
          </select>
        </div>
      );
    }, this);

    return (
      <form>
        {items}
      </form>
    );
  }
});

module.exports = Filter;
