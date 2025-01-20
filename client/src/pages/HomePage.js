import React,{useState,useEffect} from 'react'
import Layout from './../components/Layout/Layout';
import {Modal,Input,Form,Select,message, Table} from 'antd'
import axios from 'axios';
import Spinner from '../components/Spinner';

const HomePage = () => {
    const [showModal,setShowModal]=useState(false);
    const [loading,setLoading]=useState(false);
    const [allTransection,setAllTransection]=useState([]);
    // const [frequency,setFrequency]=useState('7');
    // const [selectedDate,setSelectedate]=useState([])
    const [type,setType]=useState('all')
  
    //table data
    const columns=[
      {
        title:'Date',
        dataIndex:'date',
        
      },
      {
        title:'Currency',
        dataIndex:'currency'
      },
      {
        title:'Amount',
        dataIndex:'amount'
      },
      {
        title:' Type',
        dataIndex:'type'
      },
      {
        title:'Category',
        dataIndex:'category'
      },
      {
        title:'Reference',
        dataIndex:'reference'
      },
      {
        title:'Actions',
        
      },
    ];
    //get all transactions
  
  
    //useEffect hook
    useEffect(()=>{
      const getAllTransactions=async (params) => {
        try {
          const user=JSON.parse(localStorage.getItem('user'))
          setLoading(true)
          const res=await axios.post('/transections/get-transection',{userid: user._id,type});
          
          setLoading(false)
          setAllTransection(res.data)
          console.log(res.data)
    
        } catch (error) {
          console.log(error)
          message.error("Fetch Issue with transection");
        }
        
      }
      getAllTransactions();
  
    },[type]);
  
  
    // Form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        message.error("User not authenticated");
        return;
      }

      setLoading(true);
      await axios.post("/transections/add-transection", {
        ...values,
        userid: user._id,
      });
      setLoading(false);
      message.success("Transaction Added Successfully");
      setShowModal(false);
    } catch (error) {
      setLoading(false);
      console.error("Error adding transaction:", error);
      message.error(error.response?.data?.message || "Failed to add transaction");
    }
  };


  return (
    <Layout>
        {loading && <Spinner />}
       <div className='filters'>
        <div>
            range filters
        </div>
        <div>
            <h6>
                Select Type
            </h6>
            <Select value={type} onChange={(values)=> setType(values)}>
                <Select.Option value='all'>all</Select.Option>
                <Select.Option value='income'>Income</Select.Option>
                <Select.Option value='expense'>Expense</Select.Option>
            </Select>
        </div>
        <div>
            <button className='btn btn-primary' onClick={()=>setShowModal(true)}>Add new</button>
        </div>

       </div>
       <div className='content'>
        <Table columns={columns} dataSource={allTransection}/>
       </div>
       <Modal title='Add Transection' open={showModal} onCancel={()=>setShowModal(false)}
        footer={false}
        >
           <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter the amount!" }]}
          >
            <Input type="text" />
          </Form.Item>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please select the type!" }]}
          >
            <Select>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please select a category!" }]}
          >
            <Select>
              <Select.Option value="Salary">Salary</Select.Option>
              <Select.Option value="Food">Food</Select.Option>
              <Select.Option value="Rent">Rent</Select.Option>
              <Select.Option value="Medical">Medical</Select.Option>
              <Select.Option value="Bills">Bills</Select.Option>
              <Select.Option value="Project">Project</Select.Option>
              {/* <Select.Option value="Medical">Tip</Select.Option> */}
              <Select.Option value="Movie">Movie</Select.Option>
              <Select.Option value="Shopping">Shopping</Select.Option>
              <Select.Option value="Others">Others</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Currency"
            name="currency"
            rules={[{ required: true, message: 'Please select a currency!' }]}
          >
            <Select>
              <Select.Option value="USD">USD</Select.Option>
              <Select.Option value="INR">INR</Select.Option>
              <Select.Option value="EUR">EUR</Select.Option>
              <Select.Option value="GBP">GBP</Select.Option>
              <Select.Option value="AUD">AUD</Select.Option>
              <Select.Option value="CAD">CAD</Select.Option>
            </Select>
          </Form.Item>

          {/* Date Field */}
          <Form.Item label="Date" name="date">
            <Input
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]} // Current date as default
            />
          </Form.Item>
          {/* <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date!" }]}
          >
            <Input type="date" />
          </Form.Item> */}
          <Form.Item label="Reference" name="reference">
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              SAVE
            </button>
          </div>
        </Form>

        </Modal>




    </Layout>
  );
};

export default HomePage;