const express = require('express');
const router = express.Router();
const { getAllTransaction, getTransaction, getStatistics, getBarChart, pieChart } = require("../controller/transactionController")

router.get('/getAllTransaction', getAllTransaction)
router.get('/transactions', getTransaction)
router.get('/statistics', getStatistics)
router.get('/bar-chart', getBarChart)
router.get('/pie-chart', pieChart)

module.exports = router;