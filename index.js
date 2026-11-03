const express = require('express');
const app = express();
const port = 3000;
const db = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. CREATE (POST)
app.post("/komik", async (req, res) => {
    const data = req.body;
    try {
        const komik = await db.komik.create(data);
        res.status(201).json({
            message: "Komik berhasil ditambahkan",
            data: komik
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. READ ALL (GET)
app.get("/komik", async (req, res) => {
    try {
        const komiks = await db.komik.findAll();
        res.status(200).json(komiks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    } 
});

// 3. UPDATE (PUT)
app.put("/komik/:id", async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }
        await komik.update(data);
        res.status(200).json({
            message: 'Komik berhasil diupdate',
            data: komik
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. DELETE (DELETE)
app.delete("/komik/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const komik = await db.komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ message: 'Komik tidak ditemukan' });
        }
        await komik.destroy();
        res.status(200).json({ message: 'Komik berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }   
});

// Sinkronisasi Database dan Menyalakan Server
db.sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log("Gagal koneksi database: ", err);
    });