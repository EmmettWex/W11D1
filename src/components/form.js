import { getDefaultNormalizer } from '@testing-library/react';
import React, {useState} from 'react';

function Form (props) {

    const [checkedNotifications, setChecked] = useState(false);

    const [user, setUser] = useState({
        Name: '',
        Email: '',
        PhoneNumber: '',
        PhoneType: '',
        Staff: '',
        Bio: '',
        EmailNotifications: false
    });

    const [errors, setErrors] = useState([]);

    const validate = () => {
        let errors = [];

        if (user.Name.length === 0) {
            errors.push('Name cannot be blank')
        }

        if (!validEmail(user.Email)) {
            errors.push('Must be a valid email')
        }

        if (user.PhoneNumber.length > 0) {
            if (!validPhoneNumber(user.PhoneNumber)) {
                errors.push('Must be a valid phone number')
            }
        }

        if (user.PhoneNumber.length > 0) {
            const phoneTypes = ["Home", "Work", "Mobile"];

            if (!phoneTypes.includes(user.PhoneType)) {
                errors.push('Must include phone type')
            }
        }

        if (user.Bio.length > 280) {
            errors.push('Bio must have below 280 characters')
        }
    }

    const validPhoneNumber = (phoneNumber) => {
        const numbers = "1234567890"

        if (phoneNumber.length !== 10) return false;

        for (let i = 0; i < phoneNumber.length; i++) {
            const num = phoneNumber[i];

            if (!numbers.includes(num)) return false;
        }

        return true;
    }

    const validEmail = (email) => {

        const emailParts = email.split("@");

        if (emailParts.length !== 2) return false;

        const emailPartsParts = emailParts[1].split(".");

        if (emailPartsParts.length !== 2) return false;
        
        return true;
    }

    const showErrors = () => {
        if (!errors.length) return null;

        return (
            <ul>
                {errors.map((error), i => <li key={i}>{error}</li>)}
            </ul>
        );
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = validate();

        console.log(user);

        if (errors.length) {
            setErrors(errors);
        }
    }

    const handleChange = (field) => {
        return (e) => {
            const newObj = Object.assign({}, user, {[field]: e.target.value});
            setUser(newObj);
        }
    }

    return (
        <div>
        {showErrors()}
        
        <form className='form' onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <input
                type="text"
                placeholder='Name'
                value={user.Name}
                onChange={handleChange('Name')}
            />
            <input
                type="text"
                placeholder='Email'
                value={user.Email}
                onChange={handleChange('Email')}
            />
            <input
                type="text"
                placeholder='5555555555'
                value={user.PhoneNumber}
                onChange={handleChange('PhoneNumber')}
            />
            <DropDownInput
                options={["Home", "Work", "Mobile"]}
                placeholder='N/A'
                value={user.PhoneType}
                onChange={handleChange('PhoneType')}
            />
            <div className="radio">
                <label>
                    <input
                        type="radio"
                        value="Instructor"
                        checked={this.state.selectedOption === "Instructor"}
                        onChange={handleChange('Instructor')}
                    />
                    Instructor
                </label>
                <label>
                    <input
                        type="radio"
                        value="Student"
                        checked={this.state.selectedOption === "Student"}
                        onChange={handleChange('Student')}
                    />
                    Student
                </label>
            </div>

            <input
                type="text"
                placeholder='About me goes here'
                value={user.Bio}
                onChange={handleChange('Bio')}
            />

            <div className="checkbox">
                <label>
                    Email Notifications:
                    <input
                        type="checkbox"
                        value={this.user.EmailNotifications}
                        onChange={handleChange('EmailNotifications')}
                    />
                </label>
            </div>

        </form>

        </div>
    )
}

export default Form;
                // EmailNotifications: ''