import React, { useState } from 'react'

export const CompletedTasks: React.FC = () => {
    const [closed, setClosed] = useState(false)
    return (
        <>
        {
            closed ?
            <div className="col r-col relative" id="collapseWidthExample">
                <button type="button" onClick={() => setClosed(prev => !prev)} className='btn btn-primary button-hide'>Hide</button>  
            </div>
            
            :
            <div className="button-show">
                <button type="button" onClick={() => setClosed(prev => !prev)} className='btn btn-primary position-fixed left-1'>Show</button>  
            </div>
        }
           </>     
        
    )
}