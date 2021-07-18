import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../helpers/axiosWithAuth";
import { fetchColorService } from '../services/fetchColorService';

const BubblePage = () => {
  const [colors, setColors] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(()=>{ 
    fetchColorService()
    .then(res => setColors(res))
    .catch(err =>console.log(err));;
  }, [])


  const toggleEdit = (value) => {
    setEditing(value);
  };

  const saveEdit = (editColor) => {
    //editColor.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/colors/${editColor.id}`, editColor)
    .then(res=>{
      console.log(res.data)
      setColors(colors.map(color => {
        if(color.id === Number(res.data.id)){
          return res.data;
        }
        else{
          return color;
        }
      }))
    })
    .catch(err =>console.log(err));
  };

  const deleteColor = (colorToDelete) => {
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${colorToDelete.id}`)
      .then(res =>{
        const colorArr = colors.filter(item => `${item.id}` != Number(colorToDelete.id));
        setColors(colorArr);
      })
  };

  return (
    <div className="container">
      <ColorList colors={colors} editing={editing} toggleEdit={toggleEdit} saveEdit={saveEdit} deleteColor={deleteColor}/>
      <Bubbles colors={colors}/>
    </div>
  );
};

export default BubblePage;

//Task List:
//1. When the component mounts, make an axios call to retrieve all color data and push to state.
//2. Complete toggleEdit, saveEdit, deleteColor and functions
