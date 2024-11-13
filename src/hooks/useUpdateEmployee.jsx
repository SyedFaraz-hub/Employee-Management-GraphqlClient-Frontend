import { useMutation } from '@apollo/client';
import { UPDATE_EMPLOYEE } from '../graphql/Mutations';
import { notification } from 'antd';
import { GET_EMPLOYEES } from '../graphql/Queries';

const useUpdateEmployee = (pagination) => {
    const [updateEmployee, { data, loading, error }] = useMutation(UPDATE_EMPLOYEE, {
        refetchQueries: [
            {
                query: GET_EMPLOYEES,
                variables: { page: pagination.current, limit: pagination.pageSize },
            },
        ],
        awaitRefetchQueries: true,
    });

    const handleUpdateEmployee = async (
        {
            age,
            email,
            group,
            name,
            password,
            subjects,
            role
        },
        id
    ) => {
        try {
            const response = await updateEmployee({
                variables: {
                    updateEmployeeId: id,
                    age,
                    email,
                    group,
                    subjects,
                    password,
                    name,
                    role,
                },
            });

            if (response.data.updateEmployee) {
                notification.success({
                    message: "Success",
                    description: "Employee Updated successfully",
                });

            }
        } catch (err) {
            console.error(err);
            notification.error({
                message: "Error",
                description: "Error updating employee",
            });
        }
    };

    return {
        data: data,
        loading,
        error,
        handleUpdateEmployee,
    };
};

export default useUpdateEmployee;
