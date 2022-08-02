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
  var $updateEntry = document.querySelector(`[id='${data.editing}']`);
  var entryToEdit = data.entries.find(id => id.entryId === data.editing);
  var index = data.entries.indexOf(entryToEdit);
  event.preventDefault();
  var $imgUrl = $entryForm.elements.imgUrl.value;
  var $title = $entryForm.elements.title.value;
  var $note = $entryForm.elements.note.value;
  var entry = {
    imgUrl: $imgUrl,
    title: $title,
    note: $note
  };
  if (data.editing === null) {
    entry.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(entry);
    renderEntry(entry);
  } else {
    entry.entryId = data.editing;
    data.entries[index] = entry;
    $updateEntry.replaceWith(renderEntry(entry));
  }
  switchView('entries');
  document.getElementById('new-edit-head').textContent = 'New Entry';
  $entryImg.src = '/images/placeholder-image-square.jpg';
  document.getElementById('entry-form').reset();
  data.editing = null;
  $deleteEntry.style.visibility = 'hidden';
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
  image.setAttribute('class', 'column-half image');
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
  note.setAttribute('class', 'note');
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
      $deleteEntry.style.visibility = 'hidden';
      $entryImg.src = '/images/placeholder-image-square.jpg';
      $entryFormHead.className = 'view hidden';
      $editEntry.className = 'view hidden';
      break;
    case 'entry-form':
      document.getElementById('entry-form').reset();
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
  if (data.editing !== null) {
    fillEdit(data.editing);
  }
});

function editEntry(event) {
  data.editing = parseInt(event.target.closest('li').id);
  document.getElementById('new-edit-head').textContent = 'Edit Entry';
  if (event.target.className === 'fas fa-pen') {
    fillEdit(data.editing);
  }
}
list.addEventListener('click', editEntry);

var $entryTitle = document.getElementById('title');
var $entryNote = document.getElementById('note');
var $ImgUrl = document.getElementById('imgUrl');
var $deleteEntry = document.querySelector('.delete-entry');
var $confirm = document.querySelector('.btn-confirm');
var $cancel = document.querySelector('.btn-cancel');
var $modal = document.querySelector('.modal-container');

function fillEdit(dataEditing) {
  var $updateEntry = document.querySelector(`[id='${data.editing}']`);
  $entryImg.src = $updateEntry.querySelector('img').src;
  $ImgUrl.value = $updateEntry.querySelector('img').src;
  $entryTitle.value = $updateEntry.querySelector('.title').textContent;
  $entryNote.value = $updateEntry.querySelector('.note').textContent;
  $deleteEntry.style.visibility = 'visible';
}
$deleteEntry.addEventListener('click', () => {
  $modal.style.visibility = 'visible';
});

$confirm.addEventListener('click', () => {
  var $itemDelete = document.querySelector(`[id='${data.editing}']`);
  list.removeChild($itemDelete);
  var entryToDelete = data.entries.find(id => id.entryId === data.editing);
  var index = data.entries.indexOf(entryToDelete);
  data.entries.splice(index, index);
  $modal.style.visibility = 'hidden';
  data.editing = null;
  switchView('entries');
});

$cancel.addEventListener('click', () => {
  $modal.style.visibility = 'hidden';
});
