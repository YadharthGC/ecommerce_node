const express = require("express")
const app = express()
const cors = require("cors")
const port = process.env.PORT || 3003
const mongodb = require("mongodb")
const mongoclient = mongodb.MongoClient;
//const url = 'mongodb://localhost:27017';
const url = "mongodb+srv://ganesh:chitra@cluster0.2pjhw.mongodb.net/booking?retryWrites=true&w=majority"
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")


app.use(cors({
    origin: "*"
}))
app.use(express.json())
    /////////////////////////////////////////////
    // var name = [];
const mob = [{
        brand: "Samsung",
        model: "Galaxy M32",
        value: 4,
        amount: 23000,
        not: 25000,
        save: 2000,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "128GB",
        cellular: "5G",
        size: "6.1 inches",
        wp: "Unlocked for for all Carriers",
        src: "./images/m32.jpg",
        ram: "8GB",
        code: "a1",
        qty: 0
    },
    {
        brand: "Samsung",
        model: "Galaxy M52",
        value: 4.3,
        amount: 29000,
        not: 34999,
        save: 5000,
        da: "Save Rs 4000/- with coupon",
        db: "Free Delivery by BagIT",
        rom: "128GB",
        cellular: "5G",
        size: "6.7 inches",
        wp: "Unlocked for for all Carriers",
        src: "./images/m52.jpg",
        ram: "6GB",
        code: "a2",
        qty: 0
    },
    {
        brand: "Samsung",
        model: "Galaxy M21",
        value: 4,
        amount: 13000,
        not: 15000,
        save: 200,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "64GB",
        cellular: "4G",
        size: "6.4 inches",
        wp: "Unlocked for for all Carriers",
        src: "./images/m21.jpg",
        ram: "4GB",
        code: "a3",
        qty: 0
    },
    {
        brand: "Oppo",
        model: "A55",
        value: 4.4,
        amount: 15490,
        not: 18990,
        save: 3500,
        da: "Upto Rs.1250 off On SBI bank cards",
        db: "Free Delivery by BagIT",
        rom: "64GB",
        ram: "4GB",
        cellular: "4G",
        size: "6.51 inches",
        wp: "Unlocked for for all Carriers",
        src: "./images/a55.jpg",
        code: "a4",
        qty: 0
    },
    {
        brand: "Oppo",
        model: "A74",
        value: 4.1,
        amount: 17990,
        not: 20990,
        save: 3000,
        da: "Upto Rs.1250 off On SBI bank cards",
        db: "Free Delivery by BagIT",
        rom: "128GB",
        ram: "6GB",
        cellular: "5G",
        size: "6.49 inches",
        wp: "Unlocked for for all Carriers",
        src: "./images/a74.jpg",
        code: "a5",
        qty: 0
    },
    {
        brand: "Oppo",
        model: "A31",
        value: 4,
        amount: 12990,
        not: 15990,
        save: 3000,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "128GB",
        ram: "6GB",
        cellular: "4G",
        size: "6.5 inches",
        wp: "WhatsApp SIM",
        src: "./images/a31.jpg",
        code: "a6",
        qty: 0
    },
    {
        brand: "Realme",
        model: "narzo 30",
        value: 4,
        amount: 15499,
        not: 16999,
        save: 1500,
        da: "Save Rs 1500/- with coupon",
        db: "Free Delivery by BagIT",
        rom: "128GB",
        ram: "6GB",
        cellular: "4G",
        size: "6.5 inches",
        wp: "Unlocked for All Carriers",
        src: "./images/n30.jpg",
        code: "a7",
        qty: 0
    },
    {
        brand: "Realme",
        model: "narzo 50i",
        value: 4,
        amount: 8999,
        not: 9999,
        save: 1000,
        da: "Save extra with Cashback",
        db: "Free Delivery by BagIT",
        rom: "64GB",
        ram: "4GB",
        cellular: "4G",
        size: "6.5 inches",
        wp: "Unlocked for All Carriers",
        src: "./images/50i.jpg",
        code: "a8",
        qty: 0
    },
    {
        brand: "Realme",
        model: "8i",
        value: 4,
        amount: 13939,
        not: 15999,
        save: 2060,
        da: "Save extra with Cashback",
        db: "Free Delivery by BagIT",
        rom: "64GB",
        ram: "4GB",
        cellular: "4G",
        size: "6.5 inches",
        wp: "Unlocked for All Carriers",
        src: "./images/8i.jpg",
        code: "a9",
        qty: 0
    },
]
const laptop = [{
        brand: "HP",
        model: "14s-dq2535TU",
        value: 4,
        amount: 57490,
        not: 63179,
        save: 5689,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "512GB",
        ram: "8GB",
        ic: "i5-1135G7",
        size: "14 inches",
        os: "Windows 10 Home",
        src: "./images/1411.jpg",
        code: "b1",
        qty: 0
    }, {
        brand: "HP",
        model: "14-ec0035AU",
        value: 4,
        amount: 54990,
        not: 67931,
        save: 12941,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "512GB",
        ram: "8GB",
        ic: " Ryzen 5",
        size: "14 inches",
        os: "Windows 10 Home",
        src: "./images/amd.jpg",
        code: "b2",
        qty: 0
    }, {
        brand: "HP",
        model: "15s-GY0501AU",
        value: 4,
        amount: 40490,
        not: 46055,
        save: 5565,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "256GB",
        ram: "8GB",
        ic: " Ryzen 3",
        size: "15.6 inches",
        os: "Windows 10 Home",
        src: "./images/15.jpg",
        code: "b3",
        qty: 0
    }, {
        brand: "Dell",
        model: "Inspiron 3501",
        value: 4,
        amount: 56258,
        not: 57125,
        save: 867,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "256GB",
        ram: "4GB",
        ic: "i5-1135G7",
        size: "15.6 inches",
        os: "Windows 10 Home",
        src: "./images/3501.jpg",
        code: "b4",
        qty: 0
    }, {
        brand: "Dell",
        model: "Vostro 3400 ",
        value: 4,
        amount: 62290,
        not: 68928,
        save: 6638,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "512GB",
        ram: "8GB",
        ic: "i5-1135G7",
        size: "14 inches",
        os: "Windows 10 Home",
        src: "./images/3400.jpg",
        code: "b5",
        qty: 0
    },
    {
        brand: "Dell",
        model: "INSPIRON 3511 ",
        value: 4,
        amount: 43090,
        not: 56776,
        save: 13686,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "256GB",
        ram: "8GB",
        ic: "i3-1115G4",
        size: "15.6 inches",
        os: "Windows 10 Home",
        src: "./images/3511.jpg",
        code: "b6",
        qty: 0
    }, {
        brand: "Lenevo",
        model: "IdeaPad Slim 5",
        value: 4,
        amount: 62990,
        not: 104290,
        save: 41300,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "512GB",
        ram: "16GB",
        ic: "i5",
        size: "15.6 inches",
        os: "Windows 10 Home",
        src: "./images/s5.jpg",
        code: "b7",
        qty: 0
    }, {
        brand: "Lenevo",
        model: "82C7A006IH ",
        value: 4,
        amount: 30700,
        not: 32900,
        save: 2200,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "1TBHDD",
        ram: "4GB",
        ic: "i3-1115G4",
        size: "15.6 inches",
        os: "Windows 10 Home",
        src: "./images/82.jpg",
        code: "b8",
        qty: 0
    }, {
        brand: "Lenevo",
        model: "IdeaPad Slim 3 ",
        value: 4,
        amount: 46100,
        not: 69000,
        save: 22900,
        da: "Save extra with No Cost EMI",
        db: "Free Delivery by BagIT",
        rom: "256GB",
        ram: "8GB",
        ic: "i3-1115G4",
        size: "14 inches",
        os: "Windows 10 Home",
        src: "./images/ls3.jpg",
        code: "b9",
        qty: 0
    },
]
const shoe = [{
        brand: "Yonex",
        model: "SHB88",
        value: 4,
        amount: 7100,
        not: 8000,
        save: 900,
        da: "Power Cushion Badminton Shoes For Men",
        db: "Free Delivery by BagIT",
        ram: "Synthetic leather",
        middle: "Rubber",
        rom: "Synthetic resin",
        size: "UK 8",
        color: "Red",
        src: "./images/ys.jpg",
        code: "c1",
        qty: 0
    },

    {
        brand: "Yonex",
        model: "EclipsionX",
        value: 3,
        amount: 9999,
        not: 11350,
        save: 1351,
        da: "Power Cushion Badminton Shoes",
        db: "Free Delivery by BagIT",
        ram: "Durable Skin",
        middle: "ToughBrid Light",
        rom: "Rubber",
        size: "UK 7",
        color: "White",
        src: "./images/c2.jpg",
        code: "c2",
        qty: 0
    },
    {
        brand: "Yonex",
        model: "SHB 37",
        value: 4,
        amount: 7100,
        not: 8000,
        save: 900,
        da: "EX Junior Badminton Shoes",
        db: "Free Delivery by BagIT",
        ram: "P.U. Leather & Polyester Mesh",
        middle: " Power Cushion & E.V.A.",
        rom: "Rubber",
        size: "UK 6",
        color: "White",
        src: "./images/c3.jpg",
        code: "c3",
        qty: 0
    },
    {
        brand: "Li-Ning",
        model: "Saga Lite",
        value: 3,
        amount: 2038,
        not: 4990,
        save: 2952,
        da: "Non-Marking Badminton Shoe",
        db: "Free Delivery by BagIT",
        ram: "Polyester Mesh",
        middle: " Power Cushion ",
        rom: "Rubber",
        size: "UK 8",
        color: "Blue",
        src: "./images/c4.jpg",
        code: "c4",
        qty: 0
    },
    {
        brand: "Li-Ning",
        model: "New Ace 3 Premium",
        value: 5,
        amount: 2890,
        not: 3890,
        save: 1000,
        da: "Non-Marking Badminton Shoe",
        db: "Free Delivery by BagIT",
        ram: "pu+mesh",
        middle: "phylon ",
        rom: " gel ",
        size: "UK 8",
        color: "Blue",
        src: "./images/c5.jpg",
        code: "c5",
        qty: 0
    },
    {
        brand: "Li-Ning",
        model: "Saga Lite",
        value: 3,
        amount: 2038,
        not: 4990,
        save: 2952,
        da: "Non-Marking Badminton Shoe",
        db: "Free Delivery by BagIT",
        ram: "Synthetic Leather and Mesh",
        middle: " Phylon ",
        rom: "Rubber",
        size: "UK 10",
        color: "Silver",
        src: "./images/c6.jpg",
        code: "c6",
        qty: 0
    },
]

