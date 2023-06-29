// AddStudent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddStudent = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    fullname: '',
    profilePicture: '',
    address: '',
    phoneNumber: '',
    birthDate: '',
    gender: '',
    faculty: '',
    programStudy: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setStudentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { programStudy } = studentData;
    let faculty = '';

    switch (programStudy) {
      case 'Ekonomi':
      case 'Manajemen':
      case 'Akuntansi':
        faculty = 'Fakultas Ekonomi';
        break;
      case 'Administrasi Publik':
      case 'Administrasi Bisnis':
      case 'Hubungan Internasional':
        faculty = 'Fakultas Ilmu Sosial dan Politik';
        break;
      case 'Teknik Sipil':
      case 'Arsitektur':
        faculty = 'Fakultas Teknik';
        break;
      case 'Matematika':
      case 'Fisika':
      case 'Informatika':
        faculty = 'Fakultas Teknologi Informasi dan Sains';
        break;
      default:
        faculty = '';
        break;
    }

    const newStudentData = {
      ...studentData,
      faculty,
    };

    fetch('http://localhost:3001/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudentData),
    })
      .then(() => {
        navigate('/student');
      })
      .catch((error) => {
        console.error('Error adding student:', error);
      });
  };

  return (
    <>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullname">Full Name:</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={studentData.fullname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="text"
            id="profilePicture"
            name="profilePicture"
            value={studentData.profilePicture}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={studentData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={studentData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="birthDate">Birth Date:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={studentData.birthDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={studentData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label htmlFor="programStudy">Program Study:</label>
          <select
            id="programStudy"
            name="programStudy"
            value={studentData.programStudy}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Program Study</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Administrasi Publik">Administrasi Publik</option>
            <option value="Administrasi Bisnis">Administrasi Bisnis</option>
            <option value="Hubungan Internasional">Hubungan Internasional</option>
            <option value="Teknik Sipil">Teknik Sipil</option>
            <option value="Arsitektur">Arsitektur</option>
            <option value="Matematika">Matematika</option>
            <option value="Fisika">Fisika</option>
            <option value="Informatika">Informatika</option>
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default AddStudent;
