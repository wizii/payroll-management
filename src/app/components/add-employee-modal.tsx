'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition } from '@headlessui/react'

type AddEmployeeModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (bool: boolean) => void;
    addEmployee: (formData: FormData) => void;
}

// TODO: Fix transition
export default function AddEmployeeModal(props: AddEmployeeModalProps) {
  const {isModalOpen, setIsModalOpen} = props;

  return (
    <Transition show={isModalOpen}>
        <Dialog open={isModalOpen} onClose={() => setIsModalOpen} className="relative z-10">
        <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <form action={props.addEmployee}>
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
                        <div className="grid grid-cols-2 mt-2 w-full gap-x-4">
                            <div>
                            <label htmlFor="staff-id" className="text-sm font-medium leading-6 text-gray-900">
                                Staff Id
                            </label>
                            <div className="mt-2">
                                <input
                                    id="staff-id"
                                    name="staff-id"
                                    type="text"
                                    className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
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
                                        autoComplete="given-name"
                                        className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="joining-date" className="text-sm font-medium leading-6 text-gray-900">
                                    Joining Date
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="joining-date"
                                        name="joining-date"
                                        type="date"
                                        className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
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
                                        className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
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
                                        className="w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
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
  )
}
