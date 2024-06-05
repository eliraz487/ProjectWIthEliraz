import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Register.module.css';
import { getCities } from '../../api';

const Step3 = ({ formData, handleChange, errors }) => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const citiesData = await getCities();
        setCities(citiesData);
      } catch (error) {
        console.error('Failed to fetch cities', error);
      }
    };

    fetchCities();
  }, []);

  return (
    <div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label}>Birth Date</label>
        <input
          className={styles.inputField}
          type="date"
          value={formData.birthDate}
          onChange={(e) => handleChange('birthDate', e.target.value)}
        />
        {errors.birthDate && <p className={styles.error}>{errors.birthDate}</p>}
      </div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label}>City</label>
        <select
          className={styles.inputField}
          value={formData.city}
          onChange={(e) => handleChange('city', e.target.value)}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.ID} value={city.ID}>{city.City}</option>
          ))}
        </select>
        {errors.city && <p className={styles.error}>{errors.city}</p>}
      </div>
    </div>
  );
};

Step3.propTypes = {
  formData: PropTypes.shape({
    birthDate: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    birthDate: PropTypes.string,
    city: PropTypes.string,
  }).isRequired,
};

Step3.validate = (formData) => {
  let valid = true;
  const errorMessages = {};

  if (!formData.birthDate) {
    valid = false;
    errorMessages.birthDate = 'Birth date is required';
  }

  if (!formData.city) {
    valid = false;
    errorMessages.city = 'City is required';
  }

  return { valid, errorMessages };
};

export default Step3;
