const express  = require("express");
const router = express.Router();

const { getContacts, 
    createContact, 
    getContact, 
    updateContact, 
    deleteContact 
} = require("../controllers/contactControllers");

const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken); // Prevents unauthorized access without repeating router.get("/...", validateToken, handler) for every route.


//router.route('/').get(getContacts);
//router.route('/').post(createContact);

router.route('/').get(getContacts).post(createContact);  //lines being saved

//router.route('/:id').get(getContact);
//router.route('/:id').put(updateContact);
//router.route('/:id').delete(deleteContact);

router.route('/:id').get(getContact).put(updateContact).delete(deleteContact);

module.exports = router; //Exports the router so it can be imported in server.js