import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { API_URL } from "./constant";
import PubSub from "pubsub-js";


class WebSockClient {

    constructor(){
        this.instance = null;
        this.stompClient = null;
        this.news = null;
    }
    static getInstance(){
        if(!this.instance)
            this.instance = new WebSockClient();
        return this.instance;
    }
    
    connect = (token) => {
        var socket = new SockJS(`${API_URL}/gs-guide-websocket`,
        null,
       {
           transports: ['xhr-streaming'], 
           headers: {'Authorization': token }
       });
    
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({"Authorization":token}, (frame) => {
            console.log('Connected: ' + frame);
            this.stompClient.subscribe('/user/topic/news',(news)=>{PubSub.publish("news", news)})

            this.stompClient.subscribe('/user/topic/private-greetings', (message)=>{console.log("subscribe");PubSub.publish("topic1",message)})
            this.stompClient.subscribe('topic/greetings', (message)=>{console.log("subscribe");PubSub.publish("topic1",message)})
        });
    }
    disconnect = () => {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            console.log("Disconnected");
        }
        else
            console.log("No client");
    }
    sendMessage = (prefix, destination, header, message) =>{
        this.stompClient.send(prefix+destination, header, JSON.stringify(message));
    }
}

export default WebSockClient.getInstance();
