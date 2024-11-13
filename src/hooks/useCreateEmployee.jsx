import { useMutation } from '@apollo/client';
import { CREATE_EMPLOYEE } from '../graphql/Mutations';
import { notification } from 'antd';
import { GET_EMPLOYEES } from '../graphql/Queries';

const useCreateEmployee = (pagination) => {
    const [createEmployee, { data, loading, error }] = useMutation(CREATE_EMPLOYEE, {
        refetchQueries: [
            {
                query: GET_EMPLOYEES,
                variables:{ page: pagination.current, limit: pagination.pageSize },
            },
        ],
        awaitRefetchQueries: true,
    });

    const handlecreateEmployee = async (
        {
            id,
            age,
            email,
            group,
            name,
            password,
            subjects,
            role }
    ) => {
        try {
            const response = await createEmployee({
                variables: {
                    id,
                    age,
                    email,
                    group,
                    subjects,
                    password,
                    name,
                    role,
                },
            });

            if (response.data.createEmployee) {
                notification.success({
                    message: "Success",
                    description: "Employee created successfully",
                });
               
            }
        } catch (err) {
            console.error(err);
            notification.error({
                message: "Error",
                description: "Error creating employee",
            });
        }
    };

    return {
        data: data,
        loading,
        error,
        handlecreateEmployee,
    };
};

export default useCreateEmployee;
