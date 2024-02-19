const Transaction = require("../models/transactionSchema")
const axios = require('axios');
const moment = require('moment'); 

module.exports.getAllTransaction = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const transactions = response.data;

        await Transaction.insertMany(transactions);

        res.status(200).json({
            message: 'Database initialized with seed data successfully.',
            transactions
        });
    } catch (error) {
        console.error('Error initializing database:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getTransaction = async (req, res) => {
    try {
        const { search, page = 1, perPage = 10, month = 3 } = req.query;

        let query = { $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] } };
        if (search) {
            const price = parseFloat(search);
            if (!isNaN(price)) {
                query = {
                    $and: [
                        query,
                        {
                            $or: [
                                { title: { $regex: search, $options: 'i' } },
                                { description: { $regex: search, $options: 'i' } },
                                { price: price }
                            ]
                        }
                    ]
                };
            } else {
                query = {
                    $and: [
                        query,
                        {
                            $or: [
                                { title: { $regex: search, $options: 'i' } },
                                { description: { $regex: search, $options: 'i' } }
                            ]
                        }
                    ]
                };
            }
        }

        const totalCount = await Transaction.countDocuments(query);

        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(perPage);

        res.status(200).json({ transactions, totalCount });
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};





module.exports.getStatistics = async (req, res) => {
    try {
        const { month } = req.query;

        const statistics = await Transaction.aggregate([
            {
                $addFields: {
                    monthOfSale: { $month: { date: "$dateOfSale", timezone: "+05:30" } }
                }
            },
            {
                $match: {
                    monthOfSale: parseInt(month)
                }
            },
            {
                $group: {
                    _id: null,
                    totalSaleAmount: { $sum: { $cond: [{ $eq: ["$sold", true] }, "$price", 0] } },
                    totalSoldItems: { $sum: { $cond: [{ $eq: ["$sold", true] }, 1, 0] } },
                    totalNotSoldItems: { $sum: { $cond: [{ $eq: ["$sold", false] }, 1, 0] } }
                }
            }
        ]);

        // Extract statistics from the result
        const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = statistics.length > 0 ? statistics[0] : { totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 };

        res.status(200).json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
    } catch (error) {
        console.error('Error fetching statistics:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports.getBarChart = async (req, res) => {
    try {
        const { month } = req.query;

        // Define price ranges
        const priceRanges = [
            { min: 0, max: 100 },
            { min: 101, max: 200 },
            { min: 201, max: 300 },
            { min: 301, max: 400 },
            { min: 401, max: 500 },
            { min: 501, max: 600 },
            { min: 601, max: 700 },
            { min: 701, max: 800 },
            { min: 801, max: 900 },
            { min: 901, max: Infinity }
        ];

        const barChartData = await Promise.all(priceRanges.map(async range => {
            const count = await Transaction.countDocuments({
                $expr: {
                    $and: [
                        { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] },
                        { $gte: ["$price", range.min] },
                        { $lt: ["$price", range.max] }
                    ]
                }
            });
            return {
                priceRange: `${range.min} - ${range.max}`,
                count
            };
        }));

        res.status(200).json(barChartData);
    } catch (error) {
        console.error('Error generating bar chart:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports.pieChart = async (req, res) => {
    try {
        const { month } = req.query;

        // Use the aggregation framework to group transactions by category
        const pieChartData = await Transaction.aggregate([
            {
                $match: {
                    $expr: { $eq: [{ $month: "$dateOfSale" }, parseInt(month)] }
                }
            },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.status(200).json(pieChartData);
    } catch (error) {
        console.error('Error generating pie chart:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};
