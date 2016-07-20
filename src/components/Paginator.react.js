var React = require('react');

var Paginator = React.createClass({
  getDefaultProps: function(){
    return {
      windowLength: 5
    }
  },
  render: function() {
    //console.log('Paginator: render', this.props);
    if (!this.props.count || this.props.count <= this.props.rpp) {
      return false;
    }

    var pageCount = Math.ceil(this.props.count / this.props.rpp);

    var items = [];

    var windowLength = this.props.windowLength;
    var currentPage = this.props.currentPage;
    //var windowCount = Math.ceil(pageCount / windowLength);
    var start = (Math.ceil(currentPage/windowLength) - 1)*windowLength;

    var end = start + windowLength;
    var isNextDisabled = pageCount == currentPage;
    var isPrevDisabled = currentPage == 1;
    var isLastDisabled = false;

    if(end >= pageCount) {
      end -= end - pageCount;
      isLastDisabled = true;
    }
    var isFirstDisabled = start == 0;

    //console.log("START and END", [start, end, currentPage]);

    for(var i = start; i<end; i++) {
        items.push(<li key={i} className={currentPage == (i + 1)? 'active': ''}><a href="javascript://" onClick={this.props.onItemClick} data-val={i+1}>{i+1}</a></li>);
    }

    if (pageCount == 1) {
        return null;
    }

    return (
      <nav>
        <ul className="pagination">
          <li className={isFirstDisabled? 'hidden':''}>
            <a href="javascript://" aria-label="First" data-val="1" onClick={this.props.onItemClick}>
             <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className={isPrevDisabled? 'hidden':''}>
            <a href="javascript://" aria-label="Previous" data-val={currentPage-1} onClick={this.props.onItemClick}>
              <span aria-hidden="true">&lt;</span>
            </a>
          </li>
          {items}
          <li className={isNextDisabled? 'hidden':''}>
            <a href="javascript://" aria-label="Next" data-val={currentPage+1} onClick={this.props.onItemClick}>
              <span aria-hidden="true">&gt;</span>
            </a>
          </li>
          <li className={isLastDisabled? 'hidden':''}>
            <a href="javascript://" aria-label="Last" data-val={pageCount} onClick={this.props.onItemClick}>
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    )
  }
});

module.exports = Paginator;