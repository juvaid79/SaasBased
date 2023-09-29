const express = require('express')
const router = express.Router();
const Subscription = require("../Controllers/SubscriptionController");

router.post("/addsubscription", Subscription.AddSubScription)
router.get("/getsubscription", Subscription.GetSubscription)
router.delete("/deletesubscription/:id", Subscription.DeleteSubscription)
router.patch("/updatesubscription/:_id", Subscription.UpdateSubscription)



module.exports = router;