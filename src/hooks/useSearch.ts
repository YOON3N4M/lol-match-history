import { handleRiotId } from "@/utils";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function useSearch() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [isToolTip, setIsToolTip] = useState(false);

  const usernameWithRiotId = translateUsernameWithRiotId(username);

  function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }

  function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputValue = handleRiotId(username, "#");

    if (inputValue.tag === undefined) {
      if (inputValue.name.length === 2) {
        const handleBlank = `${inputValue.name[0]} ${inputValue.name[1]}`;
        router.push(`/summoners/kr/${handleBlank}-KR1`);
      } else {
        router.push(`/summoners/kr/${inputValue.name}-KR1`);
      }
    } else {
      router.push(`/summoners/kr/${inputValue.name}-${inputValue.tag}`);
    }
  }

  return {
    username,
    isToolTip,
    handleOnChange,
    handleOnSubmit,
    usernameWithRiotId,
  };
}

function translateUsernameWithRiotId(username: string) {
  const nickname = username.split("#")[0];
  const tag = username.split("#")[1];
  if (username === "") return "";
  if (!tag) {
    return `${nickname}#KR1`;
  } else if (tag === "KR1") {
    return `${nickname}#KR1`;
  } else {
    return username;
  }
}
