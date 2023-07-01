const FIREBASE_SERVICE_ACCOUNT = require('../../firebase_service_account_dev.json.json');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.cert(FIREBASE_SERVICE_ACCOUNT),
  });

const FIREBASE_ADMIN = admin;
const FIREBASE_FIRESTORE = admin.firestore();
const FIREBASE_AUTH = admin.auth();
  

const _createDocument = async (collection, data, id) => {
    try {
      if (id) {
        await FIREBASE_FIRESTORE.collection(collection).doc(id).set(data);
      } else {
        await FIREBASE_FIRESTORE.collection(collection).add(data);
      }
      return;
    } catch (error) {
      console.error('error: ', error);
      return null;
    }
  };

  const _updateDocument = async (collection, data, id) => {
    try {
      return await FIREBASE_FIRESTORE.collection(collection).doc(id).update(data);
    } catch (error) {
      console.error('error: ', error);
      return null;
    }
  };

  const _getDocument = async (collection, id) => {
    try {
      const ref = FIREBASE_FIRESTORE.collection(collection).doc(id);
      const doc = await ref.get();
      if (!doc.exists) {
        return null;
      }
      return {
        ...doc.data(),
        id: doc.id,
      };
    } catch (error) {
      console.error('error: ', error);
      return null;
    }
  };

  const _queryDocuments = async (collection, query, companie) => {
    try {
      let companie_attr;
      if (companie) {
        companie_attr = companie.attr;
      }
      let filters = query.filters;
      const sort = query.sort;
      let ref = FIREBASE_FIRESTORE.collection(collection);
      if (!filters) {
        filters = [];
      }
      if (companie_attr) {
        filters.push({
          attr: 'companie_attr',
          operation: '=',
          value: companie_attr,
        });
      }
      filters.forEach((q) => {
        ref = ref.where(q.attr, q.operation, q.value);
      });
      if (sort) {
        if (sort.attr) {
          ref = ref.orderBy(sort.attr, sort.asc ? 'asc' : 'desc');
        }
        if (sort.limit > 0) {
          ref = ref.limit(sort.limit);
        }
      }
      let res = await ref.get();
      if (res.empty) {
        return [];
      }
      const docs = res.docs;
      let data = docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      return data;
    } catch (error) {
      console.error('error: ', error);
      return [];
    }
  };
  

  module.exports = {
    FIREBASE_ADMIN,
    FIREBASE_FIRESTORE,
    FIREBASE_AUTH,
    _getDocument,
    _createDocument,
    _queryDocuments,
    _updateDocument
  };
  