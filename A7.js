const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'
const users = []
const dataPanel = document.querySelector('#data-panel')

axios
  .get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    renderUserList(users)
  })

dataPanel.addEventListener('click', function onPanelClicked(event) {
  if (event.target.matches('.img-user-avatar')) {
    showUserModal(event.target.dataset.id)
  }
})

// Functions
function renderUserList(items) {
  let rawHTML = ''

  items.forEach(item => {
    rawHTML += `
      <div class="user-info col-2">
      <img src="${item.avatar}" alt="User-avatar" class="img-thumbnail img-user-avatar" data-toggle="modal" data-target="#user-modal" data-id="${item.id}">
      <h6 class="user-name">${item.name} ${item.surname}</h6>
    </div>`
  });

  dataPanel.innerHTML = rawHTML
}

function showUserModal(id) {
  const modalTitle = document.querySelector('#user-modal-title')
  const modalImage = document.querySelector('#user-modal-img')
  const modalBirthday = document.querySelector('#user-modal-birthday')
  const modalRegion = document.querySelector('#user-modal-region')
  const modalAge = document.querySelector('#user-modal-age')
  const modalEmail = document.querySelector('#user-modal-email')

  axios
    .get(INDEX_URL + id)
    .then((response) => {
      const data = response.data

      modalTitle.innerText = `${data.name} ${data.surname}`
      modalImage.innerHTML = `<img src=${data.avatar} alt="user-avatar" class="img-fluid">`
      modalBirthday.innerText = data.birthday
      modalRegion.innerText = data.region
      modalAge.innerText = data.age
      modalEmail.innerText = data.email
    })
}