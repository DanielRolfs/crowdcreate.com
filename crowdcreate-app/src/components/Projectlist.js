import { Route, Routes } from "react-router-dom"

import MainNavigate from "./MainNavigate";



function ProjectList() {
    return (
      <div className="ProjectList">
        Projectlist

        <Routes>
          <Route path="" element={<MainNavigate/>} />
        </Routes>
        
      </div>
      
    );
  }
  
  export default ProjectList;
  