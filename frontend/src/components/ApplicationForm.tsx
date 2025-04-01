import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { FormProps, LOCApplicationData, ProvinceOption, EmploymentStatusOption, PaymentHistoryOption } from '../types';
import { v4 as uuidv4 } from 'uuid';

const ApplicationSchema = Yup.object().shape({
  applicant_id: Yup.string()
    .required('Required')
    .max(50, 'Must be 50 characters or less'),
  annual_income: Yup.number()
    .required('Required')
    .min(20000, 'Must be at least $20,000')
    .max(200000, 'Must be at most $200,000'),
  self_reported_debt: Yup.number()
    .required('Required')
    .min(0, 'Must be at least $0')
    .max(10000, 'Must be at most $10,000'),
  self_reported_expenses: Yup.number()
    .required('Required')
    .min(0, 'Must be at least $0')
    .max(10000, 'Must be at most $10,000'),
  requested_amount: Yup.number()
    .required('Required')
    .min(1000, 'Must be at least $1,000')
    .max(50000, 'Must be at most $50,000'),
  age: Yup.number()
    .required('Required')
    .integer('Must be a whole number')
    .min(19, 'Must be at least 19 years old')
    .max(100, 'Must be at most 100 years old'),
  province: Yup.string()
    .required('Required')
    .oneOf(
      ['ON', 'BC', 'AB', 'QC', 'MB', 'SK', 'NS', 'NB', 'NL', 'PE', 'YT', 'NT', 'NU'],
      'Invalid province'
    ),
  employment_status: Yup.string()
    .required('Required')
    .oneOf(
      ['Full-time', 'Part-time', 'Unemployed'],
      'Invalid employment status'
    ) as Yup.StringSchema<'Full-time' | 'Part-time' | 'Unemployed'>,
  months_employed: Yup.number()
    .required('Required')
    .integer('Must be a whole number')
    .min(0, 'Must be at least 0')
    .max(600, 'Must be at most 600'),
  credit_score: Yup.number()
    .required('Required')
    .integer('Must be a whole number')
    .min(300, 'Must be at least 300')
    .max(900, 'Must be at most 900'),
  total_credit_limit: Yup.number()
    .required('Required')
    .min(0, 'Must be at least $0')
    .max(50000, 'Must be at most $50,000'),
  credit_utilization: Yup.number()
    .required('Required')
    .min(0, 'Must be at least 0%')
    .max(100, 'Must be at most 100%'),
  num_open_accounts: Yup.number()
    .required('Required')
    .integer('Must be a whole number')
    .min(0, 'Must be at least 0')
    .max(20, 'Must be at most 20'),
  num_credit_inquiries: Yup.number()
    .required('Required')
    .integer('Must be a whole number')
    .min(0, 'Must be at least 0')
    .max(10, 'Must be at most 10'),
  payment_history: Yup.string()
    .required('Required')
    .oneOf(
      ['On Time', 'Late <30', 'Late 30-60', 'Late >60'],
      'Invalid payment history'
    ) as Yup.StringSchema<'On Time' | 'Late <30' | 'Late 30-60' | 'Late >60'>,
  monthly_expenses: Yup.number()
    .required('Required')
    .min(0, 'Must be at least $0')
    .max(10000, 'Must be at most $10,000'),
});
// Initial form values
const initialValues: LOCApplicationData = {
  applicant_id: "APP00016",
  annual_income: 60000,
  self_reported_debt: 1000,
  self_reported_expenses: 2000,
  requested_amount: 10000,
  age: 35,
  province: 'ON',
  employment_status: 'Full-time',
  months_employed: 24,
  credit_score: 700,
  total_credit_limit: 15000,
  credit_utilization: 30,
  num_open_accounts: 3,
  num_credit_inquiries: 1,
  payment_history: 'On Time',
  monthly_expenses: 2500,
};

