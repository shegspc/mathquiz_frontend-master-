import { Link} from "react-router-dom";
import "./menu.css";



const Menu = () => {


    return(
        <div className="menuTray">
            <h1>Menu</h1>
            <div className="menu">
                <Link to ="/multiplication">
                    Multiplication Game
                </Link>
            </div>
        
           <div className="menu">
               <Link to ="/arithmeticLevelOne">
                   Arithmetic Level One
               </Link>
            </div>
            <div className="menu">
               <Link to ="/arithmeticLevelTwo">
                   Arithmetic Level Two
               </Link>
            </div>
          
           
        </div>
    )
}

export default Menu