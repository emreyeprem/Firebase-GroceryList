let mainContainer = document.getElementById('mainContainer')
let addButton = document.getElementById('addButton')
let categoryName = document.getElementById('categoryName')
let templateComeIn = document.getElementById('templateComeIn')
let itemTitle = document.getElementById('itemTitle')

const database = firebase.database()
const categoriesRef = database.ref("categories")

let categoryItems = []
function displayItems(items) {
  let liItems = items.map(function(item) {
    return `<li id="products">${item.Category} - ${item.Item}</li>`
  })
     templateComeIn.innerHTML = liItems.join('')
}

function configureObservers() {
  categoriesRef.on('value', function(snapshot){
    console.log("Value has been changed..")
    items = []
    snapshot.forEach(function(childSnapshot){

      items.push(childSnapshot.val())
      console.log(items)

        displayItems(items)
})
  })
}
configureObservers()

addButton.addEventListener('click',function(){
  let category = categoryName.value
  let title = itemTitle.value
  let item = {Category : category, Item : title}
  placeItem(item)
})

function placeItem(item){
  let categoryRef = categoriesRef.push()
  categoryRef.set(item)
}
