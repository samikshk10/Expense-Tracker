const {
    Expense,
    User
} = require('../models');

async function getExpense(req, res) {
    const userid = req.params.id;
    try {
        const user = await User.findOne({
            where: {
                id: userid
            }
        });
        console.log(user);
        console.log("this is user id" + userid);

        const expenseList = await Expense.findAll({
            where: {
                user_id: userid
            }
        });
        console.log(user.budget);
        return res.json({
            data: expenseList,
            budget: user.budget
        });
    } catch (error) {
        res.json({
            msg: "Error retreiving data",
            type: "danger"
        })
    }

}

async function deleteExpense(req, res) {
    const itemid = req.params.id;



    try {
        const deleteitem = await Expense.findOne({
            where: {
                id: itemid
            }
        });
        if (deleteitem) {
            deleteitem.destroy();
            return res.json({
                msg: "Expense deleted successfully",
                type: "success"
            })
        } else {
            return res.json({
                msg: "Item not found",
                type: "danger"
            })
        }
    } catch (error) {
        console.log(error);
    }



}

async function setBudget(req, res) {
    const userid = req.params.id;


    try {

        const updateBudget = await User.update({
            budget: req.body.budget

        }, {
            where: {
                id: userid
            }
        });

        const user = await User.findOne({
            where: {
                id: userid
            }
        });

        return res.json({
            msg: "Budget Updated successfully",
            type: "success",
            budget: user.budget
        })
    } catch (err) {
        console.log(err);
    }
}
async function addExpense(req, res) {
    const userid = req.params.id;
    console.log(userid);
    console.log("this is category" + req.body.ecategory);
    try {

        const expenseadd = await Expense.create({
            title: req.body.etitle,
            note: req.body.enote,
            expensesDate: req.body.edate,
            user_id: userid,
            amount: req.body.eamount,
            category_name: req.body.ecategory

        });

        return res.json({
            msg: "Expense Added successfully",
            type: "success"
        })
    } catch (err) {
        console.log(err);
    }

}

module.exports = {
    getExpense,
    deleteExpense,
    setBudget,
    addExpense
};