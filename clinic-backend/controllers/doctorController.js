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

module.exports = {searchDoctor,getDoctor};