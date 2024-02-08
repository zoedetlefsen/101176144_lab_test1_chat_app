import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/GroupChat.css';

const socket = io('http://localhost:4000'); // Make sure to replace with your actual server URL

function GroupChat() {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [chatRoom, setChatRoom] = useState('devops'); // Default chat room

    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            if (message.room === chatRoom) { // Only add message if it's for the current room
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });

        return () => {
            socket.off('receiveMessage');
        };
    }, [chatRoom]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        const message = {
            id: messages.length + 1, // Simple id generation
            username: 'currentUser', // Dynamically set this based on the user
            text: newMessage,
            room: chatRoom // Include selected chat room
        };
        socket.emit('sendMessage', message, chatRoom); // Emit message to server with room
        setNewMessage(''); // Clear input after sending
    };

    return (
        <div className="group-chat">
            <div className="messages">
                {messages.map((message) => (
                    <div key={message.id} className="message">
                        <strong>{message.username}</strong>: {message.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSendMessage} className="send-message-form">
                <select value={chatRoom} onChange={(e) => setChatRoom(e.target.value)}>
                    <option value="devops">DevOps</option>
                    <option value="cloud computing">Cloud Computing</option>
                    <option value="covid19">COVID-19</option>
                    <option value="sports">Sports</option>
                    <option value="nodeJS">NodeJS</option>
                </select>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message here..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default GroupChat;
