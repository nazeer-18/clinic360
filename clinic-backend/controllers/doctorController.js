const User = require('../models/User');

const updateDoctorProfile = async(req,res) =>{

}

const searchDoctor = async(req,res)=>{
    try{
        const {specializations, city, state, name} = req.body;
        let query = {role:'Doctor'}; // we are only searching for doctors
        if (specializations && specializations.length > 0) {
            query.specialization = {
                $all: specializations.map(spec => ({
                    $elemMatch: { $regex: new RegExp(spec, 'i') }
                }))
            };
        }
        if(city) query.city = city;
        if(state) query.state = state;
        if(name) query.name = {$regex:name,$options:'i'};
        const doctors = await User.find(query,'-password');
        res.json(doctors);
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Error fetching doctors'});
    };
};

const getDoctor = async(req,res) =>{
    try{
        const id = req.query.id;
        const doctor = await User.findById(id,'-password');
        if(!doctor || !doctor.role === 'Doctor'){
            return res.status(404).json({message: 'Doctor not found'});
        }
        res.json(doctor);
    }catch(error){
        res.status(500).json({message:'Error fetching doctors'});
    };
}

const getDoctorLocation =  async (req, res) => {
    const { doctorId, startTime, endTime, day } = req.body;
    try {
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'Doctor') {
            return res.status(404).json({ message: 'Doctor not found or invalid doctor ID' });
        }
        const location = doctor.locations.find(location => {
            return location.availabilitySlots.some(slot => {
                const slotStartTime = slot.startTime;
                const slotEndTime = slot.endTime;
                return slot.day === day && startTime >= slotStartTime && endTime <= slotEndTime;
            });
        });
        if (location) {
            return res.status(200).json({ location: location.locationName });
        } else {
            return res.status(404).json({ message: 'No location found for the specified time and weekday' });
        }
    } catch (error) {
        console.error('Error fetching doctor location:', error);
        return res.status(500).json({ message: 'Error fetching doctor location' });
    }
};

module.exports = {searchDoctor,getDoctor,getDoctorLocation};