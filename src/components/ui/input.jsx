import * as React from "react";
export function Input({ className = "", ...props }) {
  return (
    <input className={\`w-full px-3 py-2 border border-gray-300 rounded-md \${className}\`} {...props} />
  );
}