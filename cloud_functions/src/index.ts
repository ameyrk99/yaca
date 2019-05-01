import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Expo from 'expo-server-sdk'

admin.initializeApp(functions.config().firebase)

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

export const sendNotification = functions.https.onRequest(async (request, response) => {
    let expo = new Expo()

    let today = new Date()
    let tomorrow = new Date()
    tomorrow.setDate(today.getDate()+1)

    try {

        let tokens: string[] = []
        let messages: string[] = []
        await admin.database().ref('/users').once('value', (snapshot) => {
            snapshot.forEach((childsnapshot) => {
                let expoToken = childsnapshot.child('pushToken').val()
                let notifcations = childsnapshot.child('notifications').val()
                if (expoToken && notifcations) {
                    /* If has a expo token and has notification turned on */
                    tokens.push(expoToken)
                    if (childsnapshot.hasChild('events')) {
                        let events = childsnapshot.child('events')
                        let arr: string[] = []
                        events.forEach((childsnapshot) => {
                            /* For each event check for tomorrow's date */
                            const date_now = childsnapshot.child('date').val()
                            if (date_now === tomorrow.toISOString().split('T')[0]) {
                                arr.push(childsnapshot.child('key').val() + ': ' + childsnapshot.child('text').val())
                            }
                        })
                        if (arr.length === 0) {
                            /* If there is no event for next day */
                            messages.push('No events ;)')
                        } else {
                            messages.push(arr.join('\r\n'))
                        }
                    }
                }
            })
        })
            .then(async () => {
                for (let i in tokens) {
                    /* Once tokens and messages loaded, push notifications */
                    await expo.sendPushNotificationsAsync([{
                        to: tokens[i],
                        sound: 'default',
                        title: 'Tomorrow\'s events',
                        body: messages[i]
                    }])
                        .then(() => {
                            console.log('Push succesful')
                        })
                        .catch((error) => {
                            console.log('Push unsuccesful: ', error)
                        })
                }
            })
            .catch((error) => {
                console.log('Database: ', error)
            })

        return response.status(200).send('Job Complete')
    } catch (error) {
        return response.status(500).json({ error: error })
    }
})

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