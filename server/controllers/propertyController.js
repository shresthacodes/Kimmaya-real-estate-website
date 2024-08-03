import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createProperty = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    image,
    address,
    city,
    facilities,
    userEmail,
  } = req.body.data;
  console.log(req.body.data);
  try {
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price,
        image,
        address,
        city,
        facilities,
        owner: {
          connect: {
            email: userEmail,
          },
        },
      },
    });
    res.send({
      message: "Property created successfully",
      property: property,
    });
  } catch (err) {
    if (err.code === "P2002") {
      res.status(400).send({ message: "Property already exists" });
    }
    throw new Error(err.message);
  }
});

export const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await prisma.property.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  res.send(properties);
});
// to get a specific property
export const getProperty = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const property = await prisma.property.findUnique({
        where: { id },
      });
      res.send(property);
    } catch (err) {
      throw new Error(err.message);
    }
  });
