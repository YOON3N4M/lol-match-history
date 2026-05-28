import "server-only";

import { getAdminDb } from "@/lib/firebase/admin";

const COLLECTION_NAME = "riot_refresh_cooldowns";
const REGION = "KR";
const REFRESH_COOLDOWN_MS = 5 * 60 * 1000;

interface RiotRefreshCooldownDocument {
  region: typeof REGION;
  puuid: string;
  lockedUntil: number;
  lastRefreshedAt?: number;
  createdAt: number;
  updatedAt: number;
}

export interface RiotRefreshCooldownStatus {
  canRefresh: boolean;
  cooldownExpiresAt: number | null;
  retryAfterMs: number;
}

export class RiotRefreshCooldownError extends Error {
  status = 429;
  cooldownExpiresAt: number;
  retryAfterMs: number;

  constructor(cooldownExpiresAt: number, now = Date.now()) {
    const retryAfterMs = Math.max(cooldownExpiresAt - now, 0);

    super(
      `전적 갱신은 5분에 한 번만 가능합니다. ${formatCooldownTime(retryAfterMs)} 후 다시 시도해주세요.`,
    );

    this.name = "RiotRefreshCooldownError";
    this.cooldownExpiresAt = cooldownExpiresAt;
    this.retryAfterMs = retryAfterMs;
  }
}

export async function getRiotRefreshCooldown(
  puuid: string,
): Promise<RiotRefreshCooldownStatus> {
  const now = Date.now();
  const snapshot = await getAdminDb()
    .collection(COLLECTION_NAME)
    .doc(createDocumentId(puuid))
    .get();
  const data = snapshot.data() as
    | Partial<RiotRefreshCooldownDocument>
    | undefined;
  const cooldownExpiresAt =
    typeof data?.lockedUntil === "number" ? data.lockedUntil : null;

  return createCooldownStatus(cooldownExpiresAt, now);
}

export async function claimRiotRefresh(
  puuid: string,
): Promise<RiotRefreshCooldownStatus> {
  const db = getAdminDb();
  const docRef = db.collection(COLLECTION_NAME).doc(createDocumentId(puuid));
  const now = Date.now();
  const cooldownExpiresAt = now + REFRESH_COOLDOWN_MS;

  await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(docRef);
    const currentData = snapshot.data() as
      | Partial<RiotRefreshCooldownDocument>
      | undefined;

    if (
      typeof currentData?.lockedUntil === "number" &&
      currentData.lockedUntil > now
    ) {
      throw new RiotRefreshCooldownError(currentData.lockedUntil, now);
    }

    transaction.set(
      docRef,
      {
        region: REGION,
        puuid,
        lockedUntil: cooldownExpiresAt,
        createdAt: currentData?.createdAt ?? now,
        updatedAt: now,
      } satisfies RiotRefreshCooldownDocument,
      { merge: true },
    );
  });

  return createCooldownStatus(cooldownExpiresAt, now);
}

export async function completeRiotRefresh(
  puuid: string,
): Promise<RiotRefreshCooldownStatus> {
  const now = Date.now();
  const cooldownExpiresAt = now + REFRESH_COOLDOWN_MS;

  await getAdminDb()
    .collection(COLLECTION_NAME)
    .doc(createDocumentId(puuid))
    .set(
      {
        region: REGION,
        puuid,
        lockedUntil: cooldownExpiresAt,
        lastRefreshedAt: now,
        updatedAt: now,
      } satisfies Partial<RiotRefreshCooldownDocument>,
      { merge: true },
    );

  return createCooldownStatus(cooldownExpiresAt, now);
}

export async function releaseRiotRefreshClaim(puuid: string) {
  const now = Date.now();

  await getAdminDb()
    .collection(COLLECTION_NAME)
    .doc(createDocumentId(puuid))
    .set(
      {
        lockedUntil: now,
        updatedAt: now,
      } satisfies Partial<RiotRefreshCooldownDocument>,
      { merge: true },
    );
}

function createCooldownStatus(
  cooldownExpiresAt: number | null,
  now: number,
): RiotRefreshCooldownStatus {
  const retryAfterMs = cooldownExpiresAt
    ? Math.max(cooldownExpiresAt - now, 0)
    : 0;

  return {
    canRefresh: retryAfterMs <= 0,
    cooldownExpiresAt: retryAfterMs > 0 ? cooldownExpiresAt : null,
    retryAfterMs,
  };
}

function createDocumentId(puuid: string) {
  return `${REGION}:${encodeURIComponent(puuid)}`;
}

function formatCooldownTime(ms: number) {
  const totalSeconds = Math.max(Math.ceil(ms / 1000), 1);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes <= 0) {
    return `${seconds}초`;
  }

  if (seconds <= 0) {
    return `${minutes}분`;
  }

  return `${minutes}분 ${seconds}초`;
}
