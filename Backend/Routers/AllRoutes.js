const express = require("express");
const router = express.Router();
const axios = require("axios");
const userHistory = require("../modules/userHistory");
const User = require("../modules/user");

const unsplash = axios.create({
    baseURL: "https://api.unsplash.com/"
})
router.route("/")
    .get((req, res) => {
        res.send("hi");
    });


class Pair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}


router.route("/topSearch")
    .get(async (req, res) => {
        try {
            let find = await User.find();
            const myMap = new Map();
            for (let i of find) {
                for (let j of i.history) {
                    let find = await userHistory.findOne({_id: j})
                    // console.log("find",find)
                    myMap.set(find.team, myMap.has(find.team) ? myMap.get(find.team) + 1 : 1);
                }

            }

            const al = [];

            for (const [key, value] of myMap) {
                al.push(new Pair(key, value));
            }
            
            al.sort((a, b) => b.value - a.value);

            let count = 0;
            console.log("al:",al)

            // let allSearche = await userHistory.find();
            const al2 = [];
            for (let i of al) {
                count++;
                if (count == 6) {
                    break;
                }
                al2.push(i.key);
                
            }
            console.log("al2:", al2);
            return res.status(200).json({ message: al2 });
        } catch (error) {
            console.log("top:", error)
            return res.status(500).json({ message: error });
        }


    })

router.route("/history/")
    .post(async (req, res) => {
        let { id } = req.body;
        let history = await User.findById(id).populate("history");
        console.log("hist", history);
        if (!history) {
            return res.status(401).json({ message: "UnAuthorized" });
        }
        return res.status(200).json({ message: history.history });
    });

router.route("/search/:id")
    .post(async (req, res) => {
        try {
            let { item } = req.body;
            if (item.length <= 0) {
                return res.status(400).json({ message: "item is empty" });
            }
            console.log(res.locals.currentUser, "id", req.params);

            let { id } = req.params || res.locals.currentUser;
            let insertInUser = await User.find({ _id: id });
            console.log(insertInUser)
            if (insertInUser.length <= 0) {
                return res.status(401).json({ message: "Wrong ID" });
            }
            let hist = new userHistory({
                userId: insertInUser._id,//res.locals.currentUser
                team: item
            });
            // let inUser = await User.findByIdAndUpdate(id, {history: [...history, hist]});
            insertInUser[0].history.push(hist);
            await hist.save();
            await insertInUser[0].save();
            // console.log(inUser);

            let ApiRes = await unsplash.get("/search/photos", {
                params: {
                    query: item,
                    page: 1
                },
                headers: {
                    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
                }
            });

            console.log("Api res", ApiRes.data);
            res.status(200).json(ApiRes.data.results);
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    })

module.exports = router;