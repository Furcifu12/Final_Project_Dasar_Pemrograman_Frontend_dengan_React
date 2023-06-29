import React from 'react';
import { useHistory } from 'react-router-dom';


const Home = () => {
  const history = useHistory();

  const handleAllStudentClick = () => {
    history.push('student');
  };

  return (
    <div>
      <h1>Welcome to Student Portal</h1>
      <button onClick={handleAllStudentClick} data-testid="student-btn">
        All Student
      </button>
    </div>
  );
};

export default Home;
