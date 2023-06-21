const express = require("express");
const router = express.Router();
const { Dorms } = require("../models");
const { Image } = require("../models");
// const path = require('path');
//image storing logic
// const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './images');
//     },
//     filename: (req, file, cb) => {
//         console.log(file);
//         cb(null, Date.now() + path.extname(file.originalname));
//     }
// })


// const upload = multer({ storage: storage });

// const upload = multer({ storage: multer.memoryStorage() });

router.get("/", async (req, res) => {
    const listOfDorms = await Dorms.findAll();
    res.json(listOfDorms);
});

router.get("/byId/:id", async (req, res) => {
    const id = req.params.id;
    const dorm = await Dorms.findByPk(id);
    res.json(dorm);
});

router.put('/updateDorm/:id', async (req, res) => {
    const id = req.params.id;
    const { name, administrator, adress, description, rooms, room_capacity, maps_link, phone, url } = req.body;


    try {
        const dorm = await Dorms.findByPk(id);

        if (dorm) {
            dorm.name = name;
            dorm.administrator = administrator;
            dorm.adress = adress;
            dorm.description = description;
            dorm.rooms = rooms;
            dorm.room_capacity = room_capacity;
            dorm.maps_link = maps_link;
            dorm.phone = phone;
            dorm.url = url;

            await dorm.save();

            return res.status(200).json({ message: 'Dormitory updated successfully' });
        }
        return res.status(404).json({ message: 'Dormitory not found' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});




router.post("/", async (req, res) => {
    const dorm = req.body;
    await Dorms.create(dorm);
    res.json(dorm);
});

// router.post("/upload", upload.single('DormImage'), async (req, res) => {
//     const file = req.file; // Access the uploaded file object

//     // Handle the uploaded file
//     if (file) {
//         try {
//             const { fieldname, originalname, encoding, mimetype, buffer } = file;
//             // Save the file information to the database
//             const name = "test" // Assuming the name field is provided in the request body

//             const image = buffer.toString('base64'); // Convert the image buffer to base64 encoding

//             const createdImage = await Image.create({ name, image }); // Insert the new entry into the database

//             console.log('Image created successfully:', createdImage);

//             res.status(200).json({ message: 'File uploaded successfully.' });
//         } catch (error) {
//             console.error('Error creating image:', error);
//             res.status(500).json({ message: 'Internal server error.' });
//         }
//     } else {
//         res.status(400).json({ message: 'No file uploaded.' });
//     }
// });

module.exports = router;