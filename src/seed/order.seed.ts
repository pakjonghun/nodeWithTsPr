import { OrderItems } from "./../entity/orderItem.entity";
import { getManager } from "typeorm";
import { createConnection } from "typeorm";
import { Orders } from "../entity/order.entity";
import faker from "faker";
import { randomInt } from "crypto";

createConnection().then(async (connection) => {
  const orderRepo = getManager().getRepository(Orders);
  const orderItemRepo = getManager().getRepository(OrderItems);

  for (let i = 0; i < 30; i++) {
    const order = await orderRepo.save({
      email: faker.internet.email(),
      firstname: faker.name.firstName(),
      lastname: faker.name.lastName(),
      createdAt: faker.date.past(2).toDateString(),
    });

    for (let i = 0; i < 5; i++) {
      await orderItemRepo.save({
        quantity: randomInt(5, 10),
        price: randomInt(100, 1000),
        title: faker.name.title(),
        order,
      });
    }
  }

  process.exit(0);
});
