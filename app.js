const express=require('express');
const app=express();
const mongoose=require('mongoose');
const Listing=require('./models/listing.js');
const path=require('path');
const methodOverride=require('method-override');
const ejsMate=require('ejs-mate');
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");


const MONGO_URI="mongodb://localhost:27017";

main()
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.log(err);
});


async function main(){
    await mongoose.connect(MONGO_URI);
}

app.set("view engine","ejs");
app.set("views",path.join( __dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public"))); 





app.get('/',(req,res)=>{
    res.send("Hello World");
});
//index Route
app.get('/listings', wrapAsync(async(req,res)=>{
    const allListings= await Listing.find({});
    res.render("listings/index",{Listings: allListings });
}));

//New Route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id",wrapAsync(async (req, res) => {
    let {id}=req.params;
    const listing= await Listing.findById(id);

    res.render("listings/show.ejs", {listing });
}));

//create route
app.post("/listings",wrapAsync(async (req, res,next) => {
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data For listing");
    }
     const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");

}));


//edit route
app.get("/listings/:id/edit",wrapAsync(async (req, res) => {
    let {id}=req.params;
    const listing= await Listing.findById(id);
    res.render("listings/edit.ejs", {listing });

}));
//update route
app.put("/listings/:id",wrapAsync(async (req, res) => {
     if(!req.body.listing){
        throw new ExpressError(400,"Send valid data For listing");
    }
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));

//Delete route
app.delete("/listings/:id",wrapAsync(async (req, res) => {
    let {id}=req.params;
   let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

// app.get("/testlisting",(req,res)=>{
//     let sampleListing=new listing({
//         title:"my new villa",
//         description:"by the beach",
//         price:1000,
//         location:"calangute goa",
//         country:"india",
//     });
//     // await samplelisting.save();
//     console.log("sample was saves");
//     res.send("successful testing");
// });

app.all("/*splat", (req,res,next)=>{
    next(new ExpressError(404,"Page not found"));
});
app.use((err,req,res,next) =>{
    let {statusCode=500,message="Something went wrong"}=err;
     res.render("error.ejs",{message});

    //res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});