async function main(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let del = await db.collection("mobiles").deleteMany({});
        let dell = await db.collection("laptops").deleteMany({});
        let dels = await db.collection("shoes").deleteMany({});
        let post = await db.collection("mobiles").insertMany(mob);
        let postl = await db.collection("laptops").insertMany(laptop);
        let posts = await db.collection("shoes").insertMany(shoe);
        await client.close();
    } catch (error) {}
}
main();
//////////////
//////////////LOGIN,REGISTER
function authenthicate(req, res, next) {
    try {
        if (req.headers.authorization) {
            jwt.verify(req.headers.authorization, "d3b4Sc2FUe8JwLbYzQ5q", function(error, decoded) {
                if (error) {
                    console.log("errorw")
                    console.log(error)
                } else {
                    console.log(decoded)
                    req.userid = decoded.id
                    next()
                }

            })
        } else {
            console.log("error1")
        }
    } catch (error) {
        console.log("error2")
    }
}


app.post("/register", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        console.log(req.body)
        let post = await db.collection("registers").insertOne(req.body);
        await client.close()
    } catch (error) {}
})

app.post("/login", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        req.body.userid = req.userid
        let user = await db.collection("registers").findOne({
            gmail: req.body.gmail
        })
        console.log(user)
        if (user) {
            let match = await bcrypt.compareSync(req.body.password, user.password)
            console.log(match)
            if (match) {
                let token = jwt.sign({
                    id: user._id
                }, "d3b4Sc2FUe8JwLbYzQ5q");
                console.log(token)
                res.json({
                    message: true,
                    token
                })
            } else {
                console.log("error3")
            }
        } else {
            console.log("error4")
        }

    } catch (error) {
        console.log("incorrect")
    }
})

