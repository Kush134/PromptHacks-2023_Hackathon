import React, { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ChatMessage = ({ messages }) => {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className='chat-messages-div'>
            {messages.map((messageObj, index) => (
                <div key={index}>
                    {messageObj.sender === "ChatGPT" ?
                        <div className="chat-message chat-message-robot" >
                            <div className="chat-message-text">
                                <ReactMarkdown
                                    children={messageObj.message}
                                    components={{
                                        code({ node, inline, className, children, ...props }) {
                                            // const match = /language-(\w+)/.exec(className || '')
                                            return !inline ? (
                                                <SyntaxHighlighter
                                                    children={String(children).replace(/\n$/, '')}
                                                    style={materialDark}
                                                    language="cpp"
                                                    PreTag="div"
                                                    {...props}
                                                />
                                            ) : (
                                                <code className={className} {...props}>
                                                    {children}
                                                </code>
                                            )
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        : <div className="chat-message chat-message-user" >
                            <span className="chat-message-text">
                                <ReactMarkdown>{messageObj.displayMsg ? messageObj.displayMsg : messageObj.message}
                                </ReactMarkdown>
                            </span>
                        </div>}
                    <div ref={messagesEndRef} />
                </div>
            ))}
        </div>
    )
}

export default ChatMessage