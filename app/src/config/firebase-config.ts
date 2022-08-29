import firebase from 'firebase'
import { firebaseConfig } from '../../config.json'
import Config from './config'

export default class FirebaseConfig implements Config {
    configure() {
        if (firebase.apps.length == 0) {
            firebase.initializeApp(firebaseConfig)
        }
    }
}
