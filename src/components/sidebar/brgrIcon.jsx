// import React from 'react'
// import { useState } from 'react'
// import "./Navbar.css"


// const Bmenu = () => {
//   const [burger_class, setBurgerClass] = useState("burger-bar unclicked");
//   const [menu_class, setMenuClass] = useState("menu hidden");
//   var [isMenuClicked, setIsMenuClicked] = useState(false);

//   const updateMenu = () => {
//     if (!isMenuClicked){
//       setBurgerClass("burger-bar clicked")
//       setMenuClass("menu visible")
//     }

//     else {
//       setBurgerClass("burger-bar unclicked")
//       setMenuClass("menu hidden")
//     }
//     setIsMenuClicked(!isMenuClicked)
//   }

//   return (
//     <div className='brgr-menu' onClick={updateMenu}>
//       <div className={burger_class}></div>
//       <div className={burger_class}></div>
//       <div className={burger_class}></div>
//     </div>
//   )
// }

// export default Bmenu;