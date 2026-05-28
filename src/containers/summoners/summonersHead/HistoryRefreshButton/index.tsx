"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import { cn } from "@/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

interface HistoryRefreshButtonProps {
  gameName: string;
  tagLine: string;
  cooldownExpiresAt: number | null;
}

interface RefreshResponse {
  message?: string;
  cooldownExpiresAt?: number | null;
  retryAfterMs?: number;
}

export default function HistoryRefreshButton(props: HistoryRefreshButtonProps) {
  const {
    gameName,
    tagLine,
    cooldownExpiresAt: initialCooldownExpiresAt,
  } = props;
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");
  const [cooldownExpiresAt, setCooldownExpiresAt] = useState(
    initialCooldownExpiresAt,
  );
  const [remainingCooldownMs, setRemainingCooldownMs] = useState(() =>
    getRemainingCooldownMs(initialCooldownExpiresAt),
  );
  const isCooldown = remainingCooldownMs > 0;
  const isLoading = isRefreshing || isPending;
  const isDisabled = isLoading || isCooldown;
  const statusMessage = isCooldown
    ? `전적 갱신 가능까지 ${formatCooldownTime(remainingCooldownMs)}`
    : errorMessage;

  useEffect(() => {
    if (!cooldownExpiresAt) {
      return;
    }

    const intervalId = window.setInterval(() => {
      const remainingMs = getRemainingCooldownMs(cooldownExpiresAt);

      setRemainingCooldownMs(remainingMs);

      if (remainingMs <= 0) {
        setCooldownExpiresAt(null);
      }
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [cooldownExpiresAt]);

  async function handleClick() {
    if (isDisabled) {
      return;
    }

    setErrorMessage("");
    setIsRefreshing(true);

    try {
      const response = await fetch("/api/riot/summoners/refresh", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          gameName,
          tagLine,
        }),
      });
      const data = (await response
        .json()
        .catch(() => null)) as RefreshResponse | null;

      if (!response.ok) {
        if (
          response.status === 429 &&
          typeof data?.cooldownExpiresAt === "number"
        ) {
          applyCooldownExpiresAt(data.cooldownExpiresAt);
          setErrorMessage("");
          return;
        }

        throw new Error(data?.message ?? "전적 갱신에 실패했습니다.");
      }

      if (typeof data?.cooldownExpiresAt === "number") {
        applyCooldownExpiresAt(data.cooldownExpiresAt);
      }

      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "전적 갱신에 실패했습니다.",
      );
    } finally {
      setIsRefreshing(false);
    }
  }

  function applyCooldownExpiresAt(nextCooldownExpiresAt: number) {
    setCooldownExpiresAt(nextCooldownExpiresAt);
    setRemainingCooldownMs(getRemainingCooldownMs(nextCooldownExpiresAt));
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        className={cn(
          "relative h-10 w-fit rounded bg-main-500 px-4 leading-10 text-white hover:bg-main-600",
          isDisabled && "cursor-not-allowed opacity-80",
        )}
        disabled={isDisabled}
        aria-busy={isLoading}
        onClick={handleClick}
      >
        <span className={cn(isLoading && "opacity-0")}>전적 갱신</span>
        <div
          className={cn("absolute y-center x-center", !isLoading && "hidden")}
        >
          <LoadingSpinner className="size-4" />
        </div>
      </button>
      {statusMessage && (
        <p
          className={cn(
            "text-xs font-medium",
            isCooldown ? "text-gray-500" : "text-red-500",
          )}
          role={isCooldown ? "status" : "alert"}
        >
          {statusMessage}
        </p>
      )}
    </div>
  );
}

function getRemainingCooldownMs(cooldownExpiresAt: number | null) {
  if (!cooldownExpiresAt) {
    return 0;
  }

  return Math.max(cooldownExpiresAt - Date.now(), 0);
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