//////////////////////////////
//////////////////////MOBILE


app.get("/mobiles", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("mobiles").find({}).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/samsung", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("mobiles").find({
            brand: "Samsung"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/realme", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("mobiles").find({
            brand: "Realme"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})

app.get("/oppo", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("mobiles").find({
                brand: "Oppo"
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    ////////
app.get("/gba", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("mobiles").find({
            rom: "64GB"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/gbb", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("mobiles").find({
                rom: "128GB"
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    /////
app.get("/ra", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("mobiles").find({
            ram: "4GB"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/rb", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("mobiles").find({
                ram: "6GB"
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    //////
app.get("/ca", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("mobiles").find({
            cellular: "4G"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/cb", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("mobiles").find({
                cellular: "5G"
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    ////////
app.get("/pa", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("mobiles").find({
            amount: {
                $lt: 30000
            }
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/pb", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("mobiles").find({
            amount: {
                $lt: 20000
            }
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/pc", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("mobiles").find({
                amount: {
                    $lt: 10000
                }
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    /////////
    /////////////////////
    /////////LAPTOPS
app.get("/laptops", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("laptops").find({}).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/hp", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("laptops").find({
            brand: "HP"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/dell", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("laptops").find({
            brand: "Dell"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/lenevo", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("laptops").find({
                brand: "Lenevo"
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    /////////
app.get("/six", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("laptops").find({
            amount: {
                $lt: 60000
            }
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})

app.get("/five", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("laptops").find({
            amount: {
                $lt: 50000
            }
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/four", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("laptops").find({
                amount: {
                    $lt: 40000
                }
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    ///////
app.get("/roma", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("laptops").find({
            rom: "256GB"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/romb", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("laptops").find({
                rom: "512GB"
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    ////
app.get("/rama", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("laptops").find({
            ram: "4GB"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/ramb", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("laptops").find({
                ram: "8GB"
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    //////////
    ///////////////SHOES

app.get("/shoes", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("shoes").find({}).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/yonex", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("shoes").find({
            brand: "Yonex"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/lining", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("shoes").find({
                brand: "Li-Ning"
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    ///////////
app.get("/blue", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("shoes").find({
            color: "Blue"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/silver", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("shoes").find({
            color: "Silver"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/white", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("shoes").find({
            color: "White"
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/red", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("shoes").find({
                color: "Red"
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    ///////
app.get("/ot", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("shoes").find({
            amount: {
                $lt: 10000
            }
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {}
})
app.get("/tt", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("shoes").find({
                amount: {
                    $lt: 3000
                }
            }).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    ////////////////////////
    ///////////CARTS
app.post("/cartm", [authenthicate], async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        console.log(req.userid)
        console.log(req.body)
        let selected = await db.collection("mobiles").find({
            code: req.body.code
        }).toArray();
        selected.map(o => o.userid = req.userid)
        console.log(selected)
        let post = await db.collection("selected").insertMany(selected)
        await client.close()
    } catch (error) {
        console.log("error33")
    }
})
app.post("/cartl", [authenthicate], async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        console.log(req.userid)
        console.log(req.body)
        let selected = await db.collection("laptops").find({
            code: req.body.code
        }).toArray();
        selected.map(o => o.userid = req.userid)
        console.log(selected)
        let post = await db.collection("selected").insertMany(selected)
        await client.close()
    } catch (error) {}
})
app.post("/cartsz", [authenthicate], async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        console.log(req.body)
        let selected = await db.collection("shoes").find({
            code: req.body.code
        }).toArray();
        selected.map(o => o.userid = req.userid)
        console.log(selected)
        let post = await db.collection("selected").insertMany(selected)
        await client.close()
    } catch (error) {}
})
app.get("/scarts", [authenthicate], async function(req, res) {
    try {
        console.log(req.userid)
        let client = await mongoclient.connect(url);
        let db = client.db("cart")
        let get = await db.collection("selected").find({
            userid: req.userid
        }).toArray();
        res.json(get);
        await client.close()
    } catch (error) {
        console.log("error7")
    }
})

///////////////////////
//////////QUANTITY , DELETE
app.post("/qty", [authenthicate], async function(req, res) {
    try {
        console.log(req.body)
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let put = await db.collection("selected").findOneAndUpdate({
            _id: mongodb.ObjectId(req.body.id),
        }, {
            $set: {
                qty: req.body.e,
                damt: req.body.e * req.body.amt
            }
        })
        console.log("success")
        await client.close()
    } catch (error) {

    }
})

app.delete("/delete/:id", async function(req, res) {
    try {
        console.log(req.params.id)
        let did = req.params.id;
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let deletes = await db.collection("selected").findOneAndDelete({
            _id: mongodb.ObjectId(did)
        })
        await client.close()
    } catch (error) {
        console.log("error9")
    }
})





///////////////////////////////////////////
app.listen(port, function() {
    console.log(`App is Running in ${port}`);
})