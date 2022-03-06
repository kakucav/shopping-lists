import Product from "../models/product.model";

const products = [
  { name: "AirPods 1" },
  { name: "AirPods 2" },
  { name: "AirPods 3" },
  { name: "Sony Xperia XA2" },
  { name: "Charger" },
  { name: "Fast charger" },
  { name: "Silicon case" },
  { name: "Wireless charger" },
  { name: "Earpods 1" },
  { name: "Earpods 2" },
];

const seedProducts = async () => {
  try {
    for (const { name } of products) {
      const product = new Product({ name });
      await product.save();
    }

    console.log("products seed done");
  } catch (error) {
    console.log(error);
  }
};

export default seedProducts;
