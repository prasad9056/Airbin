const mongoose = require('mongoose');
const schema= mongoose.Schema;
const Review=require('./review.js');
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
    reviews:[
        {
        type: schema.Types.ObjectId,
        ref:"Review",
      },
    ],
});
listingschema.post("findOneAndDelete", async  (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});
const listing= mongoose.model('listing',listingschema);
module.exports=listing;