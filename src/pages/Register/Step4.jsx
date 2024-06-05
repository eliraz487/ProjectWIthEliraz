import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Register.module.css';
import { getEconomicSituations, getEducations } from '../../api';

const Step4 = ({ formData, handleChange, errors }) => {
  const [economicSituations, setEconomicSituations] = useState([]);
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const economicData = await getEconomicSituations();
        setEconomicSituations(economicData);

        const educationData = await getEducations();
        setEducations(educationData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label}>Economic Situation</label>
        <select
          className={styles.inputField}
          value={formData.economicSituation}
          onChange={(e) => handleChange('economicSituation', e.target.value)}
        >
          <option value="">Select Economic Situation</option>
          {economicSituations.map((situation) => (
            <option key={situation.ID} value={situation.ID}>{situation.EconomicSituation}</option>
          ))}
        </select>
        {errors.economicSituation && <p className={styles.error}>{errors.economicSituation}</p>}
      </div>
      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.label}>Education</label>
        <select
          className={styles.inputField}
          value={formData.education}
          onChange={(e) => handleChange('education', e.target.value)}
        >
          <option value="">Select Education</option>
          {educations.map((education) => (
            <option key={education.ID} value={education.ID}>{education.Education}</option>
          ))}
        </select>
        {errors.education && <p className={styles.error}>{errors.education}</p>}
      </div>
    </div>
  );
};

Step4.propTypes = {
  formData: PropTypes.shape({
    economicSituation: PropTypes.string.isRequired,
    education: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    economicSituation: PropTypes.string,
    education: PropTypes.string,
  }).isRequired,
};

Step4.validate = (formData) => {
  let valid = true;
  const errorMessages = {};

  if (!formData.economicSituation) {
    valid = false;
    errorMessages.economicSituation = 'Economic situation is required';
  }

  if (!formData.education) {
    valid = false;
    errorMessages.education = 'Education is required';
  }

  return { valid, errorMessages };
};

export default Step4;
