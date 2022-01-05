import { Products } from "./../entity/product";
import { getManager } from "typeorm";
export const register = async (body) => {
  const productRepo = getManager().getRepository(Products);
  return productRepo.save({
    ...body,
  });
};

export const getAllProducts = async (take, page) => {
  const productRepo = getManager().getRepository(Products);
  return productRepo.findAndCount({ take, skip: (page - 1) * take });
};

export const getProduct = async (id) => {
  const productRepo = getManager().getRepository(Products);
  return productRepo.findOne(id);
};

export const deleteProduct = async (id: number) => {
  const productRepo = getManager().getRepository(Products);
  return productRepo.delete(id);
};

export const editProduct = async (id: number, body) => {
  const productRepo = getManager().getRepository(Products);
  return productRepo.save({
    id,
    ...body,
  });
};
