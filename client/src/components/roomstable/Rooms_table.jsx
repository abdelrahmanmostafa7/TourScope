import React from 'react';
import './rooms_table.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-solid-svg-icons';
function Rooms_table() {


    function Retrive_data(id, Room_Number, Room_Title, Avilability) {
        return { id, Room_Number, Room_Title, Avilability };
    }

    const data = [
        Retrive_data(1, "185", 'Single Room', 'Avilable'),
        Retrive_data(2, "843", 'Double Room', 'Avilable'),
        Retrive_data(3, "485", 'Triple Room', 'Reserved'),
        Retrive_data(4, "844", 'Quad Room', 'Avilable'),
    ];


    return (
        <>
            <table id="table_styling">

                <tr>
                    <th>Room Number</th>
                    <th>Room Title</th>
                    <th>Avilability</th>
                    <th className='action_label'>Actions</th>
                </tr>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.Room_Number}</td>
                            <td>{item.Room_Title}</td>
                            <td>{item.Avilability}</td>
                            <td>
                                <button className='view_btn'> <FontAwesomeIcon icon={faEye} className="roomstable_icon" /> </button>
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
