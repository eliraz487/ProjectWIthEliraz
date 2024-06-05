import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Register.module.css';
import { getGenders, getReligions } from '../../api';

const Step2 = ({ formData, handleChange, errors }) => {
  const [genders, setGenders] = useState([]);
  const [religions, setReligions] = useState([]);

  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const data = await getGenders();
        setGenders(data);
      } catch (error) {
        console.error('Failed to fetch genders', error);
      }
    };

    const fetchReligions = async () => {
      try {
        const data = await getReligions();
        setReligions(data);
      } catch (error) {
        console.error('Failed to fetch religions', error);
      }
    };

    fetchGenders();
    fetchReligions();
  }, []);

  return (
    <div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label}>Gender</label>
        <select
          className={styles.inputField}
          value={formData.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
        >
          <option value="">Select Gender</option>
          {genders.map((gender) => (
            <option key={gender.ID} value={gender.ID}>{gender.Gender}</option>
          ))}
        </select>
        {errors.gender && <p className={styles.error}>{errors.gender}</p>}
      </div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label}>Religion</label>
        <select
          className={styles.inputField}
          value={formData.religion}
          onChange={(e) => handleChange('religion', e.target.value)}
        >
          <option value="">Select Religion</option>
          {religions.map((religion) => (
            <option key={religion.ID} value={religion.ID}>{religion.Religion}</option>
          ))}
        </select>
        {errors.religion && <p className={styles.error}>{errors.religion}</p>}
      </div>
    </div>
  );
};

Step2.propTypes = {
  formData: PropTypes.shape({
    gender: PropTypes.string.isRequired,
    religion: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    gender: PropTypes.string,
    religion: PropTypes.string,
  }).isRequired,
};

Step2.validate = (formData) => {
  let valid = true;
  const errorMessages = {};

  if (!formData.gender) {
    valid = false;
    errorMessages.gender = 'Gender is required';
  }

  if (!formData.religion) {
    valid = false;
    errorMessages.religion = 'Religion is required';
  }

  return { valid, errorMessages };
};

export default Step2;
