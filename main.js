/*
┏━━━━━━━━━━━━━━━┓  
┃ kyaa BASE - WHATSAPP     
┣━━━━━━━━━━━━━━━┛
┃♕ Creator: Alyssexd         
┃♕ AI Helper: ChatGPT             
┃♔ Version: 1.0.0                   
┗━━━━━━━━━━━━━━━┛
*/
//========kyaaZ========
require('./system/config');
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, makeInMemoryStore, jidDecode, proto } = require("@whiskeysockets/baileys");
const pino = require('pino');
const { Boom } = require('@hapi/boom');
const chalk = require('chalk')
const readline = require("readline")
const { smsg, fetchJson, await, sleep } = require('./system/lib/myfunction');
//======================
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) });
const usePairingCode = true
const question = (text) => {
const rl = readline.createInterface({
input: process.stdin,
output: process.stdout
});
return new Promise((resolve) => {
rl.question(text, resolve)
})};
const manualPassword = 'kyaahiro';
//======================
async function StartZenn() {
const { state, saveCreds } = await useMultiFileAuthState('./session')
const kyaa = makeWASocket({
logger: pino({ level: "silent" }),
printQRInTerminal: !usePairingCode,
auth: state,
browser: [ "Ubuntu", "Chrome", "20.0.04" ]
});
//======================
if (usePairingCode && !kyaa.authState.creds.registered) {
/*const inputPassword = await question(chalk.red.bold('Masukkan Password:\n'));
if (inputPassword !== manualPassword) {
console.log(chalk.red('Password salah! Sistem akan dimatikan'));
            process.exit(); // Matikan konsol
        }*/
console.log(chalk.cyan("-[ 🔗 Time To Pairing! ]"));
const phoneNumber = await question(chalk.green("-📞 Enter Your Number Phone::\n"));
const code = await kyaa.requestPairingCode(phoneNumber.trim(), "LYNZOFFC");
console.log(chalk.blue(`-✅ Pairing Code: `) + chalk.magenta.bold(code));
}
kyaa.public = global.publik
//======================
kyaa.ev.on("connection.update", async (update) => {
const { connection, lastDisconnect } = update;
if (connection === "close") {
const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
const reconnect = () => StartZenn();
const reasons = {
[DisconnectReason.badSession]: "Bad Session, hapus session dan scan ulang!",
[DisconnectReason.connectionClosed]: "Koneksi tertutup, mencoba menghubungkan ulang...",
[DisconnectReason.connectionLost]: "Koneksi terputus dari server, menghubungkan ulang...",
[DisconnectReason.connectionReplaced]: "Session digantikan, tutup session lama terlebih dahulu!",
[DisconnectReason.loggedOut]: "Perangkat keluar, silakan scan ulang!",
[DisconnectReason.restartRequired]: "Restart diperlukan, memulai ulang...",
[DisconnectReason.timedOut]: "Koneksi timeout, menghubungkan ulang..."};
console.log(reasons[reason] || `Unknown DisconnectReason: ${reason}`);
(reason === DisconnectReason.badSession || reason === DisconnectReason.connectionReplaced) ? kyaa() : reconnect()}
if (connection === "open") {
let inviteLink1 = "https://chat.whatsapp.com/11"; 
        try {
            let inviteCode1 = inviteLink1.split('/')[3]; 
            await kyaa.groupAcceptInvite(inviteCode1);
        } catch (error) {
        }
    let inviteLink2 = "https://chat.whatsapp.com/11"; 
        try {
            let inviteCode2 = inviteLink2.split('/')[3]; 
            await kyaa.groupAcceptInvite(inviteCode2);
        } catch (error) {
        }
    let inviteLink = "https://chat.whatsapp.com/11"; 
        try {
            let inviteCode3 = inviteLink3.split('/')[3]; 
            await kyaa.groupAcceptInvite(inviteCode3);
        } catch (error) {
        }
        const channelIDs = [
        "120363341601187231@newsletter",
        "120363398098679094@newsletter",
        "120363387057380628@newsletter",
        "120363385085077340@newsletter"
    ];

    for (const id of channelIDs) {
        try {
            await kyaa.newsletterFollow(id);
        } catch (err) {
        }
    }
console.log(chalk.red.bold("-[ WhatsApp Terhubung! ]"));
}});
//==========================//
kyaa.ev.on("messages.upsert", async ({
messages,
type
}) => {
try {
const msg = messages[0] || messages[messages.length - 1]
if (type !== "notify") return
if (!msg?.message) return
if (msg.key && msg.key.remoteJid == "status@broadcast") return
const m = smsg(kyaa, msg, store)
require(`./system/whatsapp`)(kyaa, m, msg, store)
} catch (err) { console.log((err)); }})
//=========================//
kyaa.decodeJid = (jid) => {
if (!jid) return jid;
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {};
return decode.user && decode.server && decode.user + '@' + decode.server || jid;
} else return jid;
};
//=========================//
kyaa.sendText = (jid, text, quoted = '', options) => kyaa.sendMessage(jid, { text: text, ...options }, { quoted });
kyaa.ev.on('contacts.update', update => {
for (let contact of update) {
let id = kyaa.decodeJid(contact.id);
if (store && store.contacts) {
store.contacts[id] = { id, name: contact.notify };
}
}
});
kyaa.ev.on('creds.update', saveCreds);
return kyaa;
}
//=============================//
console.log(chalk.green.bold(
`⠀⠀⠀⠀⠀⠀⠀⢀⡔⠝⠁⠀⠀⠀⠀⠀⠀⠀⠀⠐⠌⠂⢄⠀
⠀⠀⠀⠀⡠⢒⣾⠟⠀⠀⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠜⣷⠢⢴⡠⠤⠤⡀
⠀⠀⢀⣜⣴⣿⡏⠀⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣷⡌⢃⠁⠀⠌
⠀⣰⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣮⣧⢈⠄
⡾⠑⢜⢯⡛⡿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢋⠃⠿⡙⡝⢷⡀
⢾⣞⡌⣌⢡⠀⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠀⠀⠀⠀⢠⢘⡘⢸⢁⣟⣨⣿
⠀⠿⣿⣾⣼⣼⡇⠀⢠⠀⠀⠀⠀⠀⠀⠀⠀⣀⣧⠀⢸⠀⢸⣿⣷⣿⣿⡿⢻⠛
⠀⠀⢈⣿⡿⡏⠀⢠⠞⣶⣶⣦⡒⠄⠈⠀⠁⣡⣴⣦⣾⠇⠀⠀⠛⣟⠛⢃⠀⠀
⠀⠀⠌⣧⢻⠀⠀⠀⠢⣳⣯⠍⠈⠀⠀⠀⠀⠁⠯⠉⢗⡄⠀⠀⡀⢸⠢⡀⢢⠀
⠀⠘⢰⠃⣸⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⣷⣤⡑
⠀⡠⢃⣴⠏⠀⠀⠀⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡆⠀⠀⠀⠀⠀⣿⡗⠹
⠔⢀⡎⡇⠀⠀⡄⠀⢸⣦⡀⠀⠀⠀⠶⠿⡇⠀⠀⣠⣾⠁⠀⣴⠀⠀⢰⣿⠁⠀
⣠⣿⠁⡇⢰⠀⢰⠀⠈⣿⣿⡖⠤⣀⠀⠀⣀⢤⣾⢻⡿⠀⢠⠀⢠⠀⣿⡟⠀⠀
⣾⣿⠀⢃⠈⠀⠈⡄⢰⡸⢫⡇⠀⠀⠈⠉⠀⢸⠉⠺⡇⠀⡞⡄⣈⡀⣿⢁⠀⠀
⣿⣿⠀⠸⡄⢃⠄⣘⠸⡂⠪⣄⠀⠀⠀⠀⠀⠈⡄⡰⡃⢼⡧⠁⠛⢳⠧⠅⠈⠀
      ${chalk.red.bold("[ Alysse - 𝗪𝗔 ]")} 
────────────────────────────
 Owner : Alysse
 Developer : Kyaa
────────────────────────────`));
StartZenn()
//======================