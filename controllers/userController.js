const User = require('../models/User');

exports.listUsers = async (req,res) => { //try catch é utilizado como verificador e tratativo de erro
    try {
        const users = await User.findAll(
            {
                attributes: ['id','username','loginuser','active']
            });
            if(users.length === 0 ){
                return res.status(404).json({message: 'users not found'});
            }
            res.json(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.activeUsers = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where: {id: id}});
        if(user){
            user.active = true;
            await user.save();
            res.status(200).json({message: `User (${user.username})activated successfuly`});
        } else{
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deactiveUsers = async (req,res) => {
    try {
        const {id} = req.params;
        const user = await User.findOne({where: {id: id}});
        if(user){
            user.active = false;
            await user.save();
            res.status(200).json({message: `User (${user.username}) deactivated successfuly`});
        } else{
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

