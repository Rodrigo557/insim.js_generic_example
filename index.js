const { InSim, PacketType, UserType , IS_BTN, ButtonStyles , IS_MTC , MessageSound, IS_BFN, IS_OCO, BulbInfo, OCOAction, OCOIndex, IS_BTT , IS_TINY, TinyType} = require('insim.js');

const insim = new InSim({
  host: '35.226.125.45', //ip host
  port: 29999,  //port
  name: '^7Rodrigo^0557',  //insim name
  password: '&@{6eOqg', //adm password
  prefix: "!" //prefix commands
});

// It's always recommended to handle errors
insim.on('error', (error) => {
  console.log('Error', error);
});

insim.on('connect', () => {
  console.log('Connected to DCon');
  insim.send(new IS_TINY({ subType: TinyType.TINY_ISM }));
});

// When InSim receives the data from the DCon
insim.on('ready', () => {
  console.log('InSim is ready');
});

insim.connect();

var contador = 0

totalplayers = 0

insim.bind(PacketType.ISP_VER, (data) => {
    var timer = setInterval(function() {
        insim.send(
            new IS_BTN({
                buttonStyle: ButtonStyles.ISB_DARK,
                width: 87,
                height: 4,
                left: 55,
                top: 1,
                clickId: 1,
                text: "^5GENERIC SERVER ^7LIVE FOR SPEED",
                uniqueId: 255
            })
        )
    },
    contador++)
})


let lights = 0;
  
const intervalId = setInterval(() => {
  lights++;
  if (lights === 1) {
    insim.send(new IS_OCO({bulbInfo: BulbInfo.Green, identifier: 1 , ocoAction: OCOAction.OCO_LIGHTS_SET, ocoIndex: OCOIndex.AXO_START_LIGHTS,requestId: 2}))
  }
  if (lights === 12) {
    insim.send(new IS_OCO({bulbInfo: BulbInfo.Red2, identifier: 1 , ocoAction: OCOAction.OCO_LIGHTS_SET, ocoIndex: OCOIndex.AXO_START_LIGHTS,requestId: 2}))
  }
  if (lights === 15) {
    insim.send(new IS_OCO({bulbInfo: BulbInfo.Red1, identifier: 1 , ocoAction: OCOAction.OCO_LIGHTS_SET, ocoIndex: OCOIndex.AXO_START_LIGHTS,requestId: 2}))
  }
  if (lights === 25){
    lights = 0
  }
}, 1000);

insim.bind(PacketType.ISP_ISM , async (ism) => {
    insim.send(new IS_TINY({ subType: TinyType.TINY_NCN }));
    insim.send(new IS_TINY({ subType: TinyType.TINY_NCI }));
    insim.send(new IS_TINY({ subType: TinyType.TINY_MCI }));
})

var conn = new Object(); 
var player = new Object();


