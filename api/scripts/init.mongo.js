/*
 * Run using the mongo shell. For remote databases, ensure that the
 * connection string is supplied in the command line. For example:
 * localhost:
 *   mongo issuetracker scripts/init.mongo.js
 * Atlas:
 *   mongo mongodb+srv://shrutisarle:user@cluster0-hvabn.mongodb.net/productinventory 
     scripts/init.mongo.js
 * MLab:
 *   mongo mongodb://user:pwd@xxx.mlab.com:33533/issuetracker
     scripts/init.mongo.js
 */
/* global db print */
/* eslint no-restricted-globals: "off" */
db.products.remove({});
db.deleted_products.remove({});
const productDB = [
  {
    id: 1,
    category: 'Accessories',
    name: 'Sasha Straw Hat',
    price: 59.99,
    image: 'https://cdn.shopify.com/s/files/1/0250/5057/9028/products/WSP20_41180188_WOMEN_S_PACKABLE_HAT_1_1200x.progressive.jpg?v=1582127160',
  },
  {
    id: 2,
    category: 'Jackets',
    name: 'Johnkart Mens Jacket',
    price: 59.94,
    image: 'https://cdn.shopify.com/s/files/1/1083/6796/products/product-image-1154618935_1024x1024.jpg?v=1575441773',

  },
  {
    id: 3,
    category: 'Jeans',
    name: 'Womens Levis Jeans',
    price: 98.00,
    image: 'https://catalog.21buttons.com/d37f11faf735b4d33feb4ce1cdd50c43aaf2b22d.smedium.jpg',
  },
];
db.products.insertMany(productDB);
const count = db.products.count();
print('Inserted', count, 'products');

db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });
print('Created counter');

db.products.createIndex({ id: 1 }, { unique: true });
db.deleted_products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ category: 1 });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
