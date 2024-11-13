import { useState } from 'react';
import { Button, Card, Flex, Modal, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/Queries';
import EmployeesForm from '../components/Forms/EmployeesForm';
import { useCreateEmployee, useDeleteEmployee } from '../hooks';
import useUpdateEmployee from '../hooks/useUpdateEmployee';

const Employees = () => {
  const loggedUser = JSON.parse(localStorage.getItem('user'));

  const [pagination, setPagination] = useState({ current: 1, pageSize: 6 });


  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: { page: pagination.current, limit: pagination.pageSize },
  });
  const { handlecreateEmployee } = useCreateEmployee(pagination);
  const { handleDeleteEmployee } = useDeleteEmployee(pagination);
  const { handleUpdateEmployee } = useUpdateEmployee(pagination);


  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Employee");
  const [currentOperation, setCurrentOperation] = useState("");
  const [row, setRow] = useState({});

  const { confirm } = Modal;

  const handleOpenModal = (operation, row) => {
    setRow(row);
    setModalTitle(
      operation === "Add" ? "Add Employee" : "Edit Employee"
    );
    setCurrentOperation(operation);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setRow({});
    setCurrentOperation("");
  };


  const handleDelete = (id) => {
    confirm({
      title: "Are you sure delete this  Employee?",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      cancelButtonProps: { className: "custom-cancel-button" },
      onOk() {
        handleDeleteEmployee(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };


  const handleSubmit = async (values, operation) => {
    console.log(values);
    console.log(operation);
    if (operation === "Add") {
      handlecreateEmployee(values);
      setModalVisible(false);
      setRow({});
      setCurrentOperation("");
    } else
      if (operation === "Edit") {
        handleUpdateEmployee(values, row.id);
        setModalVisible(false);
        setRow({});
        setCurrentOperation("");
      }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
    refetch({ page: pagination.current, limit: pagination.pageSize });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Subjects',
      dataIndex: 'subjects',
      render: (subjects) => subjects.join(', '),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      render: (role) => role.charAt(0).toUpperCase() + role.slice(1),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      render: (_, record) => (
        <Flex gap={4}>
          <Button
            icon={<EditOutlined />}
            disabled={loggedUser.role !== 'admin'}
            onClick={() => {
              handleOpenModal("Edit", record)
            }}
          />
          <Button
            icon={<DeleteOutlined />}
            disabled={loggedUser.role !== 'admin'}
            onClick={() => handleDelete(record.id)}
          />
        </Flex>
      ),
    },



  ];

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      <Card
        bordered={false}
        className="mb-24"
        title={"Employee"}
        extra={
          <Button
            icon={<PlusOutlined />}
            onClick={() => handleOpenModal("Add")}
          >
            Add Employee
          </Button>
        }
      >

        <div
        >
          <Table
            columns={columns}
            dataSource={data.employees.employees}
            pagination={{
              current: pagination.current,
              pageSize: pagination.pageSize,
              total: data?.employees.total,
            }}
            onChange={handleTableChange}
          />
        </div>
      </Card>


      <EmployeesForm
        title={modalTitle}
        visible={modalVisible}
        onSave={handleSubmit}
        onCancel={handleCancel}
        currentOperation={currentOperation}
        row={row}
      />
    </>



  );
};
export default Employees;