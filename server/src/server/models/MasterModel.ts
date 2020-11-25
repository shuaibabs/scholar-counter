
export class MasterModel {

    //  Function to get Model for API Response
    public getResponseModel() {
        let model = {
            status: 0,
            info: '',
            startDT: new Date(),
            endDT: new Date(),
            tat: 0,
            data: {}
        }
        return model;
    }

    //  Function to get Model for DB Query Result
    public getQueryModel() {
        let model = {
            affectedRows: 0,
            changedRows: 0,
            fieldCount: 0,
            insertId: 0,
            message: "",
            protocol41: true,
            serverStatus: 0,
            warningCount: 0,
            status: 0,
            fetchedRows: 0,
            rows: {},
            info: '',
            startDT: new Date(),
            endDT: new Date(),
            tat: 0
        }
        return model;
    }

    public getUserModel() {

        let model = {

            userID: '',
            firstName: '',
            middleName: '',
            lastName: '',
            dob: '',
            created_by: '',

        }
        return model;
    }

    public getEmailModel() {
        let model = {
            to: [],
            cc: [],
            bcc: [],
            subject: '',
            body: '',
            attachment: []
        }
        return model;
    }


    public getUserProfileModel() {
        const model = {
            loginID: '',
            userID: '',
            role: '',
            roleID: '',
            displayRole: '',
            passwd: '',
            firstName: '',
            middleName: '',
            lastName: '',
            displayName: '',
            email: '',
            contactPrimary: '0',
            contactSecondary: '0',
            status: '',
            securityQuestion1: 'Place/City of my birth?',
            securityQuestion2: 'Name of my very first school?',
            securityQuestion3: 'My favrouite subject?',
            securityAnswer1: '',
            securityAnswer2: '',
            securityAnswer3: '',
            remarks: '',
            photo: '',
            accountID: '',
            accountCode: '',
            accountName: '',
            accountDesc: '',
            logo: '',
          };
        return model;
    }
}