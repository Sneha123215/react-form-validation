import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormPage.css';


const countriesCities = {
    India: ['Mumbai', 'Delhi', 'Bangalore'],
    USA: ['New York', 'Los Angeles', 'Chicago'],
    UK: ['London', 'Manchester', 'Liverpool']
};

const FormPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        phoneCode: '+91',
        phoneNumber: '',
        country: '',
        city: '',
        pan: '',
        aadhar: ''
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const validate = () => {
        const newErrors = {};
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                newErrors[key] = `${key} is required`;
            }
        });
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone must be 10 digits';
        }
        if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
            newErrors.pan = 'Invalid PAN format';
        }
        if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) {
            newErrors.aadhar = 'Aadhar must be 12 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            navigate('/success', { state: formData });
        }
    };

    const isFormValid =
        Object.values(formData).every((val) => val !== '') &&
        !Object.keys(errors).length;


    return (
        <form onSubmit={handleSubmit}>
            {['firstName', 'lastName', 'username', 'email', 'pan', 'aadhar'].map((field) => (
                <div key={field}>
                    <label>{field}:</label>
                    <input name={field} value={formData[field]} onChange={handleChange} />
                    {errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>}
                </div>
            ))}

            <div>
                <label>Password:</label>
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Hide' : 'Show'}
                </button>
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
            </div>

            <div>
                <label>Phone:</label>
                <input name="phoneCode" value={formData.phoneCode} onChange={handleChange} style={{ width: '50px' }} />
                <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                {errors.phoneNumber && <p style={{ color: 'red' }}>{errors.phoneNumber}</p>}
            </div>

            <div>
                <label>Country:</label>
                <select name="country" value={formData.country} onChange={handleChange}>
                    <option value="">Select Country</option>
                    {Object.keys(countriesCities).map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                {errors.country && <p style={{ color: 'red' }}>{errors.country}</p>}
            </div>

            <div>
                <label>City:</label>
                <select name="city" value={formData.city} onChange={handleChange}>
                    <option value="">Select City</option>
                    {countriesCities[formData.country]?.map((city) => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
                {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
            </div>

            <button type="submit" disabled={!isFormValid}>
                Submit
            </button>
        </form>
    );
};

export default FormPage;