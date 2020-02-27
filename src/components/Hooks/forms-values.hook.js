import { useState } from "react"

export const useAuthorForm = initialState => {
    const [values, setValues] = useState(initialState)

    const updateValues = e => {
        e.persist()
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    return {
        values,
        updateValues,
        reset: () => setValues({}),
    }
}