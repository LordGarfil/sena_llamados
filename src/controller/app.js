const logoutButton = document.querySelector('#logout')

logoutButton.onclick = function(e){
  fetch('../model/logout.php', {
    method: 'POST'
  })
  .then(res => {
    location.replace('../../index.php')
  })
}