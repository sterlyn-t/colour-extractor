"use client";
import { Copy } from "lucide-react";
import React, { useState } from "react";

interface ListItemProps {
  hex: any;
  rgb: any;
}

const ListItem = ({ hex, rgb }: ListItemProps) => {
  const [copied, setCopied] = useState(false);
  return (
    <li
      className="relative w-64 h-64 rounded-xl list-none shadow-slate-800 shadow-md ease-in-out duration-200 hover:-translate-y-2"
      style={{ background: rgb }}
    >
      <span className="cursor-pointer px-2 py-4 w-[100%] absolute bottom-0 border-t-slate-800 border-t-2 flex justify-between">
        {copied ? "Copied!" : hex}
        {<Copy />}
      </span>
    </li>
  );
};

export default ListItem;
