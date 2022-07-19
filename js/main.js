function photoUpdate(event) {
  var $newImg = document.getElementById('imgUrl').value;
  $entryImg.src = $newImg;
}
var $entryImg = document.querySelector('.entry-img');
document.getElementById('imgUrl').addEventListener('input', photoUpdate);

function submitEntry(event) {
  event.preventDefault();
  var $title = $entryForm.elements.title.value;
  var $imgUrl = $entryForm.elements.imgUrl.value;
  var $note = $entryForm.elements.note.value;
  var newEntry = {
    title: $title,
    imgUrl: $imgUrl,
    note: $note
  };
  newEntry.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.push(newEntry);
  $entryImg.src = '/images/placeholder-image-square.jpg';
  document.getElementById('entry-form').reset();
}
var $entryForm = document.getElementById('entry-form');
$entryForm.addEventListener('submit', submitEntry);
