import React, { useCallback, useRef, useState, useEffect } from 'react';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import { MessageBox, SystemMessage, ChatList, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';
import useMemberStore from "../stores/userStore";
import heart3 from '../images/heart3.png'
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {
    const [msg, setMsg] = useState("");
    const [chat, setChat] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();
    const userName = useMemberStore(state => state.userName);
    const parentType = useMemberStore(state => state.parentType)
    const ws = useRef(null);

    const socketDataListner = useCallback(() => {
        ws.current.onmessage = (message) => {
            const dataSet = JSON.parse(message.data);
            setSocketData(dataSet);
        }
    }, []);

    useEffect(() => {
        ws.current = new WebSocket(process.env.REACT_APP_WEB_SOCKET_URL || `wss://i10c108.p.ssafy.io/api/socket/chat`);

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
    }, [socketDataListner]);

    useEffect(() => {
        if(socketData !== undefined) {
            setChat(prevChatt => [...prevChatt, socketData]);

        }
    }, [socketData]);


    const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
    `;

    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }

    const send = useCallback(() => {
        if(!chkLog) {
            socketDataListner();
            setChkLog(true);
        }

        if(msg !== ''){
            const data = {
                name:userName,
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
            {/* <h1 style={{ textAlign: 'center', color: '#333' }}>{userName}'s Chat!</h1> */}
            <h1 style={{ textAlign: 'center', color: '#333' }}>우리들의 이야기<img src={heart3} width="30" height="30" alt="heartimg" /></h1>
            
            <br />
            <div style={{ marginBottom: '20px' }}>
                {chat.map((message, index) => (
                    console.log("message.name : " + message.name),
                    console.log("userName : " + userName),

                    <MessageBox 
                        key={index}
                        position={message.name===userName?'right':'left'}
                        type={"text"}
                        title={message.name}
                        text = {message.msg}
                    >
                    </MessageBox>
                ))}
            </div>
            <div 
                style={{ display: 'flex' }}>
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
                ></input>
            </div>
        </div>
        </>
    );
};

export default Chat;