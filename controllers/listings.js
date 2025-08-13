const Listings = require("../models/listing")

module.exports.index = async (req, res) => {
  const allListings = await Listings.find({});
  res.render("listings/index.ejs", { allListings });
}

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
}

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listings.findById(id)
  .populate({
    path:'reviews',
    populate:{
      path: 'author',
    },
  })
  .populate('owner');
  if(!listing){
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings")
  }
  console.log(listing)
  res.render("listings/show.ejs", { listing });
}

module.exports.createpost = async (req, res) => {
  let url =  req.file.path;
  let filename = req.file.filename;
  const newListing = new Listings(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url, filename};
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
}

module.exports.editroutes = async (req, res) => {
  let { id } = req.params;
  const listing = await Listings.findById(id);
  if(!listing){
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings")
  }
  res.render("listings/edit.ejs", { listing });
}

module.exports.updateroutes = async (req, res) => {
  let { id } = req.params;
  await Listings.findByIdAndUpdate(id, { ...req.body.listing });
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
}

module.exports.deletes = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listings.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Delete!");
  res.redirect("/listings");
}