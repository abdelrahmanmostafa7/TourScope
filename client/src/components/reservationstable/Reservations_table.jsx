import React from 'react';
import './revervations_table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
function Rooms_table() {


    function Retrive_data(id, Room_Number, Room_Title, cheack_in, cheack_out, Guest_Name, Guest_Email, Guest_Phone, status) {
        return { id, Room_Number, Room_Title, cheack_in, cheack_out, Guest_Name, Guest_Email, Guest_Phone, status };
    }

    const data = [
        Retrive_data(1, "185", 'Single Room','1/5/2023 12:00:00 PM', '1/5/2023 12:00:00 PM', 'Ahmed', 'ahmed@gmail.com', '01111111111', 'pending'),
        Retrive_data(2, "843", 'Double Room', '1/5/2023 12:00:00 PM', '1/5/2023 12:00:00 PM', 'Ahmed', 'ahmed@gmail.com', '01111111111', 'Accepted'),
        Retrive_data(3, "485", 'Triple Room', '1/5/2023 12:00:00 PM', '1/5/2023 12:00:00 PM', 'Ahmed', 'ahmed@gmail.com', '01111111111', 'Rejected'),
        Retrive_data(4, "844", 'Quad Room', '1/5/2023 12:00:00 PM', '1/5/2023 12:00:00 PM', 'Ahmed', 'ahmed@gmail.com', '01111111111', 'Waiting'),
    ];


    return (
        <>
            <table id="table_styling">

                <tr>
                    <th>Room Number</th>
                    <th>Room Title</th>
                    <th>Cheak in</th>
                    <th>cheack out</th>
                    <th>Guest Name</th>
                    <th>Guest Email</th>
                    <th>Guest Phone</th>
                    <th>Status</th>


                    <th className='action_label'>Actions</th>
                </tr>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td className='item'>{item.Room_Number}</td>
                            <td className='item'>{item.Room_Title}</td>
                            <td className='item'>{item.cheack_in}</td>
                            <td className='item'>{item.cheack_out}</td>
                            <td className='item'>{item.Guest_Name}</td>
                            <td className='item'>{item.Guest_Email}</td>
                            <td className='item'>{item.Guest_Phone}</td>
                            <td className='item'> {item.status}</td>
                            <td>
                                <button className='edite_btn'><FontAwesomeIcon icon={faEdit} className="roomstable_icon" /></button>
                                <button className='delete_btn'><FontAwesomeIcon icon={faTrashCan} className="roomstable_icon" />
                                </button>
                            </td>
                        
                        </tr>
                    ))}
                    

                </tbody>
            </table>

        </>
    );
}

export default Rooms_table;
