const express = require("express");
const router = express.Router();
const cuponController = require("../controller/cuponController.js");
const WithAuth = require('../middleware/auth.js');

router.get("/cupons", cuponController.getAllCupons);
router.get("/cupon/:id", cuponController.getCuponById);
router.post("/cupon", cuponController.createCupon);
router.delete("/cupon/:id", cuponController.deleteCupon);
router.put("/cupon/:id", cuponController.editCupon);

module.exports = router;