import { Fragment } from 'react';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { Task, TaskFormData } from '../../types';
import { useForm } from 'react-hook-form';
import TaskForm from './TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask } from '../../api/TaskAPI';
import { toast } from 'react-toastify';

type EditTaskModalProps = {
    data: Task
    taskId: Task['_id']
}

export default function EditTaskModal({data, taskId}: EditTaskModalProps) {

    const navigate = useNavigate()
    /**Obtener projectId*/
    const params = useParams()
    const projectId = params.projectId!

    const {register, handleSubmit, formState: {errors} } = useForm<TaskFormData>({defaultValues: {
        name: data.name,
        description: data.description
    }})

    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: updateTask,
        onError: (error)=> {
            toast.error(error.message)
        },
        onSuccess: (data)=> {
            //queryClient para poder ver las actualizaciones
            queryClient.invalidateQueries({queryKey: ['editProject', projectId]})
            toast.success(data)

            navigate(location.pathname, {replace: true})
        }
    })

    const handleEditTask = (formData: TaskFormData) => {
        const data = {
            projectId,
            formData,
            taskId
        }
        mutate(data)
    } 


    return (
        <Transition appear show={true} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={() =>navigate(location.pathname, {replace: true})} >
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
                                    Editar Tarea
                                </DialogTitle>

                                <p className="text-xl font-bold">Realiza cambios a una tarea en {''}
                                    <span className="text-olivine-600">este formulario</span>
                                </p>

                                <form
                                    className="mt-10 space-y-3"
                                    onSubmit={handleSubmit(handleEditTask)}
                                    noValidate
                                >    

                                    <TaskForm 
                                        register={register}
                                        errors={errors}
                                    />

                                    <div className='w-full flex justify-center items-center mt-10'>
                                        <input
                                            type="submit"
                                            className=" bg-olivine-600 hover:bg-olivine-700 py-2 px-10  text-white font-black  text-xl cursor-pointer rounded-lg"
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
    )
}