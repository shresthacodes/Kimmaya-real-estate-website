// import_property.js

// Load the JSON data from the file
const filePath = '/path/to/Property.json'; // Update this path
const data = JSON.parse(cat(filePath)); // Use `cat` to read the file in `mongosh`

// Access the MongoDB database and collection
const db = connect('mongodb+srv://shres2003:Kimmaya@cluster0.vspxllk.mongodb.net/Kimmaya');
const collection = db.getCollection('Property');

// Insert the data into the collection
collection.insertMany(data);
