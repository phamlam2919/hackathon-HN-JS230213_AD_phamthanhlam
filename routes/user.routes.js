const express = require("express");
const router = express.Router();
const pool = require("../utils/database");

router.post("/", async (req, res) => {
    let { name, age, email } = req.body;
    console.log(name, age, email);
    let data = await pool.execute(
        `INSERT INTO users( name, age, email) VALUE(?, ?, ?)`,
        [name, age, email]
    );
    console.log(data);
});

router.get("/", async (req, res) => {
    try {
        let data = await pool.execute("SELECT * FROM users;");
        console.log(data[0]);
        res.json({
            message: "Lấy toàn bộ users",
        });
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let { id } = req.params;
        let data = await pool.execute(
            `SELECT * FROM users WHERE users_id = ?`,
            [id]
        );
        let row = data[0];
        if (row.length === 0) {
            res.json({
                message: "User with id is not defind",
            });
        } else {
            res.json(row[0]);
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.patch("/:id", async (req, res) => {
    let { id } = req.params;
    let { name, age, email } = req.body;
    try {
        let data = await pool.execute(
            `SELECT * FROM users WHERE users_id = ?`,
            [id]
        );
        let row = data[0];
        if (row.length === 0) {
            res.json({
                message: "User with id is not defind",
            });
        } else {
            //  logic
            await pool.execute(
                `UPDATE users SET name =?, age = ?, email = ? WHERE users_id = ?`,
                [
                    name || row[0].name,
                    age || row[0].age,
                    email || row[0].email,
                    id,
                ]
            );
            res.json({
                message: "Users update",
            });
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

router.delete("/:id", async (req, res) => {
    let { id } = req.params;
    try {
        let data = await pool.execute(
            `SELECT * FROM users WHERE users_id = ?`,
            [id]
        );
        let row = data[0];
        if (row.length === 0) {
            res.json({
                message: "User with id is not defind",
            });
        } else {
            await pool.execute(`DELETE FROM users WHERE users_id= ?`, [id]);
            res.json({
                message: "users delete",
            });
        }
    } catch (error) {
        res.json({
            error: error,
        });
    }
});

module.exports = router;
