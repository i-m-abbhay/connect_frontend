import React from 'react';
import {Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const Navbar = ({searchTerm, setsearchTerm, user}) => {
  const navigate = useNavigate();

  if(!user) return null;

  return (
    <div
    className='flex'
    >Navbar</div>
  )
}

export default Navbar