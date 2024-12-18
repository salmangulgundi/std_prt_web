import React from 'react';
import "./DashBoard.css";
import { useNavigate } from 'react-router-dom';

export default function DashBoard() {
    const navigate = useNavigate();

    // Function to handle button click
    const handleUpload = (standard) => {
        try {
            localStorage.setItem('selectedStandard', standard);
            navigate('/addSubjects');
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to set standard');
        }
    };

    return (
        <div className='center-container'>
            <div>
                <button className="button1" onClick={() => handleUpload('1st')}>CLASS 1</button>
                <button className="button1" onClick={() => handleUpload('2nd')}>CLASS 2</button>
                <button className="button1" onClick={() => handleUpload('3rd')}>CLASS 3</button>
                <button className="button1" onClick={() => handleUpload('4th')}>CLASS 4</button>
                <button className="button1" onClick={() => handleUpload('5th')}>CLASS 5</button>
            </div>
            <div>
                <button className="button1" onClick={() => handleUpload('6th')}>CLASS 6</button>
                <button className="button1" onClick={() => handleUpload('7th')}>CLASS 7</button>
                <button className="button1" onClick={() => handleUpload('8th')}>CLASS 8</button>
                <button className="button1" onClick={() => handleUpload('9th')}>CLASS 9</button>
                <button className="button1" onClick={() => handleUpload('10th')}>CLASS 10</button>
            </div>
        </div>
    );
}
