import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import TaskForm from './TaskForm';
import type { TaskFormData } from '../../types';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createTask } from '../../api/TaskAPI';

export default function AddTaskModal() {
    
    const navigate = useNavigate()

    /**Leer si modal existe */
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask')
    const show = modalTask ? true : false

    /**Obtener projectId*/
    const params = useParams()
    const projectId = params.projectId!

    const initialValues : TaskFormData = {
        name: '',
        description: ''
    }

    const {register, handleSubmit, formState: {errors} } = useForm({defaultValues: initialValues})
    const queryClient = useQueryClient()
    
    const { mutate } = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            toast.success(data)
            navigate(location.pathname, {replace: true})
        }
    })
    
    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
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
                                <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all py-8 px-12">
                                    <header className='flex justify-end'>
                                        <div className='bg-red-500 size-10 flex items-center justify-center rounded-lg hover:bg-red-600 cursor-pointer'>
                                            <XMarkIcon 
                                                onClick={() => navigate(location.pathname, {replace: true})} 
                                                className='size-8 text-white rounded-lg'>
                                            </XMarkIcon>
                                        </div>
                                    </header>
                                    <DialogTitle
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </DialogTitle>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-olivine-600">una tarea</span>
                                    </p>

                                    <form
                                        className='mt-10 space-y-3'
                                        noValidate
                                        onSubmit={handleSubmit(handleCreateTask)}
                                    >
                                        <TaskForm 
                                            register={register}
                                            errors={errors}
                                        />

                                        <div className='w-full flex justify-center items-center mt-10'>
                                            <input 
                                                type="submit" 
                                                className='bg-olivine-500 hover:bg-olivine-600 px-10 py-2 text-white uppercase font-bold cursor-pointer transition-colors rounded-lg'
                                                value='Guardar Tarea'
                                            />
                                        </div>
                                    </form>

                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}