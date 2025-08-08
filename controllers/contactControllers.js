const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel"); 

    //@desc Get all Contacts
    //@route GET /api/contacts
    //@access private

    const getContacts = asyncHandler(async (req, res) => {
        const contacts = await Contact.find({ user_id: req.user.id });
        res.status(200).json(contacts); 
        
        //res.status(200).json({message : "Get all Contacts"}); 
    });

    //@desc Create New Contacts
    //@route POST /api/contacts
    //@access private

    const createContact = asyncHandler(async (req, res) => {
        console.log("The request body is :", req.body);
        const { name, email, phone} = req.body;
        if(!name || !email || !phone){
            res.status(400);
            throw new Error("All fields are mandatory !"); //error will be in HTML format not in JSON format
        }

        //models
        const contacts = await Contact.create({
            name,
            email,
            phone,
            user_id: req.user.id
        });

        res.status(201).json(contacts);
        //res.status(201).json({message : "Create Contacts"}); //status 201 as resource created
    });

    //@desc Get Contact
    //@route GET /api/contacts/:id
    //@access private

    const getContact = asyncHandler(async (req, res) => {
        const contacts = await Contact.findById(req.params.id);
        if(!contacts){
            res.status(404);
            throw new Error("Contact not found");
        }
        res.status(200).json(contacts); 
    });

    //@desc Update Contact
    //@route PUT /api/contacts/:id
    //@access private

    const updateContact = asyncHandler(async (req, res) => {
        const contacts = await Contact.findById(req.params.id);
        if(!contacts){
            res.status(404);
            throw new Error("Contact not found");
        }

        if (contacts.user_id.toString() !== req.user.id) { //so that diff user can not update contact og current user
            res.status(403);
            throw new Error("User don't have permission to update other user contacts");
        }

        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );
        res.status(200).json(updatedContact);
        
        //res.status(200).json({message : `Update Contact for ${req.params.id}`}); 
    });

    //@desc delete Contact
    //@route DELETE /api/contacts/:id
    //@access private

    const deleteContact = asyncHandler(async (req, res) => {
        const contacts = await Contact.findById(req.params.id);
        if(!contacts){
            res.status(404);
            throw new Error("Contact not found");
        }

        if (contacts.user_id.toString() !== req.user.id) { //so that diff user can not update contact og current user
            res.status(403);
            throw new Error("User d0n't have permission to update other user contacts");
        }

        //await Contact.findByIdAndDelete(req.params.id);
        await Contact.deleteOne({_id: req.params.id});
        res.status(200).json(contacts); 
    });

    module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };


    // "async" is written because whenever we interact with MongoDB / Mongoose we always get a Promise
    //in order to resolve that Promise we write async before (req, res).

    // also in order to catch an error we use try-catch block but we have to add try-catch in every function. 
    // In order to do that we install or use middleware known as "Express Aync Handler" which will aSDFhandle the exceptions.