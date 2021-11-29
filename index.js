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
        console.log(req.body)
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        console.log(req.body)
        let post = await db.collection("registers").insertOne(req.body);
        await client.close()
    } catch (error) {
        console.log(error)
        console.log("erorrrr")
    }
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
                    // deleted();
                    // main();
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
    /// /////////////////////////////////////////////

//////////////////////////////
//////////////////////MOBILE

app.post("/postmob", async function(req, res) {
    try {
        console.log("posted")
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let del = await db.collection("mobiles").deleteMany({});
        let cpost = await db.collection("mobiles").insertMany(req.body)
        await client.close()
    } catch (error) {
        console.log("not posted")
        console.log(error)
    }
})

app.get("/mobiles", async function(req, res) {
    try {
        // main();
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        // req.body.userid = req.id
        console.log(req.userid)
        let get = await db.collection("mobiles").find({
            // userid: req.userid
        }).toArray();
        console.log(get)
        res.json(get)
        await client.close()
    } catch (error) {
        console.log("errorab")
        console.log(error);
    }
})

app.get("/samsung", async function(req, res) {
    try {
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let get = await db.collection("mobiles").find({
            brand: "Samsung",
            userid: req.userid
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
    //     ////////
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
    /////
app.get("/allmob", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("mobiles").find({}).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    //////POST MOBILES IN CART

app.post("/cartm", [authenthicate], async function(req, res) {
    try {

        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        console.log(req.userid)
            // req.body.userid = req.userid
        console.log(req.body)
        let selected = await db.collection("mobiles").find({
            // _id: mongodb.ObjectId(req.body.id)
            code: req.body.code
        }).toArray();
        selected.map((o) => o.userid = req.userid)
        console.log(selected)
        let post = await db.collection("selected").insertMany(selected);
        await client.close()
    } catch (error) {
        console.log("error33")
        console.log(error)
    }
})

//     /////////
//     /////////////////////
//     /////////LAPTOPS

app.post("/postlap", async function(req, res) {
    try {
        console.log("posted")
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let del = await db.collection("laptops").deleteMany({});
        let cpost = await db.collection("laptops").insertMany(req.body)
        await client.close()
    } catch (error) {
        console.log("not posted")
        console.log(error)
    }
})

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
    //     /////////
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
    //     ///////
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
    //     ////
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
    ///
app.get("/alllap", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("laptops").find({}).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    ///POST LAPS IN CART
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

//     //////////
///////////////////////////
//     ///////////////SHOES

app.post("/postshoe", async function(req, res) {
    try {
        console.log("posted")
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let del = await db.collection("shoes").deleteMany({});
        let cpost = await db.collection("shoes").insertMany(req.body)
        await client.close()
    } catch (error) {
        console.log("not posted")
        console.log(error)
    }
})

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
    //     ///////////
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
    //     ///////
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
    ///
app.get("/allshoes", async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let get = await db.collection("shoes").find({}).toArray();
            console.log(get)
            res.json(get)
            await client.close()
        } catch (error) {}
    })
    /////POST SHOES IN CART
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
    } catch (error) {
        console.log("error44")
        console.log(error)
    }
})



//     ////////////////////////
//     ///////////CARTS PAGE

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
        console.log(error)
    }
})

// ///////////////////////
// //////////QUANTITY , DELETE
app.post("/qty", async function(req, res) {
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
        console.log("errorrrrrr")
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

///////FINALIZING PURCHASE
app.post("/final", [authenthicate], async function(req, res) {
    try {
        console.log(req.body)
        let client = await mongoclient.connect(url);
        let db = client.db("cart");
        let de = await db.collection("final").deleteMany({
            userid: req.userid
        });
        let post = await db.collection("final").insertMany(req.body)
        await client.close()
        console.log("finalizedd")
    } catch (error) {
        console.log("not finalizedd")
        console.log(error)
    }
})
app.get("/finals", [authenthicate], async function(req, res) {
        try {
            let client = await mongoclient.connect(url);
            let db = client.db("cart");
            let del = await db.collection("final").deleteMany({
                    qty: 0
                })
                // let delb = await db.collection("final").deleteMany(del)
            let get = await db.collection("final").find({
                userid: req.userid
            }).toArray()
            console.log(get)
            res.json(get)
            await client.close()
            console.log("finalizeddget")
        } catch (error) {
            console.log("not get finalizedd")
            console.log(error)
        }
    })
    ///////////
    ////////PURCHASE PAGE
app.post("/notesz", [authenthicate], async function(req, res) {
    try {
        ///Today
        let dates = new Date();
        let date = (("0" + dates.getDate()).slice(-2))
        let month = (("0" + (dates.getMonth() + 1)).slice(-2))
        let year = (dates.getFullYear())
        let tday = (year + "-" + month + "-" + date);
        req.body.date = tday
        console.log(req.body)
        let client = await mongoclient.connect(url)
        let db = client.db("cart")
        req.body.userid = req.userid
        let post = await db.collection("notes").insertOne(req.body)
        await client.close()
        console.log("noted");
    } catch (error) {
        console.log("not noted");
        console.log(error)
    }
})

app.get("/notesy", [authenthicate], async function(req, res) {
    try {
        let client = await mongoclient.connect(url)
        let db = client.db("cart")
        let post = await db.collection("notes").find({
            userid: req.userid
        }).toArray()
        res.json(post)
        await client.close()
        console.log("got notes");
    } catch (error) {
        console.log("didnt get noted");
        console.log(error)
    }
})


///////////////////////////////////////////
app.listen(port, function() {
    console.log(`App is Running in ${port}`);
})