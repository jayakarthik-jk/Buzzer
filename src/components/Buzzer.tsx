import { useEffect, useState } from "preact/hooks";

export default function Buzzer({ groupId }: { groupId: string }) {
  const [selectedUserName, setSelectedUserName] = useState<string>();
  useEffect(() => {
    const events = new EventSource(`/api/join?groupId=${groupId}&type=panel`);
    events.onmessage = (event) =>
      setSelectedUserName(event.data === "null" ? undefined : event.data);
  }, []);
  return (
    <button
      id="selected-user-container"
      class="bg-white h-36 w-36 rounded-full flex justify-center items-center text-black disabled:bg-blue-300"
    >
      {selectedUserName ?? "No one selected"}
    </button>
  );
}
