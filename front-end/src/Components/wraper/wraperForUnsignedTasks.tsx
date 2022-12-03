import React, { useState } from 'react'

export interface taskInterface {
       date: String,
       TimeItTook: String,
       IsPermanent: boolean,
       id: String,
       shouldTake: number,
       type: String
       private: boolean
       worker: String | null
}

export const WraperForUnsignedTasks: React.FC<{task: taskInterface, close: React.Dispatch<React.SetStateAction<boolean>>}> = ({task, close}) => {
    const [data, setData] = useState<taskInterface>(task);
    const saveData = () => {

    }
    return (
        <article className='wrapper'>
            <form onSubmit={(e) => e.preventDefault()} className='wrapper-editor'>
                <input type="number" value={data.shouldTake} style={{width: "10%"}} onChange={(e) => setData({...data, shouldTake: parseInt(e.target.value)})} />
                <input type="text" style={{width: "70%"}} value={data.type as string} onChange={(e) => setData({...data, type: e.target.value})} />
                <section style={{width: "87%"}}>
                    <button style={{width: "30%"}} onClick={ () => close(false) }>Add to your callendar?</button>
                </section>
                <button style={{width: "25%"}} onClick={ () => close(false) }>Close</button>
                <button style={{width: "25%"}}>Save</button>
                <button style={{width: "25%"}}>AddToExecute</button>
            </form>
        </article>
    )
}