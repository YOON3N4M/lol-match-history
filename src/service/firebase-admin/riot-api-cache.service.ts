import "server-only";

import type { DocumentData, DocumentReference } from "firebase-admin/firestore";

import { getAdminDb } from "@/lib/firebase/admin";

interface RiotApiCacheOptions<T> {
  collectionName: string;
  documentId: string;
  ttlMs: number | null;
  fetcher: () => Promise<T>;
}

interface RiotApiCacheDocument<T> {
  data: T;
  updatedAt: number;
  expiresAt: number | null;
}

export async function getCachedRiotApiData<T>(options: RiotApiCacheOptions<T>) {
  const { collectionName, documentId, ttlMs, fetcher } = options;
  const now = Date.now();

  let docRef: DocumentReference<DocumentData> | undefined;

  try {
    docRef = getAdminDb().collection(collectionName).doc(documentId);
    const snapshot = await docRef.get();
    const cachedData = snapshot.data() as RiotApiCacheDocument<T> | undefined;

    if (
      cachedData?.data !== undefined &&
      (cachedData.expiresAt === null || cachedData.expiresAt > now)
    ) {
      return cachedData.data;
    }
  } catch (error) {
    console.error("Riot API 캐시 조회에 실패했습니다.", error);
    return fetcher();
  }

  const data = await fetcher();
  const updatedAt = Date.now();
  const cacheDocument: RiotApiCacheDocument<T> = {
    data,
    updatedAt,
    expiresAt: ttlMs === null ? null : updatedAt + ttlMs,
  };

  if (!docRef) {
    return data;
  }

  try {
    await docRef.set(cacheDocument, { merge: true });
  } catch (error) {
    console.error("Riot API 캐시 저장에 실패했습니다.", error);
  }

  return data;
}

export function createRiotCacheDocumentId(...parts: Array<number | string>) {
  return parts
    .map((part) => encodeURIComponent(String(part).trim()))
    .join("__");
}
