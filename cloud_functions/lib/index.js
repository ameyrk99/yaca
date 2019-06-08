"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const expo_server_sdk_1 = require("expo-server-sdk");
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});
exports.sendNotification = functions.https.onRequest((request, response) => __awaiter(this, void 0, void 0, function* () {
    let expo = new expo_server_sdk_1.default();
    let today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    try {
        let tokens = [];
        let messages = [];
        yield admin.database().ref('/users').once('value', (snapshot) => {
            snapshot.forEach((childsnapshot) => {
                let expoToken = childsnapshot.child('pushToken').val();
                let notifcations = childsnapshot.child('notifications').val();
                if (expoToken && notifcations) {
                    /* If has a expo token and has notification turned on */
                    tokens.push(expoToken);
                    if (childsnapshot.hasChild('events')) {
                        let events = childsnapshot.child('events');
                        let arr = [];
                        events.forEach((childsnapshot) => {
                            /* For each event check for tomorrow's date */
                            const date_now = childsnapshot.child('date').val();
                            if (date_now === tomorrow.toISOString().split('T')[0]) {
                                arr.push(childsnapshot.child('key').val() + ': ' + childsnapshot.child('text').val());
                            }
                        });
                        if (arr.length === 0) {
                            /* If there is no event for next day */
                            messages.push('No events ;)');
                        }
                        else {
                            messages.push(arr.join('\r\n'));
                        }
                    }
                }
            });
        })
            .then(() => __awaiter(this, void 0, void 0, function* () {
            for (let i in tokens) {
                /* Once tokens and messages loaded, push notifications */
                yield expo.sendPushNotificationsAsync([{
                        to: tokens[i],
                        sound: 'default',
                        title: 'Tomorrow\'s events',
                        body: messages[i]
                    }])
                    .then(() => {
                    console.log('Push succesful');
                })
                    .catch((error) => {
                    console.log('Push unsuccesful: ', error);
                });
            }
        }))
            .catch((error) => {
            console.log('Database: ', error);
        });
        return response.status(200).send('Job Complete');
    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
}));
// const loadUsers = async () => {
//     let dbRef = admin.database().ref('/users')
//     let defer = new Promise<object>((resolve, reject) => {
//         dbRef.once('value', (snap) => {
//             let data = snap.val()
//             let users = []
//             for (let property in data) {
//                 users.push(data[property])
//             }
//             resolve(users)
//         })
//     })
//     return defer
// }
//# sourceMappingURL=index.js.map
