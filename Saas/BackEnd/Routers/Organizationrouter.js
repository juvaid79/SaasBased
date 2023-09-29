const express = require("express");
const router = express.Router();

const Organizationrouter = require('../Controllers/OrganizationController')
router.post("/singuporganization", Organizationrouter.SingupOrganization)
router.post("/loginorganization", Organizationrouter.LoginOrganization);
router.get("/getorganization/:id", Organizationrouter.GetOrganization)
router.get("/getallorganization", Organizationrouter.GetAllOrganization)
router.delete("/deleteorganization/:id", Organizationrouter.Deleteorganization)
router.patch("/updateorganization/:id", Organizationrouter.UpdateOrganization)

module.exports = router;


