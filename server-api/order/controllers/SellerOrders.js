const { Order, OrderItem, Product, User } = require('../../common/models/associations');
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;


module.exports = {
    getOrdersForSeller: async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);

        const { userId } = decoded; // User ID from JWT
        const userID = userId;
        const sellerId = userID;

        const orders = await Order.findAll({
        include: [{
            model: OrderItem,
            include: [{
            model: Product,
            include: [{
                model: User,
                through: { attributes: [] },  // omit join table details
                where: { id: sellerId },
                required: true  // ensures only products uploaded by the seller are included
            }]
            }]
        }]
        });
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching seller orders:", error);
        next(error);
    }
    }
};












module.exports = {
    getOrders: async (req, res) => {
        const authHeader = req.headers.authorization;
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);

        const { userId } = decoded; // User ID from JWT
        const userID = userId;
        console.log("User ID:", userID)
        
        try {
            const orders = await Order.findAll({
                userID,
                include: [
                    {
                        model: OrderItem,
                        include: [{
                            model: Product,
                            attributes: ['id', 'name', 'image', 'price']
                        }],
                        attributes: ['quantity']
                    },
                ]}
            );
            console.log(orders)
            return res.status(200).json({
                status: true,
                data: orders.map((order) => order.toJSON())
            });
        } catch (error) {
            return res.status(400).json({
                status: false,
                error: error.message
            });
        }
    }
};