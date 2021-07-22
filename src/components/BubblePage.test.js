import React from 'react';
import MutationObserver from 'mutationobserver-shim';

import { render, screen, waitFor} from "@testing-library/react";
import BubblePage from './BubblePage';
import { fetchColorService as mockFetch } from '../services/fetchColorService.js';

jest.mock('../services/fetchColorService.js')

test("Renders without errors", ()=> {
  mockFetch.mockResolvedValueOnce({data: []})
    render(<BubblePage />);
}); 

test("Renders appropriate number of colors passed in through mock", async ()=> {
    mockFetch.mockResolvedValueOnce([ 
        {color: "aqua", code: {hex: "#f0f8ff"}, id: 1},
        {color: "blue", code: {hex: "#f0f8ff"}, id: 2},
        {color: "yellow", code: {hex: "#f0f8ff"}, id: 3}
      ]
    );

    //Keep in mind that our service is called on mount for this component.
    render(<BubblePage />)  

    expect(await screen.findAllByTestId(/color/i)).toHaveLength(3)  
    
    await waitFor(()=> {  
      
    }) 
   screen.debug();
  
});  