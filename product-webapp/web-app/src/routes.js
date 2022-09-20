
//Imports from Peoples
import Profile from './components/people/Profile';
import SearchVaccinationCenter from './components/people/SearchVaccinationCenter';
import PeopleLogin from './components/people/login';
import PeopleRegistration from './components/people/registration';
import AppointmentConfirmation from './components/people/AppointmentConfirmation';
import PeopleEditProfile from './components/people/BasicInformation'
import Vaccinationdetails from './components/people/vaccinationdetails'


//Imports from Vaccination Centers
import VCAppointments from './components/vaccination-center/VCAppointments';
import AvailableSlots from './components/vaccination-center/available-slots';
import VCProfile from './components/vaccination-center/VCProfile';

import VCRegistration from './components/vaccination-center/vc-registration';
import VCLogin from './components/vaccination-center/vc-login'
import ReportGeneration from './components/vaccination-center/ReportGeneration';
import EditProfile from './components/vaccination-center/Editprofile';
import ConfirmedAppointmentPopup from './components/people/ConfirmedAppointment';
import Home from './components/Home';


export const routes = [
    //Home Page
    {
        path: '/',
        component: Home,
        name: 'Home Page',
    },
    //Routes for People
    {
        path: '/login',
        component: PeopleLogin,
        name: 'People Login',
    },
    {
        path: '/register',
        component: PeopleRegistration,
        name: 'People Registration'
    },
    {
        path: '/people/profile',
        component: Profile,
        name: 'Profile',
    },
    {
        path: '/people/edit-profile',
        component: PeopleEditProfile,
        name: 'People Edit Profile',
    },
    {
        path: '/people/searchvcenter',
        component: SearchVaccinationCenter,
        name: 'Search Center'
    },
    {
        path: '/people/appointmentconfirmation',
        component: AppointmentConfirmation,
        name: 'Appointment Confirmation'
    },
    {
        path: '/people/vaccinationdetails',
        component: Vaccinationdetails,
        name: 'Vaccination Details'
    },
    {
        path: '/people/ConfirmedAppointment',
          component: ConfirmedAppointmentPopup,
          name: 'ConfirmedAppointment'
      },

    //Routes for Vaccination Centers
    {
        path: '/vclogin',
        component: VCLogin,
        name: 'Vc Login',
    },
    {
        path: '/vcregister',
        component: VCRegistration,
        name: 'Vc Registration'
    },

    {
        path: '/vcenter/appointments',
        component: VCAppointments,
        name: 'Slots and Appointments'
    },
    {
        path: '/vcenter/slots-available',
        component: AvailableSlots,
        name: 'Available Slots'
    },
    {
        path: '/vcenter/profile',
        component: VCProfile,
        name: 'Vaccination Center Profile'
    },
    {
        path: '/vcenter/report',
        component: ReportGeneration,
        name: 'Report Generation'
    },
    {
        path: '/vcenter/editprofile',
        component: EditProfile,
        name: 'Edit Profile'
    }
]
