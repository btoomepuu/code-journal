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
  list.appendChild(listItem);
  var image = document.createElement('img');
  image.setAttribute('src', `${object.imgUrl}`);
  image.setAttribute('class', 'column-half');
  listItem.appendChild(image);
  var textDiv = document.createElement('div');
  textDiv.setAttribute('class', 'column-half');
  var titleSpan = document.createElement('span');
  titleSpan.setAttribute('class', 'column-full title-span');
  textDiv.appendChild(titleSpan);
  var title = document.createElement('p');
  title.setAttribute('class', 'column-half');
  title.textContent = `${object.title}`;
  titleSpan.appendChild(title);
  var edit = document.createElement('i');
  edit.setAttribute('class', 'fas fa-pen');
  edit.setAttribute('data-view', 'entry-edit');
  titleSpan.appendChild(edit);
  var note = document.createElement('p');
  note.textContent = `${object.note}`;
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
      $entries.className = 'view hidden';
      $entryFormHead.className = 'view hidden';
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

}

list.addEventListener('click', editEntry);
