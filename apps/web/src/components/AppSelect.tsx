import { ChangeEvent, useEffect, useState } from "react";
import { socket } from "../socket";
import { Select } from "flowbite-react";

interface Props {
  items: string[];
}

export function AppSelect({ items }: Props) {
  const [selectedValue, setSelectedValue] = useState<string>("");

  useEffect(() => {
    socket.on("receive_dropdown_selected_value", (value: string) =>
      setSelectedValue(value)
    );
  }, [socket]);

  function handleOnChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedValue(event.target.value);
    try {
      socket.emit("dropdown_selected_value", event.target.value);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Select value={selectedValue} onChange={handleOnChange}>
      {items.map((item, index) => (
        <option key={index}>{item}</option>
      ))}
    </Select>
  );
}