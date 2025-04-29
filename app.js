const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = 8080;
const mongo_url = 'mongodb://127.0.0.1:27017/wanderlust';
const Listing = require("../majorproject/models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejMate = require("ejs-mate");


main().then(()=>{
    console.log("connected to DB");
}).catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongo_url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejMate);
app.use(express.static(path.join(__dirname, "/public")))

// Home just redirects
app.get("/", (req, res) => {
    res.redirect("/listings");
});

// Listings route that handles the view
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("index.ejs", { allListings });
});



//New Route
app.get("/listings/new", (req, res) =>{
    res.render("listings/new.ejs")
})

//Show Route
app.get("/listings/:id", async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing})
});

// Create Route

app.post("/listings", async (req, res) => {
    let { title, description, image, price, country, location } = req.body.listing;

    // Set default image if none provided
    const imageUrl = image?.url || "https://www.omaxe.com/projects/banner_1671019477308.png";

    const newListing = new Listing({
        title,
        description,
        price,
        country,
        location,
        image: {
            url: imageUrl,
            filename: image?.filename || "default"
        }
    });

    await newListing.save();
    res.redirect("/listings");
});


//Edit Route
app.get("/listings/:id/edit", async(req, res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

//Update Route
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);  // You can remove this after testing
    res.redirect("/listings");  // Redirect to listings page after deletion
});








app.listen(8080, () =>{
    console.log("server is listrning to port 8080");
})