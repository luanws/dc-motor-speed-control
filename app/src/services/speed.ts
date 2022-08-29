import firebase from 'firebase'

export namespace SpeedService {
    const database = () => firebase.database().ref('/')

    export async function setSpeed(speed: number): Promise<void> {
        await database().child('speed').set(speed)
    }

    export async function getRealSpeed(): Promise<number> {
        const snapshot = await database().child('real_speed').once('value')
        return snapshot.val()
    }

    export function listenRealSpeed(callback: (speed: number) => void) {
        const listener = database().child('real_speed').on('value', snapshot => callback(snapshot.val()))
        return {
            off: () => {
                database().off('value', listener)
            }
        }
    }
}