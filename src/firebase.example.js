import app from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "abcdef123456",
    databaseURL: "abcdef123456",
    projectId: "abcdef123456",
    storageBucket: "abcdef123456",
    messagingSenderId: "abcdef123456",
    appId: "1:abcdef123456:web:abcdef123456",
    measurementId: "G-abcdef123456"
}

class Firebase {
    constructor() {
        // Inicia o firebase
        app.initializeApp(firebaseConfig)

        //referenciando a database para acessar em outros locais
        this.app = app.database()
        this.auth = app.auth()
        this.storage = app.storage()
    }

    // Efetua login com email e senha
    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }

    // Efetua o logout
    logout() {
        return app.auth().signOut()
    }

    // Cadastra novo usuário no auth e cria no banco de dados usando o uid do auth como chave primária
    async cadastrar(nome, email, senha) {
        await app.auth().createUserWithEmailAndPassword(email, senha)

        const uid = app.auth().currentUser.uid

        return app.database().ref('usuarios').child(uid).set({
            nome: nome,
            email: email
        })
    }

    // Verifica se ja esta conectado ao firebase
    isInitialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve)
        })
    }

    // Verifica se tem user online, caso verdadeiro, retorna o email do mesmo
    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email
    }

    // Retorna o uid do uusário conectado/logado
    getCurrentUid() {
        return app.auth().currentUser && app.auth().currentUser.uid
    }

    // retorna o username que estiver logado
    async getUserName(callback) {
        if (!app.auth().currentUser) {
            return null
        }

        const uid = app.auth().currentUser.uid

        await app.database().ref('usuarios').child(uid).once('value').then(callback)
    }
}

export default new Firebase()