insim.bind(PacketType.ISP_MSO , async (mso) => {
    try{
        if(mso.userType != UserType.MSO_PREFIX) return;
        mensagem = mso.message
        mensagem = mensagem.substr(mso.textStart)
        comando = mensagem.split(" ")
        switch(comando[0]){
            case("!message"):
                insim.send(new IS_BTN ({ text: "", buttonStyle: ButtonStyles.ISB_DARK, height: 59, width: 100, top: 27, left: 52, clickId: 100, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7text test", buttonStyle: ButtonStyles.ISB_DARK, height: 20, width: 100, top: 27, left: 52, clickId: 102, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7click here to write", buttonStyle: ButtonStyles.ISB_CLICK, height: 20, width: 100, top: 46, left: 52, clickId: 103, uniqueId: mso.uniqueId, requestId: 2 , typeIn: 23 , caption: "write"})); //
                insim.send(new IS_BTN ({ text: "^8your text", buttonStyle: ButtonStyles.ISB_LEFT, height: 20, width: 100, top: 65, left: 52, clickId: 104, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7X", buttonStyle: ButtonStyles.ISB_CLICK, height: 23, width: 23, top: 27, left: 130, clickId: 105, uniqueId: mso.uniqueId, requestId: 2 })); //
               break
            case("!say"):
                if(conn[mso.uniqueId].adm){
                    insim.sendMessage(`/msg ^7${mensagem.substr(5)}`)
                    return;
                }
                else{
                    insim.send(new IS_MTC({
                        messageSound: MessageSound.SND_ERROR,
                        message: "^7you are not admin, and you cannot use this command",
                        uniqueId: mso.uniqueId,
                        requestId: 0
                    }))
                    return;
                }
            case("!data"):
                insim.send(new IS_BTN ({ text: "", buttonStyle: ButtonStyles.ISB_DARK, height: 140, width: 100, top: 21, left: 50, clickId: 29, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7your data", buttonStyle: ButtonStyles.ISB_DARK, height: 23, width: 100, top: 21, left: 50, clickId: 30, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7User: ^6" + conn[mso.uniqueId].Uname, buttonStyle: ButtonStyles.ISB_LEFT, height: 23, width: 100, top: 41, left: 50, clickId: 31, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7Name: ^6" + conn[mso.uniqueId].Pname, buttonStyle: ButtonStyles.ISB_LEFT, height: 23, width: 100, top: 56, left: 50, clickId: 32, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7language: ^6" + conn[mso.uniqueId].language, buttonStyle: ButtonStyles.ISB_LEFT, height: 23, width: 100, top: 74, left: 50, clickId: 33, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7uniqueId: ^6" + mso.uniqueId, buttonStyle: ButtonStyles.ISB_LEFT, height: 23, width: 100, top: 90, left: 50, clickId: 34, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7ipAddress: ^6" + conn[mso.uniqueId].ip, buttonStyle: ButtonStyles.ISB_LEFT, height: 23, width: 100, top: 107, left: 50, clickId: 35, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7total players: ^6" + totalplayers, buttonStyle: ButtonStyles.ISB_LEFT, height: 23, width: 100, top: 126, left: 50, clickId: 36, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7X", buttonStyle: ButtonStyles.ISB_CLICK, height: 23, width: 23, top: 21, left: 127, clickId: 37, uniqueId: mso.uniqueId, requestId: 2 })); //
                break;
            case("!commands"):
                insim.send(new IS_BTN ({ text: "", buttonStyle: ButtonStyles.ISB_DARK, height: 130, width: 100, top: 23, left: 50, clickId: 2, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7Commands", buttonStyle: ButtonStyles.ISB_DARK, height: 20, width: 100, top: 22, left: 50, clickId: 3, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7!say (your message)", buttonStyle: ButtonStyles.ISB_LEFT, height: 20, width: 100, top: 42, left: 50, clickId: 4, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7!commands", buttonStyle: ButtonStyles.ISB_LEFT, height: 20, width: 100, top: 62, left: 50, clickId: 5, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7!colors", buttonStyle: ButtonStyles.ISB_LEFT, height: 20, width: 100, top: 82, left: 50, clickId: 6, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7!data", buttonStyle: ButtonStyles.ISB_LEFT, height: 20, width: 100, top: 102, left: 50, clickId: 29, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7!message", buttonStyle: ButtonStyles.ISB_LEFT, height: 20, width: 100, top: 122, left: 50, clickId: 30, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7close", buttonStyle: ButtonStyles.ISB_DARK, height: 18, width: 22, top: 134, left: 128, clickId: 7, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "", buttonStyle: ButtonStyles.ISB_CLICK, height: 18, width: 22, top: 134, left: 128, clickId: 8, uniqueId: mso.uniqueId, requestId: 2 })); //click button for close
                break
            case("!colors"):
                insim.send(new IS_BTN ({ text: "^0<^1C^2O^3L^4O^5R^6S^7>", buttonStyle: ButtonStyles.ISB_DARK, height: 23, width: 100, top: 23, left: 50, clickId: 9, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7click on color", buttonStyle: ButtonStyles.ISB_C4, height: 23, width: 100, top: 43, left: 50, clickId: 10, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "", buttonStyle: ButtonStyles.ISB_DARK, height: 130, width: 100, top: 23, left: 50, clickId: 11, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^0Black", buttonStyle: ButtonStyles.ISB_DARK, height: 22, width: 29, top: 66, left: 50, clickId: 12, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^0Black", buttonStyle: ButtonStyles.ISB_CLICK, height: 22, width: 29, top: 66, left: 50, clickId: 13, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^1Red", buttonStyle: ButtonStyles.ISB_CLICK, height: 22, width: 29, top: 66, left: 121, clickId: 14, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^1Red", buttonStyle: ButtonStyles.ISB_DARK, height: 22, width: 29, top: 66, left: 121, clickId: 15, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^2Green", buttonStyle: ButtonStyles.ISB_CLICK, height: 22, width: 29, top: 131, left: 121, clickId: 16, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^2Green", buttonStyle: ButtonStyles.ISB_DARK, height: 22, width: 29, top: 131, left: 121, clickId: 17, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^3Yellow", buttonStyle: ButtonStyles.ISB_CLICK, height: 22, width: 29, top: 131, left: 50, clickId: 18, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^3Yellow", buttonStyle: ButtonStyles.ISB_DARK, height: 22, width: 29, top: 131, left: 50, clickId: 19, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^4Blue", buttonStyle: ButtonStyles.ISB_CLICK, height: 22, width: 29, top: 100, left: 50, clickId: 20, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^4Blue", buttonStyle: ButtonStyles.ISB_DARK, height: 22, width: 29, top: 100, left: 50, clickId: 21, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^5Pink", buttonStyle: ButtonStyles.ISB_CLICK, height: 22, width: 29, top: 100, left: 121, clickId: 22, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^5Pink", buttonStyle: ButtonStyles.ISB_DARK, height: 22, width: 29, top: 100, left: 121, clickId: 23, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^6Cyan", buttonStyle: ButtonStyles.ISB_CLICK, height: 22, width: 29, top: 82, left: 86, clickId: 24, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^6Cyan", buttonStyle: ButtonStyles.ISB_DARK, height: 22, width: 29, top: 82, left: 86, clickId: 25, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7White", buttonStyle: ButtonStyles.ISB_CLICK, height: 22, width: 29, top: 115, left: 86, clickId: 26, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7White", buttonStyle: ButtonStyles.ISB_DARK, height: 22, width: 29, top: 115, left: 86, clickId: 27, uniqueId: mso.uniqueId, requestId: 2 })); //
                insim.send(new IS_BTN ({ text: "^7X", buttonStyle: ButtonStyles.ISB_CLICK, height: 15, width: 15, top: 23, left: 135, clickId: 28, uniqueId: mso.uniqueId, requestId: 2 })); //
                break;
            default:
                insim.send(new IS_MTC({
                    messageSound: MessageSound.SND_ERROR,
                    message: "^7Command not found, use ^6!commands",
                    uniqueId: mso.uniqueId,
                    requestId: 0
                }))
        }
    }
    catch{
        insim.send(new IS_MTC({
            messageSound: MessageSound.SND_ERROR,
            message: "^7please log in and out of the server",
            uniqueId: mso.uniqueId,
            requestId: 0
        }))
    }
})

insim.bind(PacketType.ISP_NCN, async (ncn) => { 
    try{
        totalplayers = ncn.totalConnections - 1
        conn[ncn.uniqueId] ={
            Pname : ncn.playerName, 
            Uname : ncn.userName, 
            adm : ncn.admin,
            plid : 0,
            ip: 0,
            language: ""
        }
        console.log(`new connection Pname: ${ncn.playerName}`)
        console.log(`new connection Uname: ${ncn.userName}`)
        console.log(``)
        if(ncn.admin){
            insim.sendMessage(`/cansiren ${ncn.userName} 1`)
        }
    }
    catch{}
})

insim.bind(PacketType.ISP_NCI, async (nci) => { 
    try{
        conn[nci.uniqueId].ip = nci.ipAddress
        conn[nci.uniqueId].language = nci.language
    }
    catch{}
})

insim.bind(PacketType.ISP_CPR, async (cpr) => { 
    try{
        conn[cpr.uniqueId].Pname = cpr.playerName
    }
    catch{
        insim.send(new IS_MTC({
        messageSound: MessageSound.SND_ERROR,
        message: "^7please log in and out of the server",
        uniqueId: cpr.uniqueId,
        requestId: 0
    }))}
})


insim.bind(PacketType.ISP_NPL, async (npl) => {
    try{
        player[npl.playerId] ={
            car : npl.carName,
            plate : npl.plate,
            plid : npl.playerId,
            Pname : npl.playerName,
            Ucid : npl.uniqueId
        }
        conn[npl.uniqueId].plid = npl.playerId
    
        if(npl.carName == "BF1"){
            if(conn[npl.uniqueId].admin) return;
            insim.send( new IS_MTC({
                messageSound: MessageSound.SND_ERROR,
                message: "^6Voce não pode usar este carro ^7" + conn[npl.uniqueId].Pname,
                uniqueId: npl.uniqueId,
                requestId: 0
            }))
            insim.sendMessage(`/spec ${conn[npl.uniqueId].Uname}`)
        }
    }
    catch{
        insim.send(new IS_MTC({
            messageSound: MessageSound.SND_ERROR,
            message: "^7please log in and out of the server",
            uniqueId: npl.uniqueId,
            requestId: 0
        }))
    }
    
}) 

insim.bind(PacketType.ISP_CNL, async (cnl) => {
    try{
        totalplayers = cnl.totalConnections - 1
        console.log(`disconnection Pname: ${cnl[cnl.uniqueId].playerName}`)
        console.log(`disconnection Uname: ${conn[cnl.uniqueId].Uname}`)
        delete conn[cnl.uniqueId]
    }
    catch{}
}) 

insim.bind(PacketType.ISP_PLP, async (plp) => {
    try{
        delete player[plp.playerId]
    }
    catch{
        insim.send(new IS_MTC({
            messageSound: MessageSound.SND_ERROR,
            message: "^7please log in and out of the server",
            uniqueId: plp.uniqueId,
            requestId: 0
        }))
    }
}) 


insim.bind(PacketType.ISP_PLL, async (pll) => {
    try{
        delete player[pll.playerId]
    }
    catch{
        insim.send(new IS_MTC({
            messageSound: MessageSound.SND_ERROR,
            message: "^7please log in and out of the server",
            uniqueId: pll.uniqueId,
            requestId: 0
        }))
    }
}) 

insim.bind(PacketType.ISP_BTC, async (btc) => {
    try{
        switch(btc.clickId){
            case 105 :
                insim.send(new IS_BFN({ clickId: 100, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 101, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 102, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 103, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 104, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 105, uniqueId: btc.uniqueId}))  
            break;
            case 8 :
                insim.send(new IS_BFN({ clickId: 2, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 3, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 4, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 5, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 6, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 7, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 8, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 29, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 30, uniqueId: btc.uniqueId}))
            break;
            case 28 :
                insim.send(new IS_BFN({ clickId: 9, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 10, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 11, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 12, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 13, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 14, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 15, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 16, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 17, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 18, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 18, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 19, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 20, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 21, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 22, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 23, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 24, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 25, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 26, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 27, uniqueId: btc.uniqueId}))
                insim.send(new IS_BFN({ clickId: 28, uniqueId: btc.uniqueId}))
                break;
            case 13:
                insim.send(new IS_MTC({
                    messageSound: MessageSound.SND_INVALIDKEY,
                    message: "^0use ^^0 to write in this color",
                    uniqueId: btc.uniqueId,
                    requestId: 0
                }))
                break;
            case 14:
                insim.send(new IS_MTC({
                    messageSound: MessageSound.SND_INVALIDKEY,
                    message: "^1use ^^1 to write in this color",
                    uniqueId: btc.uniqueId,
                    requestId: 0
                }))
                break
            case 16:
                insim.send(new IS_MTC({
                    messageSound: MessageSound.SND_INVALIDKEY,
                    message: "^2use ^^2 to write in this color",
                    uniqueId: btc.uniqueId,
                    requestId: 0
                }))
                break;
            case 18:
                insim.send(new IS_MTC({
                    messageSound: MessageSound.SND_INVALIDKEY,
                    message: "^3use ^^3 to write in this color",
                    uniqueId: btc.uniqueId,
                    requestId: 0
                }))
                break;
            case 20:
                insim.send(new IS_MTC({
                    messageSound: MessageSound.SND_INVALIDKEY,
                    message: "^4use ^^4 to write in this color",
                    uniqueId: btc.uniqueId,
                    requestId: 0
                }))
                break;
            case 22:
                insim.send(new IS_MTC({
                    messageSound: MessageSound.SND_INVALIDKEY,
                    message: "^5use ^^5 to write in this color",
                    uniqueId: btc.uniqueId,
                    requestId: 0
                }))
                break;
            case 24:
                insim.send(new IS_MTC({
                    messageSound: MessageSound.SND_INVALIDKEY,
                    message: "^6use ^^6 to write in this color",
                    uniqueId: btc.uniqueId,
                    requestId: 0
                }))
                break;
            case 26:
                insim.send(new IS_MTC({
                    messageSound: MessageSound.SND_INVALIDKEY,
                    message: "^7use ^^7 to write in this color",
                    uniqueId: btc.uniqueId,
                    requestId: 0
                }))
                break;
        }
    }
    catch{
        insim.send(new IS_MTC({
            messageSound: MessageSound.SND_ERROR,
            message: "^7please log in and out of the server",
            uniqueId: btc.uniqueId,
            requestId: 0
        }))
    }
    
}) 

insim.bind(PacketType.ISP_BTT, async (btt) => {
    try{
        switch(btt.clickId){
            case 103 :
                insim.send(new IS_BFN({ clickId: 104, uniqueId: btt.uniqueId}))
                insim.send(new IS_BTN ({ text: btt.text, buttonStyle: ButtonStyles.ISB_LEFT, height: 20, width: 100, top: 65, left: 52, clickId: 104, uniqueId: btt.uniqueId, requestId: 2 })); //
            break;
        }
    }
    catch{
    }
    
})


var stdin = process.stdin;

stdin.on( 'data', function( key ){
    insim.sendMessage(key)
  });