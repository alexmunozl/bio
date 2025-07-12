import * as React from "react";
export function Button({ className = "", ...props }) {
  return (
    <button className={\`px-4 py-2 text-white bg-black rounded-md hover:bg-gray-800 \${className}\`} {...props} />
  );
}