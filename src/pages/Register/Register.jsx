import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import styles from './Register.module.css';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import Step5 from './Step5';
import Step6 from './Step6';
import { registerUser, sendValidationEmail, validateUserCode } from '../../api';
import ErrorDialog from '../../containers/ErrorDialog/ErrorDialog';

const Register = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    religion: '',
    birthDate: '',
    city: '',
    economicSituation: '',
    education: '',
    password: '',
    confirmPassword: '',
    code: '',
  });
  const [errors, setErrors] = useState({});
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const nextStep = async () => {
    // eslint-disable-next-line no-use-before-define
    if (validateStep()) {
      if (step === 5) {
        try {
          await sendValidationEmail(formData.email);
          setStep(step + 1);
        } catch (error) {
          setErrors([error.message]);
          setShowErrorDialog(true);
        }
      } else {
        setStep(step + 1);
      }
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateStep = () => {
    let valid = true;
    let errorMessages = {};

    switch (step) {
      case 1:
        ({ valid, errorMessages } = Step1.validate(formData));
        break;
      case 2:
        ({ valid, errorMessages } = Step2.validate(formData));
        break;
      case 3:
        ({ valid, errorMessages } = Step3.validate(formData));
        break;
      case 4:
        ({ valid, errorMessages } = Step4.validate(formData));
        break;
      case 5:
        ({ valid, errorMessages } = Step5.validate(formData));
        break;
      default:
        break;
    }

    if (!valid) {
      setErrors(errorMessages);
      setShowErrorDialog(true);
    }

    return valid;
  };

  const handleFinalSubmit = async () => {
    if (validateStep()) {
      try {
        await validateUserCode(formData.email, formData.code);
        await registerUser(formData);
      } catch (error) {
        setErrors([error.message]);
        setShowErrorDialog(true);
      }
      setErrors(['Registration completed successfully!']);
      setShowErrorDialog(true);
      navigate('/login'); // Navigate to the login page
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1 formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <Step2 formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return <Step3 formData={formData} handleChange={handleChange} errors={errors} />;
      case 4:
        return <Step4 formData={formData} handleChange={handleChange} errors={errors} />;
      case 5:
        return <Step5 formData={formData} handleChange={handleChange} errors={errors} />;
      case 6:
        return <Step6 formData={formData} handleChange={handleChange} errors={errors} />;
      default:
        return <Step1 formData={formData} handleChange={handleChange} errors={errors} />;
    }
  };

  return (
    <div className={styles.register}>
      <div className={styles.registerContainer}>
        <h1>Register Page</h1>
        {renderStep()}
        <div className={styles.line}>
          Step {step} of 6
        </div>
        <div className={styles.buttonContainer}>
          {step > 1 && <button className={styles.navButton} type="button" onClick={prevStep}>Back</button>}
          {step < 6 && <button className={styles.navButton} type="button" onClick={nextStep}>Next</button>}
          {step === 6 && <button className={styles.submitButton} type="button" onClick={handleFinalSubmit}>Validate Code</button>}
        </div>
        {showErrorDialog && (
          <ErrorDialog
            messages={errors}
            onClose={() => setShowErrorDialog(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
