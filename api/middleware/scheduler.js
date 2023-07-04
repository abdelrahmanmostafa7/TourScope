import { CronJob } from 'cron';
import Reservation from '../models/reservation.model.js';

const startScheduler = () => {
    // Create a new CronJob instance
    const job = new CronJob('0 11 * * *', async () => {
       
        try {
            const currentDate = new Date();
            currentDate.setUTCHours(22, 0, 0, 0);

            // Find all reservations with 'Pending' or 'Confirmed' status
            const reservations = await Reservation.find({ status: 'pending' });

            reservations.forEach(async (reservation) => {
                if (currentDate.getTime() === reservation.check_in_out.in.getTime()) {
                    reservation.status = 'confirmed';
                    await reservation.save();
                }
            });

            console.log('Reservation status update completed.');
        } catch (error) {
            console.error('Failed to update reservation statuses:', error);
        }    // Place your code here for the task you want to execute
    });

    job.start();

};

export default startScheduler;