// Province options
const provinces: ProvinceOption[] = [
  { value: 'ON', label: 'Ontario' },
  { value: 'BC', label: 'British Columbia' },
  { value: 'AB', label: 'Alberta' },
  { value: 'QC', label: 'Quebec' },
  { value: 'MB', label: 'Manitoba' },
  { value: 'SK', label: 'Saskatchewan' },
  { value: 'NS', label: 'Nova Scotia' },
  { value: 'NB', label: 'New Brunswick' },
  { value: 'NL', label: 'Newfoundland and Labrador' },
  { value: 'PE', label: 'Prince Edward Island' },
  { value: 'YT', label: 'Yukon' },
  { value: 'NT', label: 'Northwest Territories' },
  { value: 'NU', label: 'Nunavut' },
];

// Employment status options
const employmentStatuses: EmploymentStatusOption[] = [
  { value: 'Full-time', label: 'Full-time' },
  { value: 'Part-time', label: 'Part-time' },
  { value: 'Unemployed', label: 'Unemployed' },
];

// Payment history options
const paymentHistories: PaymentHistoryOption[] = [
  { value: 'On Time', label: 'On Time' },
  { value: 'Late <30', label: 'Late <30 days' },
  { value: 'Late 30-60', label: 'Late 30-60 days' },
  { value: 'Late >60', label: 'Late >60 days' },
];

const ApplicationForm :React.FC<FormProps> = ({ onSubmit, loading, error }) => {
  const fields = [
    "applicant_id",
  "annual_income",
  "self_reported_debt",
  "self_reported_expenses",
  "requested_amount",
  "age",
  "province",
  "employment_status",
  "months_employed",
  "credit_score",
  "total_credit_limit",
  "credit_utilization",
  "num_open_accounts",
  "num_credit_inquiries",
  "payment_history",
  "monthly_expenses",
  ];

  const [step, setStep] = useState(0);
  const field = fields[step] as keyof typeof formik.values;


  const formik = useFormik({
    initialValues,
    validationSchema:ApplicationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      console.log("Form Submitted", values);
    },
  });


  const nextStep = () => {
    const field = fields[step] as keyof typeof formik.errors;
    if (!formik.errors[field]) {
      setStep((prev) => Math.min(prev + 1, fields.length - 1));
    }
  };
  
  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 0));
  };


return (
  <div className="">
  <form onSubmit={formik.handleSubmit} className="">
    <motion.div
      key={step}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <label
        className="block mb-6 text-4xl font-semibold text-gray-800 tracking-wide text-center"
        htmlFor={fields[step]}
      >
        {fields[step].replace("_", " ").toUpperCase()}
      </label>

      {/* If the field is applicant_id, make it read-only */}
      {fields[step] === "applicant_id" ? (
        <input
          id={fields[step]}
          name={fields[step]}
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.applicant_id} // Display the UUID value
          className="w-full py-3 px-4 bg-transparent border-b-4 border-black focus:outline-none focus:ring-0 text-lg"
         
        />
      ) : (
        <input
          id={fields[step]}
          name={fields[step]}
          type="text"
          
          value={formik.values[field]} // Bind to formik values
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="w-full py-3 px-4 bg-transparent border-b-4 border-black focus:outline-none focus:ring-0 text-lg"
        />
      )}

      {formik.touched[field] && formik.errors[field] && (
        <div className="text-red-500 text-sm mt-1">
          {formik.errors[field]}
        </div>
      )}
    </motion.div>

    <div className="flex justify-between mt-4">
      {step > 0 && (
        <button
          type="button"
          onClick={prevStep}
          className="bg-blue-500 px-4 py-2 text-white rounded-md hover:bg-blue-600"
        >
          Back
        </button>
      )}
      {step < fields.length - 1 ? (
        <button
          type="button"
          onClick={nextStep}
          className="bg-green-500 px-4 py-2 text-white rounded-md hover:bg-green-600"
        >
          Next
        </button>
      ) : (
        <div className="flex justify-center">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading || !formik.isValid}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      )}
    </div>
  </form>
</div>

);

};

export default ApplicationForm;
