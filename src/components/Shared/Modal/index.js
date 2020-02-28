import React from 'react'

const ModalComponent = ({ buttonName, func, Children }) => {
    return (
        <div>
            <button type="button" className="btn btn-outline-primary btn-block" data-toggle="modal" data-target="#exampleModalCenter">
                {buttonName}
            </button>

            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <Children func={func} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent