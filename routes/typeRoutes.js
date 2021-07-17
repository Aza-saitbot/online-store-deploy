const Router = require("express");
const router = new Router();
const TypeController = require("../controllers/typeController");
const checkRole = require("./../middleware/checkRoleMiddleware");


//вызываем checkRole
router.post("/", checkRole('ADMIN'), TypeController.create);
router.get("/", TypeController.getAll);

module.exports = router;

