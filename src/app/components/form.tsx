"use client"
import React, { useState, useEffect } from 'react'
import type { FormProps } from 'antd';
import { Row, Col, Button, Form, Input, Select, Space, DatePicker, Radio, Table, Checkbox } from 'antd';
import type { TableColumnsType, TableProps, CheckboxProps } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Test2/store';
import { addFormData, setFormData, deleteFormData } from '../Test2/formDataSlice';
import dayjs from 'dayjs';
import { FormComponentProps } from './langTest2'
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/formComponent.module.css'

const { Option } = Select;
type TableRowSelection<T> = TableProps<T>['rowSelection'];


interface FormValues {
    key: React.Key;
    title: string;
    firstname: string;
    lastname: string;
    birthday: dayjs.Dayjs;
    nationality: string;
    citizenID: string;
    gender: string;
    phone: string;
    passport: string;
    salary: string;

}
interface FormValues2 {
    key: React.Key;
    title: string;
    firstname: string;
    lastname: string;
    birthday: dayjs.Dayjs;
    nationality: string;
    citizenID: string;
    citizenID1: string;
    citizenID2: string;
    citizenID3: string;
    citizenID4: string;
    citizenID5: string;
    gender: string;
    phone: string;
    passport: string;
    salary: string;
    phonePrefix: string;
    phoneNumber: string;
}

