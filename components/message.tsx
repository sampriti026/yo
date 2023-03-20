import React from "react";

interface MessageBoxProps {
  type: "error" | "success" | "warning";
  message: string;
}

const MessageBox: React.FC<MessageBoxProps> = ({ type, message }) => {
  let textColor = "text-gray-800";
  let bgColor = "bg-gray-100";
  let borderColor = "border-gray-300";

  switch (type) {
    case "error":
      textColor = "text-red-800";
      bgColor = "bg-red-100";
      borderColor = "border-red-300";
      break;
    case "success":
      textColor = "text-green-800";
      bgColor = "bg-green-100";
      borderColor = "border-green-300";
      break;
    case "warning":
      textColor = "text-yellow-800";
      bgColor = "bg-yellow-100";
      borderColor = "border-yellow-300";
      break;
  }

  return (
    <div
      className={`rounded-md border ${borderColor} ${bgColor} ${textColor} px-4 py-2`}
    >
      {message}
    </div>
  );
};

export default MessageBox;
