import React, { useState } from 'react'

/**{
	"accountNumber": 3,
	"currency": "dolar",
	"balance": "750",
	"user":   {
	    "id": 2,
	    "username": "ch4rl13",
	    "password": "123",
	    "name": "Carlos",
	    "lastname": "Alvarado S",
	    "email": "carlos@gmail.com",
	    "phone": "84848484",
	    "date": "26/02/2020",
	    "address": "150 mtrs norte Sanatorio",
	    "messages": [],
	    "accounts": []
	},
    "movements": null
} */

const AddAccountComponent = ({ func }) => {
	const [options, setOptions] = useState({
		currency: "dolar",
		entity: "MASTERCARD"
	})

	const onSubmitForm = e => {
		e.preventDefault()
		let validate = validateForm(e)

		if (validate) {
			func(options)
		} else return 0
	}

	const validateForm = e => {
		var form = document.querySelector('.needs-validation');

		if (form.checkValidity() === false) {
			e.stopPropagation()
			form.classList.add('was-validated')
			return false
		}
		return true
	}

	const handleChange = e => {
		setOptions({ ...options, [e.target.name]: e.target.value })
	}

	return (
		<div className="card">
			<h5 className="card-header">
				<button type="button" className="close" data-dismiss="modal" aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				Adding Account Form
			</h5>
			<div className="card-body">
				<form className="needs-validation" noValidate>

					<div className="form-group">
						<div className="input-group">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectCurrency">Currency</label>
							<select className="custom-select my-1 mr-sm-2" name="currency" id="inlineFormCustomSelectCurrency" onChange={e => handleChange(e)} value={options.currency}>
								<option value="dolar">dolar</option>
								<option value="colon">colon</option>
							</select>
						</div>
					</div>

					<div className="form-group">
						<div className="input-group">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectEntity">Entity</label>
							<select className="custom-select my-1 mr-sm-2" name="entity" id="inlineFormCustomSelectEntity" onChange={e => handleChange(e)} value={options.entity}>
								<option value="MASTERCARD">MASTERCARD</option>
								<option value="VISA">VISA</option>
							</select>
						</div>
					</div>
				</form>
			</div>
			<div className="card-footer">
				<button id="login-button" type="button" className="button btn btn-primary" data-dismiss="modal" onClick={e => onSubmitForm(e)}><span>Add</span></button>
			</div>
		</div>
	)
}

export default AddAccountComponent