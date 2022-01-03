import { Products } from "./../entity/product";
import { getManager } from "typeorm";
import { createConnection } from "typeorm";
import faker from "faker";
import { randomInt } from "crypto";

createConnection().then(async (connect) => {
  const productRepo = getManager().getRepository(Products);

  for (let i = 0; i < 30; i++) {
    await productRepo.save({
      price: randomInt(100, 1000),
      title: faker.lorem.words(2),
      description: faker.lorem.words(5),
      image: faker.image.imageUrl(200, 200, "", true),
    });
  }

  process.exit(0);
});
