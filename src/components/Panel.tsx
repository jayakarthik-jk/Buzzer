import { useEffect, useState } from "preact/hooks";
import Counter from "./Counter";
import type { GroupInfo } from "../pages/api/store";
import Buzzer from "./Buzzer";

export default function Panel() {
  const [error, setError] = useState<string>();
  const [group, setGroup] = useState<GroupInfo>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchGroup() {
      const id = new URL(location.href).searchParams.get("id");
      if (!id) {
        return setError("Group Expired");
      }
      try {
        const response = await fetch("/api/get-group", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          const body = await response.json();
          return setGroup(body as GroupInfo);
        }

        setError(await response.text());
      } catch (error) {
        setError("Something went wrong");
      }
    }

    fetchGroup().then(() => setLoading(false));
  }, []);

  if (error) {
    return (
      <div class="flex flex-col gap-2 justify-center items-center">
        <div>{error}</div>
        <a
          href="/create"
          class="bg-white hover:bg-slate-200 text-black px-3 py-2 font-bold rounded-lg"
        >
          Create new Group
        </a>
      </div>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (!group) {
    return "Something went wrong";
  }

  return (
    <div>
      <Counter endTime={new Date(group.endTime).getTime()} />
      <Buzzer groupId={group.id} />
    </div>
  );
}
