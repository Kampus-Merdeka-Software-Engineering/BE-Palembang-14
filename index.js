const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

const sequelize = new Sequelize('mysql://root:tqZX26t9KRjI6SHYrdMD@containers-us-west-145.railway.app:7826/railway');

const Books = sequelize.define('Book', {
  Judul: {
    type: DataTypes.TEXT, // Mengubah tipe data menjadi TEXT
    allowNull: false,
  },
  Penulis: {
    type: DataTypes.STRING,
  },
  Tahun_terbit: {
    type: DataTypes.INTEGER,
  },
  Deskripsi: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'books',
  timestamps: false
});

const jalankanServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.get('/books', async (req, res) => {
      try {
        let books = await Books.findAll();
        res.json(books);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    app.get('/book/:id', async (req, res) => {
      try {
        let books = await Books.findByPk(req.params.id);
        res.json(books);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.post('/books', async (req, res) => {
      try {
        let data = req.body;
        let a = await Books.create({
          Judul: data.Judul,
          Penulis: data.Penulis,
          Tahun_terbit: data.Tahun_terbit,
          Deskripsi: data.Deskripsi,
        });
        res.json(a);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

jalankanServer();

process.on('exit', () => {
  sequelize.close();
});
