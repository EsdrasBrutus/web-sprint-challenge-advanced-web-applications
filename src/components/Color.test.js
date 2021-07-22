import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Color from './Color';

test("Renders without errors with blank color passed into component", () => {
    render(<Color color={{color: "", code: {hex: ""}, id: 0}} />)
});
  
test("Renders the color passed into component", () => {
    render(<Color color={{color: "aqua", code: {hex: "#f0f8ff"}, id: 3}} />)

    expect(screen.getByText(/aqua/i)).toBeInTheDocument();
});

test("Executes handleDelete and toggleEdit property when the 'x' icon is clicked", () => {
    const mockDelete =jest.fn(() => {return 'delete'})
    const mockToggle =jest.fn(()=>{ return 'toggle'})

    const { getByTestId } = render(<Color color={{color: "aqua", code: {hex: "#f0f8ff"}, id: 3}} 
                  toggleEdit={mockToggle} deleteColor={mockDelete}/>)
    
    const button = getByTestId(/delete/i); 
 
    fireEvent.click(button) 

    expect(mockDelete).toHaveBeenCalled();
    expect(mockToggle).toHaveBeenCalled();


 

});

test("Executes setEditColor and toggleEdit property when color div is clicked", () => {
    const mockEdit = jest.fn(()=> {return 'edit'})
    const mockToggle =jest.fn(()=>{ return 'toggle'})

    const { getByTestId } = render(<Color color={{color: "aqua", code: {hex: "#f0f8ff"}, id: 3}}
                          toggleEdit={mockToggle}  setEditColor={mockEdit}/>)


    const button = getByTestId(/color/i);

    fireEvent.click(button) 

    expect(mockEdit).toHaveBeenCalled();
    expect(mockToggle).toHaveBeenCalled();
    
});