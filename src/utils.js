import * as Realm from "realm-web";
export const toggleBoolean = (prev) => !prev;

export const createObjectId = () => {
  return new Realm.BSON.ObjectId()
};
