import { useState } from "react"

export const useAuthorForm = initialState => {
    const [values, setValues] = useState(initialState)

    const updateValues = e => {
        e.persist()
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const setItem = value => setValues({ ...values, value })

    return {
        values,
        updateValues,
        setItem,
        reset: () => setValues({}),
    }
}