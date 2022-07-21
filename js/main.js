/* exported data */
function navigate(event) {
  var $pageView = event.target.getAttribute('data-view');
  if ($pageView !== null) {
    $views.forEach(view => {
      if (view.getAttribute('data-view') === $pageView) {
        view.className = 'view';
      } else { view.className = 'view hidden'; }
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
  hideDiv();
  document.getElementById('entry-form').reset();
}
var $entryForm = document.getElementById('entry-form');
$entryForm.addEventListener('submit', submitEntry);
var $entries = document.getElementById('entries');
var $entryFormHead = document.getElementById('entry-form-head');
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
  var title = document.createElement('p');
  title.textContent = `${object.title}`;
  textDiv.appendChild(title);
  var note = document.createElement('p');
  note.textContent = `${object.note}`;
  textDiv.appendChild(note);
  listItem.appendChild(textDiv);
  return listItem;
}

function hideDiv() {
  $entryFormHead.className = ('view hidden');
  $entries.className = ('view');
}

var list = document.querySelector('.list');
window.addEventListener('DOMContentLoaded', event => {
  data.entries.forEach(entry => list.append(renderEntry(entry)));
});
