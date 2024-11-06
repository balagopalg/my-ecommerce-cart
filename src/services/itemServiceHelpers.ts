import Item, { IItem } from '../models/itemModel';

export const findItemByName = async (name: string): Promise<IItem | null> => {
    return await Item.findOne({ name });
  };