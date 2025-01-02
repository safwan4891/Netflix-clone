import React, { useContext } from 'react'; // Import useContext
import './Header.css';
import { UserContext } from '../../Context/UserContext'; // Import UserContext

export const Header = () => {
  const { user } = useContext(UserContext); // Access user data from context

  return (
    <div className='Header'>
      <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png" alt="Netflix Logo" />
      <p>Welcome, {user.name}</p> {/* Display user's name */}
      <img className='avatar' src='https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png' alt="Avatar" />
    </div>
  );
};


