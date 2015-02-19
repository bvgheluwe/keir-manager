/* class definitions
--------------------------------------------------------------*/
function Benefitcode(code, description) {
    this.Code = code;
    this.Description = description;
};

function Patient(number, lastName, firstName) {
    this.Number = number;
    this.LastName = lastName;
    this.FirstName = firstName;
};

function AppointmentPatientInfo(patient, benefitcodes) {
    this.Patient = patient;
    this.Benefitcodes = benefitcodes;
};

function Employee(number, lastName, firstName, benefitcodes) {
    this.Number = number;
    this.LastName = lastName;
    this.FirstName = firstName;
    this.Benefitcodes = benefitcodes;
    this.AppointmentPatientInfos = [];
};

/* initialisation
--------------------------------------------------------------*/

//patients
var Jan = new Patient("123", "De Wilde", "Jan");
var Piet = new Patient("456", "Pienter", "Piet");
var Joris = new Patient("789", "Van Severen", "Joris");
var Adil = new Patient("234", "De Smet", "Adil");
var Wannes = new Patient("345", "Van De Velde", "Wannes");
var Jana = new Patient("567", "Blomaert", "Jana");

//benefitcodes
var plr = new Benefitcode("PLR", "prestatie logo revalidant");
var pkr = new Benefitcode("PKR", "prestatie kine revalidant");
var ppr = new Benefitcode("PPR", "prestatie psycho revalidant");
var blr = new Benefitcode("BLR", "bilan logo revalidant");
var tk = new Benefitcode("TK", "thee/koffie");
var k = new Benefitcode("K", "koekske eten");
var a = new Benefitcode("A", "afwezig");

//employees

var Mireille = new Employee("987", "X", "Mireille", [plr, pkr, blr, a, tk]);
var Gustaaf = new Employee("876", "X", "Gustaaf", [pkr, ppr, k, a]);
var Hortensia = new Employee("765", "X", "Hortensia", [tk, k, a]);
var Eufrasie = new Employee("654", "X", "Eufrasie", [plr, blr, a]);
var Gérard = new Employee("543", "X", "Gérard", [ppr, pkr, plr, blr, a]);


/* Knockout 
--------------------------------------------------------------*/
function ViewModel() {
    var self = this;

    self.BeginTime = ko.observable("0:00");
    self.EndTime = ko.observable("0:00");
    self.PlanningDate = ko.observable("12/02/2015");
    self.Label = ko.observable();

    //self.EmptyEmployee= new Employee('', '', '', []);

    self.AvailableEmployees = ko.observableArray([Mireille, Gustaaf, Hortensia, Eufrasie, Gérard]);
    self.SelectedEmployee = ko.observable();
    self.SelectedEmployeeBenefitcode = ko.observable();
    self.AvailablePatients = ko.observableArray([Jan, Piet, Joris, Adil, Wannes, Jana]);
    self.SelectedPatient = ko.observable();

    self.Employees = ko.observableArray();
    self.Patients = ko.observableArray();

    self.AddEmployee = function () {
        if (self.SelectedEmployee() && self.SelectedEmployeeBenefitcode()) {
            self.Employees.push(self.SelectedEmployee());
            //TODO: add PatientInfo for every patient to this employee

        }
    };

    self.removeEmployee = function () {
        self.Employees.remove(this);
    };

    self.AddPatient = function () {
        if (self.SelectedPatient()) {
            self.Patients.push(self.SelectedPatient());
            //TODO: add new PatientInfo to every employee
        }
    };

    self.removePatient = function () {
        self.Patients.remove(this);
        //TODO: remove patientInfo from every employee
    };

    self.Save = function () {
        alert('Where is my database?');
    };

    /* When SelectedEmployee does not yet have a value, we run into trouble with the options binding on select#employeeBenefitcodes
     * (i.e. 'undefined' error).
     * This has been solved by using the 'if' binding on the containing div, which consequently is not rendered when SelectedEmployee
     * as long as SelectedEmployee is undefined. In that case the dropdown is not visible.
     * If it would be required that the dropdown is always visible, we can use 'SafeSelectedEmployee' as a workaround for the 
     * 'undefined' error, since it returns EmptyEmployee or SelectedEmployee
     * (just replace SelectedEmployee with SafeSelectedEmployee in the options binding)
    */
    //self.SafeSelectedEmployee = ko.computed(function () {
    //    if (!self.SelectedEmployee()) {
    //        self.SelectedEmployee(self.EmptyEmployee);
    //    }
    //    return self.SelectedEmployee();
    //}, self);

}

window.onload = function () {
    ko.applyBindings(new ViewModel());

};