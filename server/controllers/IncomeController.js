const {
    Income
} = require('../models');
async function getIncome(req, res) {
    const userid = req.params.id;
    console.log("this is user id" + userid);

    try {
        const incomeList = await Income.findAll({
            where: {
                user_id: userid
            }
        });
        return res.json(incomeList);

    } catch (error) {
        res.json({
            msg: "Error retreiving data",
            type: "danger"
        })
    }


}

async function addIncome(req, res) {
    const userid = req.params.id;
    try {

        const incomeadd = await Income.create({
            income_title: req.body.ititle,
            income_note: req.body.inote,
            income_date: req.body.idate,
            user_id: userid,
            income_amount: req.body.iamount,
            income_category: req.body.icategory

        });

        return res.json({
            msg: "Income Added successfully",
            type: "success"
        })
    } catch (err) {
        console.log(err);
    }
}

async function deleteIncome(req, res) {
    const itemid = req.params.id;

    const deleteitem = await Income.findOne({
        where: {
            id: itemid
        }
    });
    if (deleteitem) {
        deleteitem.destroy();
        return res.json({
            msg: "Income deleted successfully",
            type: "success"
        })
    } else {
        return res.json({
            msg: "Item not found",
            type: "danger"
        })
    }

}

module.exports = {
    getIncome,
    addIncome,
    deleteIncome
}