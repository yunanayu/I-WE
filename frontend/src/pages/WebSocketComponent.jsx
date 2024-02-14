import React, { useCallback, useRef, useState, useEffect } from 'react';
import {createGlobalStyle} from 'styled-components';
import reset from 'styled-reset';
import { MessageBox, ChatItem, SystemMessage, ChatList, Input } from 'react-chat-elements';
import 'react-chat-elements/dist/main.css';

const Chat = () => {
    const [msg, setMsg] = useState("");
    const [name, setName] = useState("");
    const [chatt, setChatt] = useState([]);
    const [chkLog, setChkLog] = useState(false);
    const [socketData, setSocketData] = useState();

    const ws = useRef(null);    //webSocket을 담는 변수,
                                //컴포넌트가 변경될 때 객체가 유지되어야하므로 'ref'로 저장
    useEffect(() => {
        //실행될 작업
        ws.current = new WebSocket("ws://localhost:8080/socket/chat");
        
        ws.current.onopen = () => {
            webSocketLogin();
            setChkLog(true);
        }

        return ()=>{

        }
    }, []);

    useEffect(() => {
        if(socketData !== undefined) {
            // const tempData = chatt.concat(socketData);
            // console.log("tempData : "+tempData);
            // setChatt(tempData);
            setChatt(chatt.concat(socketData));
        }
    }, [socketData]);


    const GlobalStyle = createGlobalStyle`  //css 초기화가 된 component
        ${reset}
    `;

    const onText = event => {
        console.log(event.target.value);
        setMsg(event.target.value);
    }

    const webSocketLogin = useCallback(() => {
        // ws.current = new WebSocket("ws://localhost:8080/socket/chat");

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
            webSocketLogin();
            setChkLog(true);
        }

        if(msg !== ''){
            const data = {
                name,
                msg,
                date: new Date().toLocaleString(),
            };  //전송 데이터(JSON)

            const temp = JSON.stringify(data);
            
            if(ws.current.readyState === 0) {   //readyState는 웹 소켓 연결 상태를 나타냄
                ws.current.onopen = () => { //webSocket이 맺어지고 난 후, 실행
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
    
    
    const msgBox = chatt.map((message, index) => (
        <MessageBox 
            key={index}
            position={'left'}
            type={"text"}
            title={message.title}
            text = {message.msg}
            >
        </MessageBox>
    ));

    return (
        
        <>
            <GlobalStyle/>
            <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9', borderRadius: '10px' }}>
            <h1 style={{ textAlign: 'center', color: '#333' }}>Let's Chat!</h1>
            <br />
            <div style={{ marginBottom: '20px' }}>
                {chatt.map((message, index) => (
                    <MessageBox 
                    key={index}
                    position={'left'}
                    type={"text"}
                    title={message.title}
                    text = {message.msg}
                    >
                </MessageBox>
                    // <ChatItem
                    //     key={index}
                    //     title={message.name}
                    //     subtitle={message.msg}
                    //     date={new Date()}
                    // />
                ))}
            </div>
            <Input
                placeholder="Type here..."
            multiline={true}
/>
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