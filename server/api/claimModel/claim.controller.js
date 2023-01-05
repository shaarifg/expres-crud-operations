const claimModel = require('./claim.enitity')


//Function to post or create a cliam && passing status and policyID is mandatory
const createClaim = (claimData) =>{
    return new Promise((reject, resolve)=>{
       const newClaim = new claimModel()
       newClaim.name = claimData.name
       newClaim.age = claimData.age
       newClaim.hospital = claimData.hospital
       newClaim.address = claimData.address
       newClaim.phone = claimData.phone
       newClaim.date = claimData.date
       newClaim.status = claimData.status
       newClaim.policyId = claimData.policyId
       if (!newClaim.status || !newClaim.policyId) {
            reject({ message: "Please Enter PolicyId & Status 🎈", status: 500 })
        }
       newClaim.save((error, data)=>{
        if (error) {
            reject({ message: "Somentging went wrong 😢", status: 500 })
        }
        else {
            resolve({ message: "Claim is CREATED successfully ✔😊", status: 201, addedData:data})
        }
    })
    })
}


//Function to get a claim by it's id
const getClaimById = (id) =>{
    return new Promise( async(reject, resolve)=>{
        const claim = await claimModel.findById((id))
        // console.log(claim);
        if (!claim) {
            reject({ message: "Claim not found 🎈", status: 500 })
         }
         else {
             resolve({ message: "FOUND claim for given Id successfully ✔😊", status: 201, claim:claim})
         }
     })
}

//Function to get all claims of same policyID
const getAllClaimsByPolicyId = (policyId)=>{
    return new Promise( async(reject, resolve)=>{
        const claims = await claimModel.find({policyId:policyId})
        // console.log(claim);
        if (!claims) {
            reject({ message: "Claims not found 🎈", status: 500 })
         }
         else {
             resolve({ message: "FOUND all claims for given policyId successfully ✔😊", status: 201, claims:claims})
         }
     })
}


// Function to Get all claims for given hospital name and claim date
const getCliamsByHospitalAndDate =({hospital, date})=>{
    return new Promise( async(reject, resolve)=>{
        const claims = await claimModel.find({hospital:hospital, date:date})
        // console.log(claim);
        if (!claims) {
            reject({ message: "Claims not found 🎈", status: 500 })
         }
         else {
             resolve({ message: "FOUND all claims for given hospital name and claim date successfully ✔😊", status: 201, claims:claims})
         }
     })
}

//Function to update the status of a claim by using its Id
const updateClaim =(claimId, updateData)=>{
    return new Promise( async(reject, resolve)=>{
        const updatedClaim = await claimModel.findByIdAndUpdate(claimId, {status: updateData.status})
        // console.log(claim);
        if (!updatedClaim) {
            reject({ message: "Claims not found 🎈", status: 500 })
         }
         else {
            resolve({ message: "Claim status is UPDATED successfully ✔😊", status: 201})
         }
     })
}


//Function to delete a claim by using its Id
const deleteClaim =(claimId)=>{
    return new Promise( async(reject, resolve)=>{
        const claim = await claimModel.findByIdAndDelete(claimId)
        // console.log(claim);
        if (!claim) {
            reject({ message: "Claims not found 🎈", status: 500 })
         }
         else {
             resolve({ message: "Claim of given id is DELETED successfully ✔😊", status: 201, deletedClaim:claim})
         }
     })
}

module.exports ={
    createClaim,
    getClaimById,
    getAllClaimsByPolicyId,
    getCliamsByHospitalAndDate,
    updateClaim,
    deleteClaim
}


