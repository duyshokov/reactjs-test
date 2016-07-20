var React = require('react');
var Table = require('./Table.react');
var Filter = require('./Filter.react');
var Paginator = require('./Paginator.react');
var RppSelector = require('./RppSelector.react');
var Http = new (require('browser-http/lib/Mocks/Http'));
var getData = require('../getData');

var Application = React.createClass({
  getInitialState: function() {
    return {
      fields: [],
      data: [],
      sortField: null,
      sortOrder: '',
      count: 0,
      page: 1,
      rpp: 10,
      filters: [],
      filterData: {}
    };
  },

  componentDidMount: function() {
    //console.log('App: componentDidMount()');

    var first = (this.state.page - 1)*this.state.rpp;
    var _rsp = getData(this.state.sortField, this.state.sortOrder, first, this.state.rpp, this.prepareFilterParams());
    var filters = [];
    var filterData = {};

    Http.receive(_rsp, {'content-type': 'application/json'}, 200, 400);
    var url = '/api/endpoint';
    Http.getJson(url, {}, function(response, err) {
      var rsp = response.data;
      rsp.filterOptions.forEach(function(item, i) {
        filters.push({field: item.field, value: 0});
        filterData[item.field] = {field: item.field, label: item.label, options:[]};
        item.values.forEach(function(val, j) {
          filterData[item.field].options.push(val);
        });
      });

      this.setState({
        data: rsp.data,
        count: rsp.total,
        fields: rsp.fields,
        filters: filters,
        filterData: filterData
      });
    }.bind(this));
  },

  // componentDidUpdate: function(prevProps, prevState) {
  //   console.log('App: componentDidUpdate()');
  // },

  handleFilterChange: function (e) {
    //console.log('handleFilterChange');
    var field = e.currentTarget.getAttribute('data-field'),
      value = e.currentTarget.value,
      filterIndex = null;

    this.state.filters.forEach(function(item, i){
      if (item.field != field)
        return;
      this.state.filters[i].value = value;
    }, this);

    var filters = this.state.filters.filter(item => item.value != 0);
    var _rsp = getData(null, '', 0, this.state.rpp, filters);

    Http.receive(_rsp, {'content-type': 'application/json'}, 200, 400);
    Http.getJson('/api/endpoint', {}, function(response, err){
      var rsp = response.data;

      this.setState({filters: this.state.filters, data: rsp.data, page: 1, count:rsp.total, sortField: null, sortOrder: ''});

    }.bind(this));
  },

  handleRppSelectorClick: function(e) {
    //console.log('handleRppSelectorClick');
    var val = e.currentTarget.getAttribute('data-val');
    val = parseInt(val);

    var filters = this.state.filters.filter(item => item.value != 0);

    var _rsp = getData(this.state.sortField, this.state.sortOrder, 0, val, filters);

    Http.receive(_rsp, {'content-type': 'application/json'}, 200, 400);
    Http.getJson('/api/endpoint', {}, function(response, err){
      var rsp = response.data;
      this.setState({ rpp: val, page: 1, data: rsp.data, count: rsp.total });
    }.bind(this));
  },

  prepareFilterParams: function() {
    return this.state.filters.map(function(item) {
      return {
        field: item.field,
        value: item.value
      };
    });
  },

  handleSorterClick: function(e) {
    //console.log('handleSorterClick', e.currentTarget.getAttribute('data-field'));
    var sortField = e.currentTarget.getAttribute('data-field');
    var sortOrder = e.currentTarget.getAttribute('data-sort-order');

    switch (sortOrder) {
      case 'asc':
        sortOrder = 'desc';
        break;
      case 'desc':
        sortOrder = '';
        break;
      default:
        sortOrder = 'asc';
        break;
    }

    var filters = this.state.filters.filter(item => item.value != 0);

    var _rsp = getData(sortField, sortOrder, 0, this.state.rpp, filters);
    Http.receive(_rsp, {'content-type':'application/json'}, 200, 400);
    Http.getJson('/api/endpoint', {}, function(response, err){
      var rsp = response.data;
      this.setState({
        data: rsp.data,
        sortField: sortField,
        sortOrder: sortOrder,
        page: 1
      });
    }.bind(this));
  },

  handlePagingClick: function(e) {
    //console.log('handlePagingClick');
    var page = e.currentTarget.getAttribute('data-val');
    page = parseInt(page);
    var first = (page - 1)*this.state.rpp;
    var filters = this.state.filters.filter(item => item.value != 0);
    var _rsp = getData(this.state.sortField, this.state.sortOrder, first, this.state.rpp, filters);
    Http.receive(_rsp, {'content-type':'application/json'}, 200, 400);
    Http.getJson('api/endpoint', {}, function(response, err) {
        var rsp = response.data;
        this.setState({page: page, data: rsp.data, count: rsp.total});
    }.bind(this));
  },

  render: function() {
    //console.log('App: render()', this.state);

    return (
      <div className="app row">
        <div className="col-md-2">
          <h3>Filter</h3>
          <Filter onItemChange={this.handleFilterChange} filters={this.state.filters} filterData={this.state.filterData}/>
        </div>
        <div className="col-md-10">
          <h3>Playlist</h3>
          <Table items={this.state.data} fields={this.state.fields} sortField={this.state.sortField} sortOrder={this.state.sortOrder} handleSorterClick={this.handleSorterClick}/>
          <div className="text-center">
            <div className="pull-right">
              <RppSelector count={this.state.count} rpp={this.state.rpp} onItemClick={this.handleRppSelectorClick}/>
            </div>
            <Paginator count={this.state.count} rpp={this.state.rpp} currentPage={this.state.page} onItemClick={this.handlePagingClick} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Application;