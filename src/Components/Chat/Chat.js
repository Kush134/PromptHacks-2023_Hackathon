import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import { BsArrowBarUp, BsSend } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { PulseLoader } from 'react-spinners';
import { extractTextFromHtml } from '../../utils/extractTextFromHtml';
import useAutosizeTextArea from '../../utils/useAutoTextArea';
import './Chat.css'
import ChatMessage from './ChatMessage';
import landingImg from '../../Assets/landing.svg'
import { prompts } from '../../Data/prompts';
import QuestionError from '../../Pages/QuestionError';
/* eslint-disable no-undef */

const API_KEY = process.env.REACT_APP_GPT_API;

const Chat = ({ platform, questionTitleClass, questionBodyClass }) => {
    const [tmpMessage, setTmpMessage] = useState('')
    const [messages, setMessages] = useState([]);
    const [inputMsg, setInputMsg] = useState("");

    const [questionTitle, setQuestionTitle] = useState('')
    const [questionData, setQuestionData] = useState('')
    const [prefferedLanguage, setPreferredLanguage] = useState('python')

    const [loadingMsg, setLoadingMsg] = useState(false)
    const [triggerSend, setTriggerSend] = useState(false)
    const [displayPromts, setDisplayPrompts] = useState(true)

    const textAreaRef = useRef(null);

    useAutosizeTextArea(textAreaRef.current, inputMsg);

    useEffect(() => {
        handleSend(0)
        // eslint-disable-next-line
    }, [triggerSend])

    useEffect(() => {
        if (!questionTitleClass || questionTitleClass === '' || !questionBodyClass || questionBodyClass === '') return
        getQuestionData(questionBodyClass, platform === "InterviewBit")
        getQuestionTitle(questionTitleClass)
        // eslint-disable-next-line
    }, [questionTitleClass, questionBodyClass])



    useEffect(() => {
        async function fetchData() {
            if (questionTitle === '' || !platform) {
                return;
            }
            await chrome.storage.sync.get(`${platform}_${questionTitle.replace(/\s/g, '')}messages`, result => {
                if (result[`${platform}_${questionTitle.replace(/\s/g, '')}messages`]) {
                    setMessages(JSON.parse(result[`${platform}_${questionTitle.replace(/\s/g, '')}messages`]))
                }
            })
            await chrome.storage.sync.get(`${platform}_${questionTitle.replace(/\s/g, '')}displayPrompts`, result => {
                if (result[`${platform}_${questionTitle.replace(/\s/g, '')}displayPrompts`] !== undefined) {
                    setDisplayPrompts((result[`${platform}_${questionTitle.replace(/\s/g, '')}displayPrompts`]))
                }
            })
            await chrome.storage.sync.get(`codie-preffered-lang`, result => {
                if (result[`codie-preffered-lang`]) {
                    setPreferredLanguage((result[`codie-preffered-lang`]))
                }
            })
        }
        fetchData()
        console.log(questionData)
        // eslint-disable-next-line
    }, [questionTitle, platform])

    async function processMessageChatgpt(chatMessages) {
        let apiMessages = chatMessages.map((messageObj) => {
            let role = ""
            if (messageObj.sender === "ChatGPT") {
                role = "assistant"
            } else {
                role = "user"
            }
            return { role: role, content: messageObj.message }
        })

        const sytstemMsgContent = `Your name is "Codie". You are "Codie". Identify yourself as "Codie". I will call you that. I'm a student preparing for software engineering interviews. I'm currently trying the
        ${questionTitle} question on ${platform}. Here is the full description of the question: 
        ${questionData}. My preferred programming language is ${prefferedLanguage}. You will help me with my doubts related to this question. You must not answer anything that is not relevant to the question or to my interview preparation. This is very important. Remember your name is "Codie"`
        const systemMessage = {
            role: "system",
            content: sytstemMsgContent.replace(/\s+/g, ' ').trim()
        }

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [systemMessage, ...apiMessages],
            max_tokens: 3000,
            temperature: 0.5,
        }

        await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + API_KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(apiRequestBody)
        }).then((data) => {
            return data.json()
        }).then(async (data) => {
            let msgs = [...chatMessages, {
                sender: "ChatGPT",
                message: data.choices[0].message.content
            }]
            setMessages(msgs)
            await chrome.storage.sync.set({
                [`${platform}_${questionTitle.replace(/\s/g, '')}messages`]: JSON.stringify(msgs)
            })
        })
    }

    const handleSend = async (e) => {
        if (inputMsg === '')
            return;
        if (e !== 0) e.preventDefault();
        setLoadingMsg(true)
        let newMessage = {}
        if (tmpMessage !== '') {
            newMessage = {
                message: inputMsg,
                displayMsg: tmpMessage,
                sender: "user",
                direction: "outgoing"
            }
            setTmpMessage('')
        } else {
            newMessage = {
                message: inputMsg,
                sender: "user",
                direction: "outgoing"
            }
        }

        const newMessages = [...messages, newMessage];

        setMessages(newMessages);
        setInputMsg('')
        await processMessageChatgpt(newMessages);
        setLoadingMsg(false)
    }

    const enterPressed = (e) => {
        let code = e.keyCode || e.which;
        if (code === 13 && !e.shiftKey) {
            handleSend(e);
        }
    }

    const getQuestionTitle = async (questionTitleClassName) => {
        const getQT = (arg1) => {
            const element = document.getElementsByClassName(arg1)[0];
            if (element) {
                return element.innerText;
            }
            return null;
        }
        await chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
            let activeTabId = tabs[0].id;
            await chrome.scripting.executeScript(
                {
                    target: { tabId: activeTabId },
                    func: getQT,
                    args: [questionTitleClassName]
                },
                (result) => {
                    let qt = result[0].result.slice(result[0].result.indexOf('.') + 1)
                    setQuestionTitle(qt)
                }
            );
        });
    };

    const getQuestionData = async (questionBodyClassName, isId) => {
        const getQB = (arg1, arg2) => {
            let element;
            if (arg2) {
                element = document.getElementById(arg1);
            } else {
                element = document.getElementsByClassName(arg1)[0];
            }

            if (element) {
                return element.innerHTML;
            }
            return null;
        }
        await chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
            let activeTabId = tabs[0].id;
            await chrome.scripting.executeScript(
                {
                    target: { tabId: activeTabId },
                    func: getQB,
                    args: [questionBodyClassName, isId]
                },
                (result) => {
                    const rawString = extractTextFromHtml(result[0].result)
                    let questionText = rawString.slice(0, rawString.indexOf('Example 1'))
                    questionText = questionText.slice(0, rawString.indexOf('Sample Input'))
                    setQuestionData(questionText)
                }
            );
        });
    }

    const toggleDisplayPrompts = async (val) => {
        setDisplayPrompts(val)
        await chrome.storage.sync.set({
            [`${platform}_${questionTitle.replace(/\s/g, '')}displayPrompts`]: val
        })
    }

    const prefilledPrompt = (promptNum) => {
        if (questionTitle === '') {
            getQuestionData()
            getQuestionTitle()
        }
        setInputMsg(prompts[promptNum - 1].actualMessage)
        setTmpMessage(prompts[promptNum - 1].displayMessage)
        setTriggerSend(!triggerSend)
    }

    return (
        <div className="chat-container">
            {questionTitle === '' ?
                <div>
                    <QuestionError />
                </div> :
                <>
                    {!messages || (messages && messages.length === 0) ?
                        <div className="chat-welcome-msg">
                            <div>
                                <img src={landingImg} alt="Codie" />
                            </div>
                            <div>
                                <h3>Hi there! I'm<span className="color-primary"> Codie</span></h3>
                                <p>I see that you're trying the {questionTitle} problem on {platform}</p>
                                <p>I'm here to help you with any doubts you have on that :)</p>
                                <p>Ask me anything!</p>
                            </div>
                        </div> :
                        <div className="chat-messages">
                            <ChatMessage messages={messages} />
                        </div>
                    }
                    {loadingMsg && <div className="chat-loading-msg"><PulseLoader color="#00edf3" /></div>}
                    <div className='chat-bottom'>
                        {displayPromts ?
                            <div className="chat-menu">
                                <button className="chat-prompt-toggle-close-btn" onClick={() => toggleDisplayPrompts(false)}><MdCancel /></button>
                                {prompts.map(prompt => (
                                    <button className="chat-prefilled-btn" onClick={() => prefilledPrompt(prompt.id)}>{prompt.displayMessage}</button>
                                ))}
                            </div> :
                            <button className="chat-prompt-toggle-btn" onClick={() => toggleDisplayPrompts(true)}><BsArrowBarUp /> Predefined Prompts</button>
                        }
                        <div className='chat-input-box'>
                            <form>
                                <div className='chat-input-div'>
                                    <textarea
                                        className="chat-input"
                                        value={inputMsg}
                                        onChange={e => setInputMsg(e.target.value)}
                                        onKeyDown={enterPressed}
                                        rows={1}
                                        ref={textAreaRef}
                                        required
                                    ></textarea>
                                    <button className="chat-send-btn" onClick={handleSend}><BsSend /></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>}
        </div>
    )
}

export default Chat