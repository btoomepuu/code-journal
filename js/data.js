/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousEntries = localStorage.getItem('entry-local-storage');

if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}
window.addEventListener('beforeunload', event => {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('entry-local-storage', dataJSON);
});
