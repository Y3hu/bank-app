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
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <Children login={func} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalComponent