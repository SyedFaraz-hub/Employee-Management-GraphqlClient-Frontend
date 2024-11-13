import { useMutation } from '@apollo/client';
import { DELETE_EMPLOYEE } from '../graphql/Mutations';
import { notification } from 'antd';
import { GET_EMPLOYEES } from '../graphql/Queries';

const useDeleteEmployee = (pagination) => {
    const [deleteEmployee, { data, loading, error }] = useMutation(DELETE_EMPLOYEE, {
        refetchQueries: [
            {
                query: GET_EMPLOYEES,
                variables: { page: pagination.current, limit:  pagination.pageSize },
            },
        ],
        awaitRefetchQueries: true,
    }
);

    const handleDeleteEmployee = async (id) => {
        try {
            const response = await deleteEmployee({
                variables: {
                    deleteEmployeeId: id,
                },
            });

            if (response.data.Login) {
                notification.success({
                    message: "Success",
                    description: "Delete successful",
                });
            }
        } catch (err) {
            console.error(err);
            notification.error({
                message: "Error",
                description: "Unable to delete employee",
            });
        }
    };

    return {
        data,
        loading,
        error,
        handleDeleteEmployee,
    };
};

export default useDeleteEmployee;
