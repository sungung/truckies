import {fstore} from "../common/fbase";

const COLLECTION_NAME = 'user-fleet';

export type Rego = {
  id?: string, 
  uid: string,
  license: string,
  notify: boolean,
  obsolete?: boolean,  
};

export const query = (uid: string) => {
  return fstore.collection(COLLECTION_NAME).where('uid', '==', uid).orderBy('license');
}

export const create = async (rego: Rego): Promise<Rego> => {
  const ref = await fstore.collection(COLLECTION_NAME).add(rego);
  return {
    id: ref.id,
    ...rego,
  } as Rego;
}

export const update = async (rego: Rego): Promise<Rego> => {
  await fstore.collection(COLLECTION_NAME).doc(rego.id).update(rego);
  return {
    ...rego
  } as Rego;
}

export const remove = async (rego: Rego): Promise<void> => {
  await fstore.collection(COLLECTION_NAME).doc(rego.id).delete();
}