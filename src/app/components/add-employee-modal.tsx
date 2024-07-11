'use client';

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import CustomDatePicker from './date-picker';

type AddEmployeeModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  addEmployee: (formData: FormData) => void;
};

export default function AddEmployeeModal(props: AddEmployeeModalProps) {
  const { isModalOpen, setIsModalOpen, addEmployee } = props;

  const [name, setName] = useState('');
  const [joiningDate, setJoiningDate] = useState<Dayjs | null>(null);
  const [basicSalary, setBasicSalary] = useState('');
  const [salaryAllowances, setSalaryAllowances] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    joiningDate: '',
    basicSalary: '',
    salaryAllowances: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: name ? '' : 'Name is required',
      joiningDate: joiningDate ? '' : 'Joining Date is required',
      basicSalary: basicSalary ? '' : 'Basic Salary is required',
      salaryAllowances: salaryAllowances ? '' : 'Salary Allowances is required',
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = new FormData();
      formData.append('employee-name', name);
      formData.append('joining-date', joiningDate ? joiningDate.format('YYYY-MM-DD') : '');
      formData.append('basic-salary', basicSalary);
      formData.append('salary-allowances', salaryAllowances);
      addEmployee(formData);
      setIsModalOpen(false);
    }
  };

  return (
    <Transition show={isModalOpen}>
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <form onSubmit={handleSubmit}>
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
              >
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Add Employee
                      </DialogTitle>
                      <div className="grid grid-cols-2 mt-1 w-full gap-x-4">
                        <div className="mt-2 col-span-2 text-sm font-semibold text-gray-500">
                          * The Staff Id will be autogenerated
                        </div>
                        <div className="mt-2 col-span-2 text-sm font-semibold text-gray-500">
                          * All fields are required
                        </div>
                        <div>
                          <label htmlFor="employee-name" className="text-sm font-medium leading-6 text-gray-900">
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              id="employee-name"
                              name="employee-name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-ring-1 focus:ring-inset focus:ring-[#ff220f] focus:outline-none sm:text-sm sm:leading-6"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label htmlFor="joining-date" className="text-sm font-medium leading-6 text-gray-900">
                            Joining Date
                          </label>
                          <div className="mt-2">
                            <CustomDatePicker 
                              id="joining-date"
                              name="joining-date"
                              value={joiningDate}
                              onChange={(date: Dayjs | null) => setJoiningDate(date)}
                            />
                            {errors.joiningDate && <p className="text-red-500 text-sm">{errors.joiningDate}</p>}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="basic-salary" className="text-sm font-medium leading-6 text-gray-900">
                            Basic Salary
                          </label>
                          <div className="mt-2">
                            <input
                              id="basic-salary"
                              name="basic-salary"
                              type="text"
                              value={basicSalary}
                              onChange={(e) => setBasicSalary(e.target.value)}
                              className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-ring-1 focus:ring-inset focus:ring-[#ff220f] focus:outline-none sm:text-sm sm:leading-6"
                            />
                            {errors.basicSalary && <p className="text-red-500 text-sm">{errors.basicSalary}</p>}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="salary-allowances" className="text-sm font-medium leading-6 text-gray-900">
                            Salary Allowance
                          </label>
                          <div className="mt-2">
                            <input
                              id="salary-allowances"
                              name="salary-allowances"
                              type="text"
                              value={salaryAllowances}
                              onChange={(e) => setSalaryAllowances(e.target.value)}
                              className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus-ring-1 focus:ring-inset focus:ring-[#ff220f] focus:outline-none sm:text-sm sm:leading-6"
                            />
                            {errors.salaryAllowances && <p className="text-red-500 text-sm">{errors.salaryAllowances}</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
}
