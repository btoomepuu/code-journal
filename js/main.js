function photoUpdate(event) {
  const $newImg = document.getElementById('img-url').value;
  $entryImg.src = $newImg;
}
const $entryImg = document.querySelector('.entry-img');
document.getElementById('img-url').addEventListener('input', photoUpdate);
