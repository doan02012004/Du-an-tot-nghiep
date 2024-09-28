import React, { useState } from 'react'
const friends = [
    { id: 1, name: 'Friend 1' },
    { id: 2, name: 'Friend 2' },
    { id: 3, name: 'Friend 3' },
];
const ListMember = () => {
    const [selectedFriend, setSelectedFriend] = useState(friends[0]);

  return (
    <div className="w-1/4 bg-gray-100 p-4 border-r border-gray-300">
    <h2 className="text-lg font-semibold mb-4">Member</h2>
    <ul>
        {friends.map((friend) => (
            <li
                key={friend.id}
                onClick={() => setSelectedFriend(friend)}
                className={`p-2 cursor-pointer hover:bg-gray-200 rounded-md  ${selectedFriend.id === friend.id ? 'bg-blue-100' : ''
                    }`}
            >
                <span className='font-semibold'>{friend.name}</span>
            </li>
        ))}
    </ul>
</div>
  )
}

export default ListMember