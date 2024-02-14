import React, { useCallback, useRef, useState, useEffect } from 'react';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import { MessageBox, SystemMessage, ChatList, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import useMemberStore from "../stores/userStore";

const Chat = () => {
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [chat, setChat] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const userName = useMemberStore(state => state.userName);
    const setUserName = useMemberStore(state => state.setUserName)
    const ws = useRef(null);
    useEffect(() => {

        console.log(process.env.REACT_APP_WEB_SOCKET_URL);
        ws.current = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL || 'wss://i10c108.p.ssafy.io/api/socket/chat');
        
        ws.current.onopen = () => {
            socketDataListner();
            setChkLog(true);
            console.log("socket open");
        }
        return ()=>{
            ws.current.close();
            setChkLog(false);
            console.log("socket closed");
        }
    }, []);

    useEffect(() => {
        if(socketData !== undefined) {
            setChat(chat.concat(socketData));
        }
    }, [socketData]);


    const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
    `;

    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }
    
    const socketDataListner = useCallback(() => {
        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        }
    });

    const send = useCallback(() => {
        if(!chkLog) {
            if(name === "") {
                alert("이름을 입력하세요.");
                document.getElementById("name").focus();
                return;
            }
            socketDataListner();
            setChkLog(true);
        }
        setUserName(name)
        console.log("userName : " + userName)

        if(msg !== ''){
            const data = {
                name,
                msg,
                date: new Date().toLocaleString(),
            }; 

            const temp = JSON.stringify(data);
            
            if(ws.current.readyState === 0) {
                ws.current.onopen = () => {
                    console.log(ws.current.readyState);
                    ws.current.send(temp);
                }
            }else {
                ws.current.send(temp);
            }
        }else {
            alert("메세지를 입력하세요.");
            document.getElementById("msg").focus();
            return;
        }
        setMsg("");
        
    });

    return (
        <>
            <GlobalStyle/>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>{userName}'s Chat!</h1>
            <br />
            <div style={{ marginBottom: '20px' }}>
                {chat.map((message, index) => (
                    <MessageBox 
                        key={index}
                        position={message.name===userName?'left':'right'}
                        type={"text"}
                        title={message.name}
                        text = {message.msg}
                    >
                </MessageBox>
                ))}
            </div>
            <input
                placeholder='Enter your name'
                type='text'
                style={{ padding: '10px', marginBottom: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '5px' }}
                id='name'
                value={name}
                onChange={(event) => setName(event.target.value)}
            />
            <div style={{ display: 'flex' }}>
                <textarea
                    style={{ padding: '10px', marginRight: '10px', flex: '1', border: '1px solid #ccc', borderRadius: '5px' }}
                    id='msg'
                    value={msg}
                    onChange={onText}
                    onKeyDown={(ev) => { if (ev.keyCode === 13) { send(); } }}
                ></textarea>
                <input
                    type='button'
                    value='Send'
                    style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100px' }}
                    id='btnSend'
                    onClick={send}
                />
            </div>
        </div>
        </>
    );
};

export default Chat;