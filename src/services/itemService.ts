import Item, { IItem } from '../models/itemModel';

export const createItem = async (itemData: Partial<IItem>): Promise<IItem> => {
  const item = new Item(itemData);
  return item.save();
};

export const getItems = async (): Promise<IItem[]> => {
  return Item.find();
};

export const getItemById = async (id: string): Promise<IItem | null> => {
  return Item.findById(id);
};

export const updateItem = async (id: string, updateData: Partial<IItem>): Promise<IItem | null> => {
  return Item.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteItem = async (id: string): Promise<IItem | null> => {
  return Item.findByIdAndDelete(id);
};
