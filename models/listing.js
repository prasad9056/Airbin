const mongoose = require('mongoose');

const schema= mongoose.Schema;
const listingschema = new schema({
    title:{
        type: String,
        required: true
    },
    description:String,
        
    image: {
    filename: {
        type: String,
        default: "listingimage"
    },
    url: {
        type: String,
        default: "https://images.unsplash.com/photo-1766833796799-a861104c7013?fm=jpg&q=60&w=3000&auto=format&fit=crop"
    }
},
    price: Number,
    location: String,
    country: String,
});

const listing= mongoose.model('listing',listingschema);
module.exports=listing;