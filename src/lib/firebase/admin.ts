import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let adminDb: Firestore | undefined;

export function getAdminDb() {
  if (adminDb) {
    return adminDb;
  }

  const app =
    getApps()[0] ??
    initializeApp({
      credential: cert({
        projectId: getRequiredEnv("FIREBASE_PROJECT_ID"),
        clientEmail: getRequiredEnv("FIREBASE_CLIENT_EMAIL"),
        privateKey: getRequiredEnv("FIREBASE_PRIVATE_KEY").replace(/\\n/g, "\n"),
      }),
    });

  adminDb = getFirestore(app);
  return adminDb;
}

function getRequiredEnv(key: string) {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} 환경 변수가 설정되지 않았습니다.`);
  }

  return value;
}
