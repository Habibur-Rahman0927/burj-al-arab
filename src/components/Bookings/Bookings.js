import React, { useContext, useEffect, useState } from 'react';
import { UserConext } from '../../App';

const Bookings = () => {
    const [loggInUser, setLoggedInUser] = useContext(UserConext);
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/bookings?email=' + loggInUser.email, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => setBookings(data));
    }, [])
    return (
        <div>
            <h3>You have: {bookings.length} bookings</h3>
            {
                bookings.map(booking => <li>{booking.name} from:  {new Date(booking.checkIn).toDateString('dd/MM/yyyy')}
                 To : {new Date(booking.checkOut).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Bookings;