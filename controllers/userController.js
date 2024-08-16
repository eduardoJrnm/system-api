const User = require('../models/user');

exports.listUsers = async (req,res) => { //try catch é utilizado como verificador e tratativo de erro
    try {
        const users = await User.findAll(
            {
                attributes: ['username','loginuser','active']
            });
            if(users.length === 0 ){
                return res.status(404).json({message: 'users not found'});
            }
            res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
}
