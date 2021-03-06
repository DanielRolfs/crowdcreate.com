import { useParams } from "react-router-dom"
import { db } from "../../.firebase.config"
import { useState, useEffect } from "react"

import {
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    addDoc,
    deleteDoc
} from "firebase/firestore"

function Tasks() {
    const { id } = useParams()
    const [tasks, setTasks] = useState([])

    const tasksCollectionRef = collection(db, "tasks")
     useEffect(() => {
        console.log("id",id)
         const q = query(tasksCollectionRef, where("project", "==", id))

         const unsub = onSnapshot(q, snapshot => {
             setTasks(snapshot.docs.map(doc => {
                 return {
                     id: doc.id,
                     viewing: false,
                     ...doc.data()
                 }
             }))
     
        return unsub;
     
        /*   onSnapshot(tasksCollectionRef, snapshot => {
            setTasks(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    viewing: false,
                    ...doc.data()
                }
            })) */
        })
    }, []) 

   
    

    return (
        <div>
            {id}
            <div>
                { tasks.map((task, i) => (
                    <div div > { task.taskName } </div>

                ))}
            </div>

        </div>

    );
}

export default Tasks;
