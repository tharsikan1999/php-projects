import './index.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faPenToSquare, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        age: '',
        phone_no: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost/php/index.php');
            setRows(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdd = async () => {
        if (formData.age === '' || formData.firstname === '' || formData.lastname === '' || formData.phone_no === '') {
            window.alert('Please fill in all fields');
        } else {
            try {
                await axios.post('http://localhost/php/index.php', formData);
                fetchData(); 
                setFormData({
                    firstname: '',
                    lastname: '',
                    age: '',
                    phone_no: ''
                });
                window.alert('Student added successfully');
            } catch (error) {
                window.alert('Error adding student:', error);
            }
        }
    };

    const [selectedRowIndex, setSelectedRowIndex] = useState(null); 

    const handleEdit = (index) => {
        setSelectedRowIndex(index); 
        const selectedRow = rows[index];
        setFormData({
            
            firstname: selectedRow.firstname,
            lastname: selectedRow.lastname,
            age: selectedRow.age,
            phone_no: selectedRow.phone_no
        });


    };

    const handleSaveEdit = async () => {
        if (selectedRowIndex !== null) {
            try {
                await axios.put(`http://localhost/php/index.php/${rows[selectedRowIndex].student_no}`, formData);
                fetchData(); 
                setFormData({
                    
                    firstname: '',
                    lastname: '',
                    age: '',
                    phone_no: ''
                });
                setSelectedRowIndex(null);
                window.alert('Student updated successfully');
            } catch (error) {
                console.error('Error saving edit:', error);
            }
        }
    };

    const handleDelete = async (index) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this student?");
        if (shouldDelete) {
            try {
                await axios.delete(`http://localhost/php/index.php/${rows[index].student_no}`);
                fetchData(); 
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };
    

    

    return (
        <div className="mx-auto flex justify-center h-screen items-start">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-8 py-5 w-auto"><input className='h-10 text-center border rounded w-auto' type="text" placeholder="First Name" name="firstname" value={formData.firstname} onChange={handleChange} required /></th>
                        <th className="px-8 py-5 w-auto"><input className='h-10 text-center border rounded w-auto' type="text" placeholder="Last Name" name="lastname" value={formData.lastname} onChange={handleChange} required /></th>
                        <th className="px-8 py-5 w-auto"><input className='h-10 text-center border rounded w-auto' type="number" placeholder="Age" name="age" value={formData.age} onChange={handleChange} required /></th>
                        <th className="px-8 py-5 w-auto"><input className='h-10 text-center border rounded w-auto' type="text" placeholder="Phone no" name="phone_no" value={formData.phone_no} onChange={handleChange} required /></th>
                        <th className="px-8 py-5 w-auto">
                            {selectedRowIndex !== null  ?(<>
                        </>) :
                         (<>
                         <div className='bg-mycolor h-10 w-10 rounded-full flex items-center justify-center font-semibold text-white hover:bg-white text-xl hover:text-mycolor hover:border-2 hover:border-mycolor hover:cursor-pointer' onClick={handleAdd}>
                                <p><FontAwesomeIcon icon={faPlus} /></p>
                            </div>
                        </>)}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2 w-auto">{row.firstname}</td>
                            <td className="border px-4 py-2 w-auto">{row.lastname}</td>
                            <td className="border px-4 py-2 w-auto">{row.age}</td>
                            <td className="border px-4 py-2 w-auto">{row.phone_no}</td>
                            <td className='flex'>
                            {selectedRowIndex === index ? ( 
                                    <>
                                        <div className='bg-mycolor h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white ml-2 hover:bg-white hover:text-mycolor hover:border-2 hover:border-mycolor hover:cursor-pointer' onClick={handleSaveEdit}>
                                            <p><FontAwesomeIcon icon={faCheckSquare} /></p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className='bg-mycolor h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white ml-2 hover:bg-white hover:text-mycolor hover:border-2 hover:border-mycolor hover:cursor-pointer' onClick={() => handleDelete(index)}>
                                            <p><FontAwesomeIcon icon={faTrash} /></p>
                                        </div>
                                        <div className='bg-mycolor h-8 w-8 rounded-full flex items-center justify-center font-semibold text-white ml-2 hover:bg-white hover:text-mycolor hover:border-2 hover:border-mycolor hover:cursor-pointer' onClick={() => handleEdit(index)}>
                                            <p><FontAwesomeIcon icon={faPenToSquare} /></p>
                                        </div>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
