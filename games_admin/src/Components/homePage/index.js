import { useState } from 'react'
import './index.css'

const HomePage = () => {
    const initialValues = {
        gameName: "", steamLink: "", releaseData: "", developer: "",
        publisher: "", gameTrailer: "", genere: "", ss1: "", ss2: "", ss3: "", ss4: ""
    }

    const [formValues, setFormValues] = useState(initialValues)
    const [formErrors, setFormErrors] = useState({})
    const [isSubmit, setIsSubmit] = useState(false)
    const [collection, setCollection] = useState("allGames")
    const [submission, setSubmission] = useState()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validateForm(formValues)
        setFormErrors(errors)
        setIsSubmit(true)
        console.log(isSubmit)

        if (Object.keys(errors).length === 0) {
            const finalData = {
                gameName: formValues.gameName,
                steamLink: formValues.steamLink,
                releaseData: formValues.releaseData,
                developer: formValues.developer,
                publisher: formValues.publisher,
                gameTrailer: formValues.gameTrailer,
                genere: formValues.genere.split(",").map(g => g.trim()),
                screenshots: [formValues.ss1, formValues.ss2, formValues.ss3, formValues.ss4]
            }

            fetch(`${process.env.REACT_APP_API_URL}/api/${collection}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('Success:', data)
                    setSubmission("Game submitted successfully!" )
                    setFormValues(initialValues)
                    setIsSubmit(false)
                    setFormErrors({})
                })
                .catch(e => {
                    console.error("Error:", e)
                    alert("Something went wrong!")
                })
        }
    }

    const validateForm = (values) => {
        const errors = {}
        if (!values.gameName) errors.gameName = "Game Name is required"
        if (!values.steamLink) errors.steamLink = "Steam Link is required"
        if (!values.releaseData) errors.releaseData = "Release Date is required"
        if (!values.developer) errors.developer = "Developer is required"
        if (!values.publisher) errors.publisher = "Publisher is required"
        if (!values.gameTrailer) errors.gameTrailer = "Game Trailer is required"
        if (!values.genere) errors.genere = "Genre is required"
        if (!values.ss1) errors.ss1 = "Screenshot 1 is required"
        if (!values.ss2) errors.ss2 = "Screenshot 2 is required"
        if (!values.ss3) errors.ss3 = "Screenshot 3 is required"
        if (!values.ss4) errors.ss4 = "Screenshot 4 is required"
        return errors
    }

    const inputFields = [
        { name: 'gameName', label: 'Game Name' },
        { name: 'steamLink', label: 'Steam Link' },
        { name: 'releaseData', label: 'Release Date' },
        { name: 'developer', label: 'Developer' },
        { name: 'publisher', label: 'Publisher' },
        { name: 'gameTrailer', label: 'Game Trailer' },
        { name: 'genere', label: 'Genre (comma-separated)' },
        { name: 'ss1', label: 'Screenshot 1 URL' },
        { name: 'ss2', label: 'Screenshot 2 URL' },
        { name: 'ss3', label: 'Screenshot 3 URL' },
        { name: 'ss4', label: 'Screenshot 4 URL' },
    ]

    return (
        <div className='hp-container'>
            <form className='form-container' onSubmit={handleSubmit}>
                <div className='heading-container'>
                    <h1>Admin Form</h1>
                </div>

                {/* Endpoint Selector */}
                <div className='label-input'>
                    <label>Collection</label>
                    <select value={collection} onChange={(e) => setCollection(e.target.value)}>
                        <option value="allGames">All Games</option>
                        <option value="upcoming">Upcoming</option>
                        <option value="newReleases">New Releases</option>
                        <option value="topRated">Top Rated</option>
                    </select>
                </div>

                {/* Inputs */}
                {inputFields.map(field => (
                    <div className='label-input' key={field.name}>
                        <label htmlFor={field.name}>{field.label}</label>
                        <input
                            id={field.name}
                            name={field.name}
                            type='text'
                            value={formValues[field.name]}
                            onChange={handleOnChange}
                        />
                        {formErrors[field.name] && <p className='error-msg'>{formErrors[field.name]}</p>}
                    </div>
                ))}

                <div className='btn-con'>
                    <button type="submit">Submit</button>
                </div>
                <p className='submission'>{submission}</p>
            </form>
        </div>
    )
}

export default HomePage
