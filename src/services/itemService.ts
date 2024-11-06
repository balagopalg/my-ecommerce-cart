import { IGetItemRequest } from 'types/item';
import Item, { IItem } from '../models/itemModel';
import { findItemByName } from './itemServiceHelpers';

export const createItem = async (itemData: Partial<IItem>): Promise<boolean> => {
  const currentTime = new Date();

  const existingItem = await findItemByName(itemData.name);
  if (existingItem) {
    throw new Error(`Item with name "${itemData.name}" already exists.`);
  }

  const item = new Item({
    ...itemData,
    createdAt: currentTime,
    updatedAt: currentTime,
  });

  await item.save();
  return true;
};


export const getItems = async (): Promise<IItem[]> => {
  return Item.find({}, { name: 1, price: 1 })
};

export const getItemById = async (id: string): Promise<IItem | null> => {
  return Item.findById(id, { name: 1, price: 1, description: 1, isAvailable: 1, quantity: 1, _id: 0 });
};

export const updateItem = async (id: string, updateData: Partial<IItem>): Promise<IItem | null> => {
  return Item.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteItem = async (id: string): Promise<IItem | null> => {
  return Item.findByIdAndDelete(id);
};
