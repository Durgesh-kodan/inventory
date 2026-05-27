"use server";

import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth";
import { prisma } from "../prisma";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.coerce.number().nonnegative("Price must be non-negative"),
  quantity: z.coerce.number().int().min(0, "Quantity must be non-negative"),
  sku: z.string().optional(),
  lowStockAt: z.coerce.number().int().min(0).optional(),
});

export async function deleteProduct(formData: FormData) {
  const user = await getCurrentUser();
  const id = String(formData.get("id") || "");

  await prisma.product.deleteMany({
    where: { id: id, userId: user.id },
  });
}

export async function createProduct(formData: FormData) {
  const user = await getCurrentUser();

  const parsed = ProductSchema.safeParse({
    name: formData.get("name"),
    price: formData.get("price"),
    quantity: formData.get("quantity"),
    sku: formData.get("sku") || undefined,
    lowStockAt: formData.get("lowStockAt") || undefined,
  });

  if (!parsed.success) {
    throw new Error("Validation failed");
  }

  try {
    const productData = {
      name: parsed.data.name,
      price: parsed.data.price,
      quantity: parsed.data.quantity,
      userId: user.id,
      ...(parsed.data.sku !== undefined ? { sku: parsed.data.sku } : {}),
      ...(parsed.data.lowStockAt !== undefined ? { lowStockAt: parsed.data.lowStockAt } : {}),
    };

    await prisma.product.create({
      data: productData,
    });
    redirect("/inventory");
  } catch (error) {
    throw new Error("Failed to create product.");
  }
}