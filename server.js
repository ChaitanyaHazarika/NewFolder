const express =  require('express')
const app =  express()
const bodyParser = require('body-parser')
const Razorpay = require('razorpay')
var instance = new Razorpay({ key_id: 'rzp_test_vpAdWxAumoFGIj', key_secret: '5Bi9DKvhm5I4zCyj21wcLuX4' })

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))

var amount = 5000
var order_id = ""
instance.orders.create({
    "amount": amount,
    "currency": "INR", 
    "receipt":  "receipt#1"
}, (err , order) => {
    console.log(err);
    console.log(order);
    order_id = order.id
})
app.get('/checkout' , (req,res) => {
    res.send({
        'id' : order_id,
        'amount': amount  
    })
})

app.listen(4000, () => {
    console.log("Listening on port 4000");
})
