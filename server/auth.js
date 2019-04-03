
//As of now, this contains, set of usernames and passwords, will fetch from db later"

var accessLists = [
    {
        "patient_id" : 32,
        "users" : [{"name" : "Prasanna", "password" : "Narasimha1997"}, 
        {"name" : "Narasimha", "password" : "Narasimha1997"},
        {"name" : "Shreyas", "password" : "Shreyas1997"},
        {"name" : "Prajwal", "password" : "Prajwal1997"}
        ]
    },
    {
        "patient_id" : 34,
        "users" : [
            {"name" : "Kushal", "password" : "Kushal1997"},
            {"name" : "segu", "password" : "Segu1997"}
        ]
    }
]

var authenticate = (user) => {
    for(var i = 0; i < accessLists.length; i++) {
        for(var j = 0; j < accessLists[i].users.length; j++) {
            if (accessLists[i].users[j].name == user.name && accessLists[i].users[j].password == user.password)
                return accessLists[i].patient_id
        }
    }

    return 0
}

var get_room_id = (patient_id, rooms) => {
   try{
       return rooms[patient_id]
   }catch(err)  {
       return "000000000"
   }
}

module.exports.authenticate = authenticate
module.exports.get_room_id = get_room_id