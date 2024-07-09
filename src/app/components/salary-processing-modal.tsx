'use client'
import { useEmployees } from "@/app/context/employeesContext";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Transition } from '@headlessui/react';
import { calculateTotalSalary } from "../utils";

type SalaryProcessingModalProps = {
    isModalOpen: boolean;
    setIsModalOpen: (bool: boolean) => void;
    handleSalaryProcessing: (formData: FormData) => void;
}

// TODO: Fix transition
// TODO: Scrollable
export default function SalaryProcessingModal(props: SalaryProcessingModalProps) {
    const { isModalOpen, setIsModalOpen } = props;
    const { employees, selectedIds } = useEmployees();
    const selectedEmployees = employees.filter(({staffId}) => selectedIds.includes(staffId));

    return (
        <Transition show={isModalOpen}>
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen} className="relative z-10">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />
                <form action={props.handleSalaryProcessing}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <DialogPanel
                                transition
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                            >
                                <div className="bg-white px-4 pb-6 pt-5 sm:p-6 sm:pb-6">
                                    <div className="sm:flex">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Process Salaries
                                            </DialogTitle>
                                            <div className="grid grid-cols-5 mt-1 w-full gap-x-4">
                                                <div className="mt-2 col-span-5 text-sm font-semibold text-gray-500 mb-4">
                                                    * Employees without a salary month/year will not be processed
                                                </div>
                                                <div className="font-semibold text-sm">Staff Id</div>
                                                <div className="font-semibold text-sm">Name</div>
                                                <div className="font-semibold text-sm">Total Salary</div>
                                                <div className="font-semibold text-sm col-span-2">Salary Month/Year</div>

                                                {selectedEmployees.map(employee => (
                                                    <>
                                                        <div className="mt-2 text-sm">
                                                            {employee.staffId}
                                                        </div>
                    
                                                        <div className="mt-2 text-sm">
                                                            {employee.name}
                                                        </div>
        
                                                        <div className="mt-2 text-sm">
                                                            {calculateTotalSalary(employee)}
                                                        </div>
                
                                                        <div className="mt-2 text-sm col-span-2">
                                                            Material UI Date Picker
                                                        </div>
                                                    </>
                                                ))}
                            
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="submit"
                                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                    >
                                        Process Salaries
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
