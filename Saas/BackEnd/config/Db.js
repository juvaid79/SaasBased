const mongoose = require("mongoose")
// const mongouri ="mongodb+srv://juvaidahmad682:juvaidahmad682@cluster0.rcpj4cd.mongodb.net/Saas?retryWrites=true&w=majority"
const mongouri = "mongodb://localhost:27017/saas"
mongoose.connect(mongouri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(res => {
    console.log('DataBase Connected')
}).catch((err) => console.log(err))
