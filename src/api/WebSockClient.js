
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { API_URL } from "./constant";


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
        this.stompClient.connect({"Authorization":token}, function (frame) {
            console.log('Connected: ' + frame);

            this.stompClient.subscribe('/user/topic/private-greetings', (message)=>{console.log("subscribe")})
            this.stompClient.subscribe('topic/greetings', (message)=>{console.log("message")})
        });
    }
    static disconnect = () => {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
            console.log("Disconnected");
        }
        else
            console.log("No client");
    }
}

export default WebSockClient.getInstance();
