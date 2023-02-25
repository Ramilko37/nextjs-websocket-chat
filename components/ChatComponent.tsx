import React from 'react';
import {useAppSelector} from "../store/store";

function ChatComponent({message, handleSubmit, setMessage, onInputChange}) {
    const username = useAppSelector((state) => state.username);
    const messages = useAppSelector(state => state.messages);

    messages.map(msg => console.log(msg))

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={message?.text || null}
                    onChange={onInputChange}
                />
                <button type="submit">Send</button>
            </form>
            <ul>
                {messages.map((msg) =>
                    <li key={msg.id}>
                        <strong>{username}:</strong> {msg.text}
                    </li>
                )}
            </ul>
        </div>
    );
}

export default ChatComponent;
