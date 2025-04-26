"use client";
import { useEffect,useRef } from "react";
import {useSearchParams} from "next/navigation";
const URL_WEB_SOCKET="ws://localhost:8090/ws";

let localStream;
let localpeerConnection;


const Page = () => {
    const ws=useRef(null);
    const searchParams=useSearchParams();
    


    useEffect(()=>{
        if(ws.current) return ;
const wsClient=new WebSocket(URL_WEB_SOCKET);
ws.current=wsClient;
wsClient.onopen=()=>{
    console.log("WebSocket connection open");
    wsClient.current=wsClient;
    sendWsMesage("join", {
        channelName: searchParams.get("channelName"),
        userName: searchParams.get("userName")
    });
    setupDevice();

}
wsClient.onClose=()=>
    console.log("WebSocket connection closed");
wsClient.onmessage=(message)=>{
    const parsedMessage=JSON.parse(message.data);
    const {type,body}=parsedMessage;

    switch(type){
        case 'joined':
            console.log('users in this channel',body);
            if(body.length>1){
                setupPeerConnection();
            }
            break;
        case 'offer_sdp_received':
            const offer=body;
            onAnswer(offer.sdp);
            break;
        case 'offer_sdp_accepted':
            gotRemoteDescription(body.sdp);    
        break;
        case 'send_ice_candidate':
            if(body.candidate){
                localpeerConnection.addIceCandidate(new RCTIceCandidate(body.candidate));
            }
            break;

    }
};
    }
    ,[]);

    const gotRemoteDescription= answer=>{
        localpeerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        localpeerConnection.onaddStream=gotRemoteStream;
    }

    


const onAnswer=(offer)=>{
    localpeerConnection=new RTCPeerConnection([],pcConstraints);
    localpeerConnection.onicecandidate=gotlocalIceCandidateAnswer;
    localpeerConnection.ontrack = (event) => {
        const remotePlayer = document.getElementById('peerPlayer');
        if (remotePlayer.srcObject !== event.streams[0]) {
            remotePlayer.srcObject = event.streams[0];
        }
    };  
    localpeerConnection.onaddStream=gotRemoteStream;
    localStream.getTracks().forEach(track=>{
        localpeerConnection.addTrack(track,localStream);});
       
        localpeerConnection.setRemoteDescription(new RTCSessionDescription(offer))
        .then(() => localpeerConnection.createAnswer())
        .then(gotAnswerDescription);
};

const gotAnswerDescription=(answer)=>{
   localpeerConnection.setLocalDescription(answer);
}
const gotlocalIceCandidateAnswer=(event)=>{
    if(!event.candidate){
       const answer=localpeerConnection.localDescription;
       sendWsMesage('send_answer',{
        channelName:searchParams.get('channelName'),
        userName:searchParams.get('userName'),
        sdp:answer

       })
    }
    

}
const sendWsMesage=(type,body)=>{
    if(ws.current && ws.current.readyState === WebSocket.OPEN){
        ws.current.send(JSON.stringify({type,body}));
    } else {
        console.warn("WebSocket not ready", type);
    }
};

const pcConstraints={
    'optional':[
        {'DtlsSrtpkeyAgreement':true}

    ]
} 
//creating a new peer connection 

const setupPeerConnection=()=>{
 localpeerConnection=new RTCPeerConnection(
    [],pcConstraints);
    localpeerConnection.onicecandidate=gotlocalIceCandidateOffer;
    localpeerConnection.ontrack = (event) => {
        const remotePlayer = document.getElementById('peerPlayer');
        if (remotePlayer.srcObject !== event.streams[0]) {
            remotePlayer.srcObject = event.streams[0];
        }
    };
    
      localStream.getTracks().forEach(track=>{
        localpeerConnection.addTrack(track,localStream);});//gets from setupDevice
    localpeerConnection.onaddStream=gotRemoteStream;//when new steam added set it to peer player 
    localpeerConnection.createOffer().then(gotlocalDescriptionOffer) ;//create am offer and set it as local description
 }

//  set created offer as local description

 const gotlocalDescriptionOffer=(offer)=>{
           localpeerConnection.setLocalDescription(offer);
}

//set new stream to peer player 

 const gotRemoteStream=(event)=>{
   const remotePlayer=document.getElementById('peerPlayer');
   remotePlayer.srcObject=event.stream;
 }


 const gotlocalIceCandidateOffer=(event)=>{
    if(!event.candidate){
        const offer=localpeerConnection.localDescription;
        sendWsMesage('send_offer',{
            channelName:searchParams.get('channelName'),
            userName:searchParams.get('userName'),
            sdp:offer
        })
    }

 }


const setupDevice=()=>{
        navigator.mediaDevices.getUserMedia({audio:true,video:true})
        .then((stream)=>{
const localPlayer=document.getElementById('localPlayer');
localPlayer.srcObject=stream;
localStream=stream;

sendWsMesage("join",{
    channelName:searchParams.get('channelName'),
    userName:searchParams.get('userName')
});
        })
        .catch((err)=>{
            console.log('err',err)
        })
}



      
    return (   

<div className="flex flex-col w-200 h-250 justify-center items-center m-auto p-8 h-screen bg-black text-white">
    <div className="flex flex-row ">
        <video id="localPlayer" autoPlay style={{width:640,height:300}}/>

    </div>
    <div className="flex flex-row">
        <video id="peerPlayer" autoPlay style={{width:640,height:300}}/>
        
    </div>
    </div> 
     
)};

export default Page;