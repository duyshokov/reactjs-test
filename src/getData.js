var range = require('array-range');

function getfilterOpions() {
  var genres = "Blues,Rock,Hip-Hop,Folk,Jazz".split(',');
  var artists = [];

  for(var i=0; i<10; i++) {
      artists.push('artist_'+i);
  }

  var years = range(2000, 2016);

  return [
    {
      field: 'artist',
      label: 'Artist',
      values: artists
    },
    {
      field: 'genre',
      label: 'Genre',
      values: genres
    },
    {
      field: 'year',
      label: 'Year',
      values: years
    }
  ];
}

function parseFilters(pFilters) {
  var filters = [];
  var filter_artist = typeof pFilters['artist'] != 'undefined' &&
    typeof pFilters['artist'] == 'string' &&
    pFilters['artist'].trim().length > 0
    ?
      pFilters['artist']:
    0;

    if (filter_artist != 0) {
      filters.push({
        field: 'artist',
        value: filter_artist
      });
    }

  var filter_genre = typeof pFilters['genre'] != 'undefined' &&
    typeof pFilters['genre'] == 'string' &&
    pFilters['genre'].trim().length > 0
    ?
      pFilters['genre']
    :
    0;

    if (filter_genre != 0) {
      filters.push({
        field: 'genre',
        value: filter_genre
      });
    }

  var filter_year = typeof pFilters['year'] != 'undefined' &&
    typeof pFilters['year'] == 'string' &&
    parseInt(pFilters['year']) != NaN
    ?
      parseInt(pFilters['year'])
    :
    0;

    if (filter_year != 0) {
      filters.push({
        field: 'year',
        value: filter_genre
      });
    }

    return filters;
}

var getData = function  (sortField, order, first, offset, pFilters) {
  //console.log('FETCHING DATA',
  //  [sortField, order, first, offset, pFilters]);

  sortField = sortField || null;
  order = order || '';

  var fields = [
    {
      field: 'artist',
      label: 'Artist',
    },
    {
      field: 'song',
      label: 'Song',
    },
    {
      field: 'genre',
      label: 'Genre',
    },
    {
      field: 'year',
      label: 'Year',
    }
  ];



  pFilters = pFilters || null;

  //var filters = pFilters? parseFilters(pFilters): [];
  var filters = pFilters? pFilters: [];

  var tData = require('./data').slice(0, 100);

  if(filters.length > 0) {
    tData = tData.filter(item => {
        return filters.filter(_filter => item[_filter.field] == _filter.value).length == filters.length;
    });
  }

  if(sortField && order) {
    tData.sort((a, b) => {
      if(order == 'asc') {
            if(a[sortField] < b[sortField]) {
                return -1;
            } else if (a[sortField] > b[sortField]) {
                return 1;
            }

            return 0;
      } else {
        if(a[sortField] > b[sortField]) {
          return -1;
        } else if (a[sortField] < b[sortField]) {
          return 1;
        }

        return 0;
      }
    });
  }

  var rsp = {
    fields: fields,
    data: tData.slice(first, first + offset),
    total: tData.length,
    filterOptions: getfilterOpions()
  };

  return rsp;
}

module.exports = getData;