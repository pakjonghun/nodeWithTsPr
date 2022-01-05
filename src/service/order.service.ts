import { OrderItems } from "./../entity/orderItem.entity";
import { Orders } from "./../entity/order.entity";
import { getManager } from "typeorm";
import { Parser } from "json2csv";
export const getAllOrders = async (page, take) => {
  const orderRepo = getManager().getRepository(Orders);
  return orderRepo.findAndCount({
    take,
    skip: (page - 1) * take,
    relations: ["orderItems"],
  });
};

export const getOrder = async (id) => {
  const orderRepo = getManager().getRepository(Orders);
  return orderRepo.findOne(id, { relations: ["orderItems"] });
};

export const register = async ({ orderItems, ...body }) => {
  const orderRepo = getManager().getRepository(Orders);
  return orderRepo.save({
    ...body,
    orderItems: orderItems.map((id) => ({ id })),
  });
};

export const extract = async () => {
  const fields = ["ID", "Email", "Name", "ProductTitle", "Price", "Quantity"];

  const data = [];

  const orderRepo = getManager().getRepository(Orders);
  const orders = await orderRepo.find({ relations: ["orderItems"] });
  orders.forEach((item) => {
    data.push({
      ID: item.id,
      Email: item.email,
      Name: item.name,
      ProductTitle: "",
      Price: "",
      Quantity: "",
    });

    item.orderItems.forEach((jtem) => {
      data.push({
        ID: "",
        Email: "",
        Name: "",
        ProductTitle: jtem.title,
        Price: jtem.price,
        Quantity: jtem.quantity,
      });
    });
  });

  const parser = new Parser({ fields });
  return parser.parse(data);
};

export const chart = async () => {
  return getManager().query(
    `
    SELECT DATE_FORMAT(createdAt,'%Y-%m-%d') date, 
            SUM(oi.price*oi.quantity) priceSum 
    FROM orders 
    JOIN order_items oi ON oi.orderId=orders.id 
    GROUP BY(orders.id);
    `
  );
};

export const deleteOrder = async (id: number) => {
  const orderRepo = getManager().getRepository(Orders);
  await orderRepo.delete(id);
};

export const editOrder = async (id: number, body) => {
  const repo = getManager().getRepository(Orders);
  const payload = {
    id,
    ...body,
    ...(body.orderItems && {
      orderItems: body.orderItems.map((id) => {
        id;
      }),
    }),
  };

  await repo.save(payload);
};
