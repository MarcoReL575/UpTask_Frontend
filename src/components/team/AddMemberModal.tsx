import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import AddMemberForm from './AddMemberForm';

export default function AddMemberModal() {

    const location = useLocation()
    const navigate = useNavigate()

    const queryParams = new URLSearchParams(location.search);
    const addMember = queryParams.get('addMember');
    const show = addMember ? true : false

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, { replace: true })}>
                    <TransitionChild
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </TransitionChild>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5 flex justify-between"
                                    >
                                        <div>
                                            Agregar Integrante al equipo
                                        </div>
                                        <div className='bg-red-500 size-10 flex items-center justify-center rounded-lg hover:bg-red-600 cursor-pointer'>
                                            <XMarkIcon
                                                onClick={() => navigate(location.pathname, {replace: true})} 
                                                className='size-8 text-white rounded-lg'>
                                            </XMarkIcon>
                                        </div>
                                    </DialogTitle>
                                    <p className="text-xl font-bold">Busca el nuevo integrante por email {''}
                                        <span className="text-olivine-400">para agregarlo al proyecto</span>
                                    </p>
                                    <AddMemberForm />
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}