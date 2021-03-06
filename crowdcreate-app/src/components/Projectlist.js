import { Route, Routes, Link } from "react-router-dom"
import MainNavigate from "./MainNavigate";
import MainHeader from "./Elements/mainHeader";

import { db, storage } from "../.firebase.config"
import { useState, useEffect } from "react"
import { 
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc
} from "firebase/firestore"

import { ref, uploadBytes } from "firebase/storage"
import { v4 } from "uuid"



function ProjectList() {
  
  const favorProject = id => {
    /* const path = document.querySelector('#heart path');
    console.log(path.getTotalLength()); */

    const heart = document.getElementById('heart');

    /* const likeUnlikePost = function () { */
      if (heart.classList.contains('like')) {
        heart.classList.remove('like');
        heart.classList.add('unlike');
      } else {
        heart.classList.remove('unlike');
        heart.classList.add('like');
      }
   /*  } */
  }

    const [projects, setProjects] = useState([])
    const [form, setForm] = useState({
      title: "",
      shortDescription: "",
      category: []
    })
    const [createProjectActive, setCreateProjectActive] = useState(false)

    const projectsCollectionRef = collection(db, "projects")

    useEffect(() => {
      onSnapshot(projectsCollectionRef, snapshot => {
        setProjects(snapshot.docs.map(doc => {
          return {
            id: doc.id,
            viewing: false,
            ...doc.data()
          }
        }))
      })
    }, [])

    const handleSubmit = e => {
      e.preventDefault()

      if (
        !form.title ||
        !form.shortDescription
      ) {
        alert("Please fill out all fields")
        return
      }

      addDoc(projectsCollectionRef, form)

      setForm({
        title: "",
        shortDescription: "",
        category: ""
      })

      setCreateProjectActive(false)
    }

    /* const handleCategory = (e, i) => {
      const categoryClone = [...form.category]

      categoryClone[i] = e.target.vl

      setForm({
        ...form,
        category: categoryClone
      })
    }

    const handleCategoryCount = () => {
      setForm({
        ...form, 
        category: [...form.category, ""]})
    }
 */
    const removeProject = id => {
      deleteDoc(doc(db, "projects", id))
    }


    const [imageUpload, setImageUpload] = useState(null, "images")
    const uploadImage = () => {
        if (imageUpload == null) return;
        const imageRef = ref(storage, `projectsImages/${imageUpload.name + v4()}`)
        uploadImage(imageRef, imageUpload).then(() => {
          alert("image upload successful")
        })
    }





    return (
      <div className="ProjectList w-full h-full flex flex-col">
         
        {/* Head Area */} 
        <MainHeader headline="Project List">
          <div className=" w-12 text-2xl absolute left-0">
            
          </div>
          <div className=" w-12 text-2xl absolute right-0">
            <button onClick={() => setCreateProjectActive(!createProjectActive)} className="">+</button>
          </div>
        </MainHeader>
          
        {/* Main Area */}
        <div className="mainArea flex-auto mx-2 overflow-auto">
          
          {/* Project List */}
          <div className="projects py-2">
            { projects.map((project, i) => (

                /* Project */
                <div key={project.id} className="project flex flex-col rounded-lg shadow-md overflow-hidden mb-4">
                  
                  <div className="flex flex-shrink-0 h-48 w-full justify-between items-start p-4 bg-cover bg-[url('https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80')]">
                      <button className="removeProject text-white" onClick={() => removeProject(project.id)}>X</button>
                      <button className="removeProject">
                    <svg id="heart" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" onClick={() => favorProject(project.id)} /*fill="none" */ viewBox="0 0 24 24" /* stroke="currentColor" */ stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                  </div>
                  <Link to={`/project/${project.id}`} state={project}>
                    <div className="flex-1 bg-white p-2 flex flex-col justify-between">
                      <div className="flex-1">

                          <p className="text-2xl font-semibold text-gray-900">{project.title}</p>
                          <p className="text-lg text-gray-900">{project.shortDescription}</p>
                          {/* <ul>
                            { project.category.map((category, i) => (
                              <li key={1}>{ category }</li>
                            ))}
                          </ul> */}

                      </div>
                  </div>
                  </Link>
                    
                  
                </div>
            ))}
          </div>
         
        </div>

        {/* Navigation Area */}
        <div>
          <Routes>
            <Route path="" element={<MainNavigate/>} />
          </Routes>
        </div>
        
        {/* Create Project Popup */}
        {createProjectActive && <div className="createProjectPopup w-screen h-screen sm:w-[390px] sm:h-[844px] fixed bg-white">
            <div className="popup-inner">
              <div className="header h-14 border-b-2 flex items-center flex justify-end">
                <h1 className="flex-auto text-3xl">Create Project</h1>
                <div className="fixed w-12 text-lg">
                <button type="button" onClick={() => setCreateProjectActive(false)}>X</button>
                </div>
              </div>

              
                
                <div>
                   <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>
                   <button onClick={uploadImage}>Upload image</button>
                </div>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Title</label>
                  <input 
                    type="text"
                    value={form.title}
                    onChange={e => setForm({...form, title: e.target.value})} 
                    className="border-2"
                  />
                </div>

              <div className="form-group">
                <label>Short Description</label>
                <textarea
                  type="text"
                  value={form.shortDescription}
                  onChange={e => setForm({ ...form, shortDescription: e.target.value })}
                  className="border-2"
                />
              </div>

              <div className="form-group">
                <label>Long Description</label>
                <textarea
                  type="text"
                  value={form.longDescription}
                  onChange={e => setForm({ ...form, longDescription: e.target.value })}
                  className="border-2"
                />
              </div>

{/*               <div className="form-group">
                <label>Categorys</label>
                {
                  form.category.map((category, i) => (
                    <input
                      type="text"
                      key={i}
                      value={category}
                      onChange={e => handleCategory(e, i)} 
                      className="border-2"
                    />
                  ))
                }
                <button type="button" onClick={handleCategoryCount}>Add Category</button>
              </div> */}

              <div className="buttons">
                <button type="submit">Submit</button>
                {/* <button type="button" onClick={() => setCreateProjectActive(false)}>Close</button> */}
              </div>

              </form>

            </div>
        </div>}

      </div>
    );
  }
  
  export default ProjectList;
  