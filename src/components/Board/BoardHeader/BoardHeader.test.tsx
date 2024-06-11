import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import BoardHeader from './BoardHeader';


describe("Board Header", ()=>{
    it("renders board title", ()=>{
        render(<BoardHeader boardTitle="Board Title"/>)
        screen.debug()
    })
})