const FormComponent: React.FC<FormComponentProps> = ({formHeader,
    title,
    Mr,
    Mrs,
    Ms,
    name,
    firstname,
    lastname,
    birthday,
    nationality,
    thai,
    french,
    american,
    citizenID,
    gender,
    male,
    female,
    unisex,
    phone,
    passport,
    salary,
    reset,
    submit,
    manage,
    selectAll,
    edit,
    deleted,
    prev,
    next,
    home}) => {
    const columns: TableColumnsType = [
        {
            title: name,
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: gender,
            dataIndex: 'gender',
            sorter: (a, b) => a.gender.localeCompare(b.gender),
        },
        {
            title: phone,
            dataIndex: 'phone',
            sorter: (a, b) => a.phone.localeCompare(b.phone),
        },
        {
            title: nationality,
            dataIndex: 'nationality',
            sorter: (a, b) => a.nationality.localeCompare(b.nationality),
        },
        {
            title: manage,
            render: (record) => (
                <div>
                    <button className={styles.editButton} style={{marginRight: '20px'}} onClick={() => handleButtonEdit(record)}>{edit}</button>
                    <button className={styles.editButton} onClick={() => handleButtonDelete(record)}>{deleted}</button>
                </div>
            ),
        },
    ];
    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields();
        setEditData(null);
    };
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.formData.data);

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [editData, setEditData] = useState<FormValues | null>(null);

    const handleButtonEdit = (record: FormValues) => {
        console.log('clicked', record);
        const matched = formData.find(item => item.key === record.key);
        if (matched) {
            console.log(matched.phone.split(' '));
            const id = matched.citizenID.split(' ')
            const phone = matched.phone.split(' ')
            form.setFieldsValue({
                ...matched,
                birthday: dayjs(matched.birthday),
                citizenID1: id[0],
                citizenID2: id[1],
                citizenID3: id[2],
                citizenID4: id[3],
                citizenID5: id[4],
                phonePrefix: phone[0],
                phoneNumber: phone[1]
            });
            setEditData(matched);
           
        };
};

    const handleButtonDelete = (record: FormValues) => {
        const matched = formData.find(item => item.key === record.key);
        if (matched) {
            dispatch(deleteFormData(matched.key));
            window.alert('Delete success')
        }
    }

    const handleDeleteAll = () => {
        if (selectedRowKeys) {
            selectedRowKeys.forEach(key => {
                const dataToDelete = formData.find(item => item.key === key);
                if (dataToDelete) {
                    dispatch(deleteFormData(dataToDelete.key));
                }
            });
            window.alert('Delete success');
            setSelectedRowKeys([]);
        }
    }

    const onFinish: FormProps<FormValues2>['onFinish'] = (values: FormValues2) => {

        const dataForm: FormValues = {
            key: editData ? editData.key : Date.now(),
            firstname: values.firstname,
            lastname: values.lastname,
            gender: values.gender,
            phone: `${values.phonePrefix} ${values.phoneNumber}`,
            nationality: values.nationality,
            title: values.title,
            birthday: values.birthday,
            citizenID: `${values.citizenID1} ${values.citizenID2} ${values.citizenID3} ${values.citizenID4}`,
            passport: values.passport,
            salary: values.salary,
        };
        if (editData) {
            dispatch(setFormData(formData.map(item => (item.key === editData.key ? dataForm : item))));
            setEditData(null);
            window.alert('Save Success')
        } else {
            dispatch(addFormData(dataForm));
            window.alert('Save Success')
        }

        form.resetFields();
    };


    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    };

    const handleSelectAll: CheckboxProps['onChange'] = (e) => {
        const allKeys = formData.map((item: FormValues) => item.key);
        if(e.target.checked){
            setSelectedRowKeys(allKeys);
        }
       else{
        setSelectedRowKeys([])
       }
      };

    const rowSelection: TableRowSelection<FormValues> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
        const storedData = JSON.parse(localStorage.getItem('formData') || '[]');
        if (storedData.length > 0) {
            dispatch(setFormData(storedData));
        }
    }, [dispatch]);

    const genders: {[key: string]: string} = {
        male: male,
        female: female,
        unisex: unisex
    };

    const nationalities: { [key: string]: string } = {
        thai: thai,
        french: french,
        american: american
    };

    const transformedData = formData.map(item => ({
        key: item.key,
        name: `${item.firstname} ${item.lastname}`,
        gender: genders[item.gender] || item.gender,
        phone: item.phone.replace(/\s+/g, ''),
        nationality: nationalities[item.nationality] || item.nationality
    }));

    if (!isClient) {
        return null; 
    }
    return (
        <div>
            <Row justify="space-between">
                <Col style={{fontSize: '24px', fontWeight: 'bold'}}>{formHeader}</Col>
                <Col>
                        <Button style={{marginTop:'1rem'}}><Link href="/">{home}</Link></Button>
                </Col>
            </Row>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Form
                    form={form}
                    name="basic"
                    style={{ maxWidth: 1000, border: "2px solid #000", padding: "10px", borderRadius: "5px" }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Row gutter={8}>
                        <Col flex="200px">
                            <Form.Item name="title" label={title} rules={[{ required: true }]}>
                                <Select
                                    allowClear
                                >
                                    <Option value="Mr">{Mr}</Option>
                                    <Option value="Mrs">{Mrs}</Option>
                                    <Option value="Ms">{Ms}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item
                                label={firstname}
                                name="firstname"
                                rules={[{ required: true }]}
                                style={{ width: '100%' }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item
                                label={lastname}
                                name="lastname"
                                rules={[{ required: true }]}
                                style={{ width: '100%' }}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col>
                            <Form.Item
                                label={birthday}
                                name="birthday"
                                rules={[{ required: true}]}
                                
                            >
                                <DatePicker format="YYYY-MM-DD" placeholder="mm//dd//yy"/>
                            </Form.Item>
                        </Col>
                        <Col flex="400px">
                            <Form.Item name="nationality" label={nationality} rules={[{ required: true }]}>
                                <Select
                                    allowClear
                                >
                                    <Option value="thai">{thai}</Option>
                                    <Option value="french">{french}</Option>
                                    <Option value="american">{american}</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col flex='80px'>{citizenID} :</Col>
                        <Col span={2}>
                            <Form.Item
                                name="citizenID1">
                                <Input type='number' maxLength={1}/>
                            </Form.Item>
                        </Col>
                        <Col>-</Col>
                        <Col span={4}>  <Form.Item
                            name="citizenID2">
                            <Input type='number' maxLength={4} />
                        </Form.Item></Col>
                        <Col>-</Col>
                        <Col span={4}> <Form.Item
                            name="citizenID3">
                            <Input  type='number' maxLength={5} />
                        </Form.Item></Col>
                        <Col>-</Col>
                        <Col span={3}>
                        <Form.Item
                            name="citizenID4">
                            <Input  type='number' maxLength={2}/>
                        </Form.Item>
                        </Col>
                        
                        <Col>-</Col>
                        <Col span={2}><Form.Item
                            name="citizenID5">
                            <Input  type='number' maxLength={1}/>
                        </Form.Item></Col>
                    </Row>
                    <Form.Item label={gender}
                        name="gender"
                        rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value="male">{male}</Radio>
                            <Radio value="female">{female}</Radio>
                            <Radio value="unisex">{unisex}</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Row gutter={8}>
                        <Col span={6}>
                            <Form.Item label={phone} name="phonePrefix" rules={[{ required: true }]}>
                                <Select
                                    
                                >
                                    <Option value="+66">
                                        <div style={{display: 'flex'}}>
                                            <Image src="/images/thailand.png" width={20} height={15} alt="thailand's flag" />
                                            +66
                                        </div>
                                    </Option>
                                    <Option value="+1">
                                        <div style={{display: 'flex'}}>
                                            <Image src="/images/united-states.png" width={20} height={15} alt="usa's flag" />
                                            +1
                                        </div>
                                    </Option>
                                    <Option value="+33">
                                        <div style={{display: 'flex'}}>
                                        <Image src="/images/france.png" width={20} height={15} alt="france's flag" />
                                        +33
                                        </div>
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col>-</Col>
                        <Col span={8}>
                            <Form.Item name="phoneNumber" rules={[{ required: true }]}>
                                <Input type='number' maxLength={10}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row align="bottom">
                        <Col flex="500px">
                            <Form.Item label={passport}
                                name="passport">
                                <Input type='number'/>
                            </Form.Item>
                            <Form.Item label={salary}
                                name="salary"
                                rules={[{ required: true }]} >
                                <Input type='number'/>
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <Row justify="center">
                                    <Col span={6} ><Button htmlType="button" onClick={onReset}>
                                        {reset}
                                    </Button></Col>
                                    <Col span={6}><Button type="primary" htmlType="submit">
                                        {submit}
                                    </Button></Col>
                                </Row>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </div>
            <Checkbox onChange={handleSelectAll}>{selectAll}</Checkbox>
            <Button onClick={handleDeleteAll}>{deleted}</Button>
            <Table
                style={{ marginTop: '2rem' }}
                rowSelection={rowSelection}
                columns={columns}
                dataSource={transformedData}
                pagination={{
                    position: ['topRight'],
                    pageSize: 5,
                    prevIcon: prev,
                    nextIcon: next,
                }} />
        </div>
    )
}

export default FormComponent;