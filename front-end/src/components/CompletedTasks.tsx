import React, { useState } from 'react'

interface CompletedTasksInterface {
    toggle: () => void
}

export const CompletedTasks: React.FC<CompletedTasksInterface> = ({toggle}) => {
    const handleBtn = () => {
        toggle()
    }
    return (
        <>
            <div className="col r-col relative" id="collapseWidthExample">
                <button 
                    type="button" 
                    onClick={handleBtn} 
                    className='btn btn-primary'>
                        Hide
                    </button>  

            </div>
           </>     
        
    )
}