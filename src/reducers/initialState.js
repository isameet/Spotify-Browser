export default {
  ajaxCallsInProgress: 0,

  allFilters: [
    {text: 'Album', value: 'album'},
    {text: 'Artist', value: 'artist'},
    {text: 'Playlist', value: 'playlist'},
    {text: 'Track', value: 'track'}
  ],

  search: {
    results: {},
    count: 0
  }
};
