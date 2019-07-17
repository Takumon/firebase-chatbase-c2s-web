import { firestore } from '../configs/firebase';

const COLLECTION_MESSAGES = 'messages';

export function sendMessage(userId: string, message: any) {
  return firestore
    .collection(COLLECTION_MESSAGES)
    .add({
      // TODO Chanel ID
      userId,
      message,
    });
}

export function deleteMessage(userId: string, messageId: string, message: any) {
  return firestore
    .collection(COLLECTION_MESSAGES)
    .doc(messageId)
    .delete();
}

export function getMessages() {
  // TODO
  console.log('TODO Impl in getMessages');
}

export function onSnapshot(callback: any) {
  firestore
  .collection(COLLECTION_MESSAGES)
  .onSnapshot(callback);
}

export function offSnapshot() {
  firestore
  .collection(COLLECTION_MESSAGES)
  .onSnapshot(() => {})
}
