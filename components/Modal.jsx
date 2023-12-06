import React, { useState } from 'react'

function Modal() {

    const [modal,setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <div>
            <button onClick={toggleModal}>
                Mooodal
            </button>

            <div className='modal'>
                <div className='overlay'></div>
                <div className='modal-content'>
                    <p>Thankyou for chooosing Keebs!</p>
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quos consectetur praesentium reprehenderit nihil odit officia sed ad. Odio, quia earum! Voluptate officia quis veniam repellendus magni magnam in a ex, commodi aspernatur sunt? Iure nemo unde tempore qui, dolore autem quod dolores ducimus! Iste tempore fugit voluptatibus facilis obcaecati dicta?</p>
                </div>
                <button className='close-modal' onClick={toggleModal}>Close</button>
            </div>
        </div>
    )
}

export default Modal
