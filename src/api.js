import { initializeApp } from "firebase/app";
import { getFirestore,
        collection, 
        getDocs, 
        doc, 
        getDoc,
        setDoc,
        query,
        where } from "@firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCT8tdkPsuh7aScUguoKWy7p7oyf4zrpYs",
    authDomain: "e-commerce-app-19245.firebaseapp.com",
    projectId: "e-commerce-app-19245",
    storageBucket: "e-commerce-app-19245.appspot.com",
    messagingSenderId: "633562208870",
    appId: "1:633562208870:web:f766186b7140979746aba7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

const vansCollectionRef = collection(db, "glass")

export async function getGlasses(){
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArray = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArray
}

export async function getGlass(id) {
    const docRef = doc(db, "glass", id)
    const vanSnapshot = await getDoc(docRef)
    return {
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}


const vansCollectionRef2 = collection(db, "user")

export async function loginUser() {
    const querySnapshot = await getDocs(vansCollectionRef2)
    const dataArray = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArray
}


