import { useState } from "react";

export default function ProtocolCard() {
  const [protocolName, setProtocolName] = useState("");
  return (
    <div className="w-1/5 m-5 rounded items-center justify-center  flex bg-[#35a653] h-64">
      <div className="">{protocolName}</div>
    </div>
  );
}
