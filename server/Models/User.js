class User{

    primary_address;
    first_name;
    last_name;
    date;
    ihi_number;
    gender;

    constructor(primary_address,first_name,last_name,date,ihi_number,gender){
       this.primary_address = primary_address;
       this.first_name = first_name;
       this.last_name = last_name;
       this.date = date;
       this.ihi_number = ihi_number;
       this.gender = gender;
    }


    get primary_address(){
        return this.primary_address;
    }

    get firstName(){
        return this.firstName;
    }

    get lastName(){
        return this.lastName;
    }

    get date(){
        return this.date;
    }

    get ihi_number(){
        return this.ihi_number;
    }

    get gender(){
        return this.gender;
    }
}

export default User;