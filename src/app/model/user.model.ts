import { Occupation } from './occupation.model';
import { Address } from './address.model';

export class User {

    public id:number;
    public name: string;
    public username: string;
    public email: string;
    public password: string;
    public phone: number;
    public age: number;
    public image: string;
    public location= {
        locationId: null,
        locationName:''
    };
    public address:Address[];
    // {
    //     addressId:null,
    //     buildingName: '',
    //     street: '',
    //     city: '',
    //     state: '',
    //     postalCode: ''
    // };
    public employeeData={
        id:null,
        experience:null,
        commissionRate:null,
        occupation:{
            occupationId:null,
            occupationName:null,
            commissionRate:null
        },
        perDayCharge:null,
        availability:null,
        jobStartDate:'',
        aadharFront:'',
        aadharBack:'',
        verified:null
    };
    public roles:string[];
    public dob: string;
    public isEnabled: boolean;
}
