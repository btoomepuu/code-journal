/* exported data */
function navigate(event) {
  var $pageView = event.target.getAttribute('data-view');
  if ($pageView !== null) {
    $views.forEach(view => {
      if (view.getAttribute('data-view') === $pageView) {
        switchView($pageView);
      }
    }
    );
  }
}

var $views = document.querySelectorAll('.view');
var $container = document.querySelectorAll('.container');
$container.forEach($container => $container.addEventListener('click', navigate));

function photoUpdate(event) {
  var $newImg = document.getElementById('imgUrl').value;
  $entryImg.src = $newImg;
}
var $entryImg = document.querySelector('.entry-img');
document.getElementById('imgUrl').addEventListener('input', photoUpdate);

function submitEntry(event) {
  event.preventDefault();
  var $imgUrl = $entryForm.elements.imgUrl.value;
  var $title = $entryForm.elements.title.value;
  var $note = $entryForm.elements.note.value;
  var newEntry = {
    imgUrl: $imgUrl,
    title: $title,
    note: $note
  };
  newEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(newEntry);
  $entryImg.src = '/images/placeholder-image-square.jpg';
  renderEntry(newEntry);
  switchView('entries');
  document.getElementById('entry-form').reset();
}
var $entryForm = document.getElementById('entry-form');
$entryForm.addEventListener('submit', submitEntry);
var $entries = document.getElementById('entries');
var $entryFormHead = document.getElementById('entry-form-head');
var $editEntry = document.getElementById('entry-edit');
// Entries

function renderEntry(object) {
  var listItem = document.createElement('li');
  listItem.setAttribute('class', 'entry-items');
  listItem.setAttribute('id', `${object.entryId}`);
  list.appendChild(listItem);
  var image = document.createElement('img');
  image.setAttribute('src', `${object.imgUrl}`);
  image.setAttribute('class', 'column-half');
  listItem.appendChild(image);
  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-half text-div');
  var title = document.createElement('p');
  title.textContent = `${object.title}`;
  title.setAttribute('class', 'title');
  textDiv.appendChild(title);
  var edit = document.createElement('i');
  edit.setAttribute('class', 'fas fa-pen');
  edit.setAttribute('data-view', 'entry-edit');
  textDiv.appendChild(edit);
  var note = document.createElement('p');
  note.textContent = `${object.note}`;
  // note.setAttribute('class', 'column-full');
  textDiv.appendChild(note);
  listItem.appendChild(textDiv);
  list.prepend(listItem);
  return listItem;
}

function switchView(view) {
  data.view = view;
  switch (view) {
    case 'entries':
      $entries.className = 'view';
      $entryFormHead.className = 'view hidden';
      $editEntry.className = 'view hidden';
      break;
    case 'entry-form':
      $entryFormHead.className = 'view';
      $entries.className = 'view hidden';
      $editEntry.className = 'view hidden';
      break;
    case 'entry-edit':
      $editEntry.className = 'view';
      $entryFormHead.className = 'view';
      $entries.className = 'view hidden';
      break;
  }
}

var list = document.querySelector('.list');
window.addEventListener('DOMContentLoaded', event => {
  data.entries.forEach(entry => list.append(renderEntry(entry)));
});

window.addEventListener('DOMContentLoaded', event => {
  switchView(data.view);
});

function editEntry(event) {
  var entryId;
  var updateLocation;
  var updateEntry;
  if (event.target.className === 'fas fa-pen') {
    entryId = event.target.closest('li').id;
    updateLocation = data.nextEntryId - entryId - 1;
    updateEntry = data.entries[updateLocation];
  }
  $entryImg.src = updateEntry.imgUrl;
  $entryImgUrl.value = updateEntry.imgUrl;
  $entryTitle.value = updateEntry.title;
  $entryNote.value = updateEntry.note;
}

list.addEventListener('click', editEntry);

var $entryTitle = document.getElementById('title');
var $entryNote = document.getElementById('note');
var $entryImgUrl = document.getElementById('imgUrl');
