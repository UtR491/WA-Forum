import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import { withRouter } from "react-router-dom";
import {
  getUsers,
  getCurrentUser,
  countNewMessages,
  findChatMessages,
  findChatMessage,
} from "../util/ApiUtil";
import { useRecoilValue, useRecoilState } from "recoil";
import { chatActiveContact, chatMessages } from "../atom/globalState";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css"

var stompClient = null;
var currentUser={};
const Chat = (props) => {
  const [loaded,setLoaded]=useState(false);
  //const [currentUser, setCurrentUser] = useState({});
 
  getCurrentUser().then((response) => {
    if(!loaded)
    {console.log("resonse has been received");
    currentUser=response;
    console.log("response assigned to current user , the object now is, ",currentUser);
    setLoaded(true)}
  });
  
  const [text, setText] = useState("");
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useRecoilState(chatActiveContact);
  const [messages, setMessages] = useRecoilState(chatMessages);

  useEffect(() => {
    if (sessionStorage.getItem("jwt") === null) {
      props.history.push("/");
    }
    console.log("calling connect");
    connect();
    loadContacts();
    console.log("connect method and load contact method called and executed");
  }, []);

  useEffect(() => {
    if (activeContact === undefined) return;
    findChatMessages(activeContact.id, sessionStorage.getItem("userId")).then((msgs) => {
      console.log("the messages are ", msgs);
      return setMessages(msgs);
    });
    loadContacts();
  }, [activeContact]);

  const connect = () => {
    const Stomp = require("stompjs");
    var SockJS = require("sockjs-client");
    console.log("attempting to connect to backend");
    SockJS = new SockJS("http://localhost:8080/ws");
    console.log("the sock js object ", SockJS);
    stompClient = Stomp.over(SockJS);
    console.log("stomp.over stompclient is ", stompClient);
    console.log("sending as jwt ", sessionStorage.getItem("jwt"));
    stompClient.connect({ "Authorization" : "Bearer " + sessionStorage.getItem("jwt")}, onConnected, onError);
  };

  const onConnected = () => {
    console.log("stomp client now ", stompClient);
    console.log("if you see this chat will get completed today.")
    console.log(currentUser);
    stompClient.subscribe(
      "http://localhost:8080/user/" + sessionStorage.getItem("userId") + "/queue/messages",
      onMessageReceived
    );
    console.log("after connecting and subscribing, stomp client is ", stompClient);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onMessageReceived = (msg) => {
    console.log("The message received ", msg);
    const notification = JSON.parse(msg.body);
    const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
      .chatActiveContact;

    if (active.id === notification.senderId) {
      findChatMessage(notification.id).then((message) => {
        const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
          .chatMessages;
        newMessages.push(message);
        setMessages(newMessages);
      });
    } else {
      message.info("Received a new message from " + notification.senderName);
    }
    loadContacts();
  };

  const sendMessage = (msg) => {
    if (msg.trim() !== "") {
      const message = {
        senderId: sessionStorage.getItem("userId"),
        recipientId: activeContact.id,
        senderName: currentUser.displayName,
        recipientName: activeContact.displayName,
        content: msg,
        timestamp: new Date(),
      };

      console.log("sending the message as ", message);
      stompClient.send("http://localhost:8080/api/chat", {}, JSON.stringify(message));

      const newMessages = [...messages];
      newMessages.push(message);
      setMessages(newMessages);
      console.log("message state is updated",newMessages);
    }
  };

  const loadContacts = () => {
    const promise = getUsers().then((users) =>
      users.map((contact) =>
        countNewMessages(contact.id, sessionStorage.getItem("userId")).then((count) => {
          contact.newMessages = count;
          console.log("count new messages in returned and added to contact",contact);
          return contact;
        })
      )
    );
    promise.then((promises) =>
      Promise.all(promises).then((users) => {
        setContacts(users);
        if (activeContact === undefined && users.length > 0) {
          setActiveContact(users[0]);
        }
      })
    );
  };

  return currentUser === {} ? (
    <div>Loading</div>
  ) : (
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <p>Displaying username :{currentUser.displayName}</p>
            <div id="status-options">
              <ul>
                <li id="status-online" className="active">
                  <span className="status-circle"></span> <p>Online</p>
                </li>
                <li id="status-away">
                  <span className="status-circle"></span> <p>Away</p>
                </li>
                <li id="status-busy">
                  <span className="status-circle"></span> <p>Busy</p>
                </li>
                <li id="status-offline">
                  <span className="status-circle"></span> <p>Offline</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div id="search" />
        <div id="contacts">
          <ul>
            {contacts.map((contact) => (
              <li
                onClick={() => setActiveContact(contact)}
                class={
                  activeContact && contact.id === activeContact.id
                    ? "contact active"
                    : "contact"
                }
              >
                <div className="wrap">
                  <span className="contact-status online"></span>
                  <img id={contact.id} src={contact.profilePicture} alt="" />
                  <div className="meta">
                    <p className="name">{contact.displayName}</p>
                    {contact.newMessages !== undefined &&
                      contact.newMessages > 0 && (
                        <p className="preview">
                          {contact.newMessages} new messages
                        </p>
                      )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div id="bottom-bar">
          <button id="addcontact">
            <i className="fa fa-user fa-fw" aria-hidden="true"></i>{" "}
            <span>Profile</span>
          </button>
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
            <span>Settings</span>
          </button>
        </div>
      </div>
      <div className="content">
        <div className="contact-profile">
          <img src={activeContact && activeContact.profilePicture} alt="" />
          <p>{activeContact && activeContact.name}</p>
        </div>
        <ScrollToBottom className="messages">
          <ul>
            {messages.map((msg) => (
              <li class={msg.senderId === sessionStorage.getItem("userId") ? "sent" : "replies"}>
                {msg.senderId !== sessionStorage.getItem("userId") 
                  // <img src={activeContact.profilePicture} alt="" />
                }
                <p>{msg.content}</p>
              </li>
            ))}
          </ul>
        </ScrollToBottom>
        <div className="message-input">
          <div className="wrap">
            <input
              name="user_input"
              size="large"
              placeholder="Write your message..."
              value={text}
              onChange={(event) => setText(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  sendMessage(text);
                  setText("");
                }
              }}
            />

            <Button
              icon={<i className="fa fa-paper-plane" aria-hidden="true"></i>}
              onClick={() => {
                sendMessage(text);
                setText("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
