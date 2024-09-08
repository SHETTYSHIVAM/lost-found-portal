import React from 'react';

export default function ContextMenu({ isVisible, coords, messageIndex, onSelect }) {

  return (
    <>
      {isVisible && (
        <ul
          className="absolute bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-lg py-2 z-50"
          style={{ top: `${coords.y}px`, left: `${coords.x}px` }}
        >
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={() => onSelect('reply')}>Reply 1</li>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer" onClick={() => onSelect('delete')}>Delete 2</li>
          <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer">Option 3</li>
        </ul>
      )}
    </>
  );
}
