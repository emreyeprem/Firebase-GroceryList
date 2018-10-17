let ordersList = document.getElementById("ordersList")
let btnOrder = document.getElementById("btnOrder")
let nameTextBox = document.getElementById("nameTextBox")
let coffeeSelect = document.getElementById("coffeeSelect")

// creating an instance/object of firebase realtime database
const database = firebase.database()
// create a node under the root node and call is orders
const ordersRef = database.ref("orders")

let orders = [] // an empty array to hold all the orders

function displayOrders(orders) {

  let liItems = orders.map(function(order) {
    return `<li>${order.name} - ${order.coffeeType}</li>`
  })

  ordersList.innerHTML = liItems.join('')

}

// setup the obeserving of the nodes
function configureObservers() {

  // child_added, child_removed, child_updated
  ordersRef.on('value',function(snapshot){
      console.log("Value has been changed...")

      // remove all orders so we can populate it again
      // and do not have duplicates
      orders = []

      snapshot.forEach(function(childSnapshot){
        console.log(childSnapshot)

        console.log(childSnapshot.key) // key which in this case is auto id
        console.log(childSnapshot.val()) // data for that key

        // add an order to the orders array
        orders.push(childSnapshot.val())

      })

      // display all the orders on the screen
      displayOrders(orders)

  })

}

// call the configure configureObservers
configureObservers()


btnOrder.addEventListener('click',function(){

    let name = nameTextBox.value
    let coffeeType = coffeeSelect.value

    // create an order object
    let order = { name : name, coffeeType :coffeeType }

    // place order
    placeOrder(order)

})


function placeOrder(order) {

  // create or get an orders node at the root level
  //let ordersRef = database.ref("orders") <-- This line is moved to the top
  // create a node with auto id under orders node
  let orderRef = ordersRef.push()
  // set the properties for the orderRef
  orderRef.set(order)

  // get a child with auto ID using the push function
  //let orderRef = database.ref("orders").push()



  //orderRef.set(order)

  // create a new node with the user name and then set the order object as the properties
  //database.ref(order.name).set(order)
}

/*
let pets = ["Pet1", "Pet2"]
// saving a user and an array of pets
let userRef = database.ref("Steve")
userRef.set({
  name : "Steve",
  age : 45,
  pets : pets
}) */
