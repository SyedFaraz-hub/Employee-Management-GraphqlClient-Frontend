// EmployeesForm.js
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import Select from "react-select";
import useCreateEmployee from "../../hooks/useCreateEmployee";

const EmployeesForm = ({
  title,
  visible,
  onCancel,
  onSave,
  currentOperation,
  row,
}) => {
  const [form] = Form.useForm();
  const [subjectOptions, setSubjectOptions] = useState([]);

  const onFinish = async (values) => {
    const selectedSubjects = values.subjects?.map((item) => item.value);
    values.subjects = selectedSubjects;
    values.age = parseInt(values.age);


    values.role = values.role.value;

    await onSave(values, currentOperation);
    form.resetFields();
  };

  useEffect(() => {
    const options = ["AI", "Digital Marketing"]?.map((subject) => ({
      value: subject,
      label: subject,
    }));
    setSubjectOptions(options);
  }, []);

  useEffect(() => {
    if (row) {
      form.setFieldsValue({
        name: row.name,
        age: row.age,
        group: row.group,
        subjects: row.subjects?.map((item) => ({ value: item, label: item })),
        attendance: row.attendance?.map((item) => ({ value: item.toString(), label: item.toString() })),
        email: row.email,
        password: row.password,
        role: { value: row.role, label: row.role },
      });
    }
  }, [row]);

  return (
    <Modal
      onOk={() => form.submit()}
      title={title}
      open={visible}
      onCancel={() => onCancel()}
      width={800}
      style={{ top: 30 }}
    >
      <Form form={form} onFinish={onFinish}>
        <Row gutter={[16, 16]}>

          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input size="large" placeholder="Enter name" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Age"
              name="age"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please enter age" }]}
            >
              <Input size="large" type="number" min={1} placeholder="Enter age" />
            </Form.Item>
          </Col>


          <Col span={12}>
            <Form.Item
              label="Group"
              name="group"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please enter group" }]}
            >
              <Input size="large" placeholder="Enter group" />
            </Form.Item>
          </Col>


          <Col span={12}>
            <Form.Item
              label="Subject"
              name="subjects"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please select subjects" }]}
            >
              <Select
                isMulti
                options={subjectOptions}
                placeholder="Select subjects"
              />
            </Form.Item>
          </Col>


          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please enter email" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input size="large" placeholder="Enter email" />
            </Form.Item>
          </Col>
         
         {
            currentOperation === "Add" && (
              <Col span={12}>
                <Form.Item
                  label="Password"
                  name="password"
                  labelCol={{ span: 24 }}
                  rules={[{ required: true, message: "Please enter password" }]}
                >
                  <Input.Password size="large" placeholder="Enter password" />
                </Form.Item>
              </Col>
            )
         }
         

          <Col span={12}>
            <Form.Item
              label="Role"
              name="role"
              labelCol={{ span: 24 }}
              rules={[{ required: true, message: "Please select role" }]}
            >
              <Select

                options={[
                  { value: "admin", label: "Admin" },
                  { value: "employee", label: "Employee" },
                ]}
                placeholder="Select role"
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EmployeesForm;
